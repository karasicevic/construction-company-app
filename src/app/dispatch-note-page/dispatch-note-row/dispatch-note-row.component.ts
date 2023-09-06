import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DispatchNote } from 'src/app/models/dispatch-note.model';
import { ItemOfDispatchNote } from 'src/app/models/item-of-dispatch-note.model';
import { Item } from 'src/app/models/item.model';
import { Supplier } from 'src/app/models/supplier.model';
import { AddressService } from 'src/app/services/address.service';
import { DispatchNotesService } from 'src/app/services/dispatch-notes.service';
import { ItemAService } from 'src/app/services/item-a.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-dispatch-note-row',
  templateUrl: './dispatch-note-row.component.html',
  styleUrls: ['./dispatch-note-row.component.scss']
})
export class DispatchNoteRowComponent {
  @Input() note!:DispatchNote;
  editForm!: FormGroup;
  showForm: boolean=false;
  itemsFormArray!: FormArray;
  validationMessages = {
    number: {
      required: 'Broj otpremnice je obavezan!',
      pattern:' PIB se sastoji samo od cifara!'
    },
    shippingMethod:{
      required: "Način otpreme je obavezan!"
    },
    conCompany:{
      required: " Građevinsko preduzeće je obavezno polje!"
    },
    purchaseOrder:{
      required: "Broj narudžbenice je obavezan!",
      pattern:' Broj naradžbenice se sastoji samo od cifara!'
    }
  };
  
  itemsA: Item[]=[];
  suppliers: Supplier[]=[];

  constructor(private dispatchService: DispatchNotesService, 
    private supplierService:SupplierService,
    private addressService: AddressService,
    private formBuilder: FormBuilder,
    private itemAService: ItemAService
    ){
      this.initializeForm();
      //this.itemsFormArray.patchValue(this.note.items);
      this.itemsA=itemAService.getItemsA();
      this.supplierService.getAllSuppliers().subscribe((suppliersRes: Supplier[]) => {
        this.suppliers=suppliersRes;
      })
    }


  initializeForm() {
    this.editForm = this.formBuilder.group({
    number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    shippingMethod: ['', Validators.required],
    conCompany: ['', [Validators.required]],
    purchaseOrder: ['', [Validators.pattern('^[0-9]*$'), Validators.required]],
    supplier: ['', Validators.required],
    selectedDate: [null, Validators.required],
    items: this.formBuilder.array([]) 
  });
  }



    openForm(){
      //inicijalizacija forme
      //todo
      this.showForm=true;
     // this.patchValues();
    }

    editDispatchNote(event: Event): void{
      event.preventDefault();
      if (this.editForm.valid) {

    }
  }

    patchValues(){
    this.editForm.get('number')?.setValue(this.note.number);
    this.editForm.get('shippingMethod')?.setValue(this.note.shippingMethod);
    this.editForm.get('selectedDate')?.setValue(this.note.date);
    this.editForm.get('supplier')?.setValue(this.note.supplier);
    this.editForm.get('conCompany')?.setValue(this.note.constructionCompany);
    this.editForm.get('purchaseOrder')?.setValue(this.note.purchaseOrder);
    }

    createItem() {
      return this.formBuilder.group({
        itemA: ['', Validators.required],
        quantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        note: [''],
        itemOfPurchaseOrder: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
      });
    }
  
    addItem() {
      this.itemsFormArray = this.editForm.get('items') as FormArray;
      this.itemsFormArray.push(this.createItem());
      if (this.editForm.valid) {
  //dodavanje u niz TODO
        const itemsData = this.itemsFormArray.value;
        console.log(itemsData); 
      }
    }

    deleteItem(index: number) {
      this.itemsFormArray.removeAt(index);
    }

    closeForm(){
      this.showForm=false;
    }
}
