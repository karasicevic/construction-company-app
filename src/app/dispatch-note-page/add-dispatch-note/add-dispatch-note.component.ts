import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConstructionCompany } from 'src/app/models/construction-company.model';
import { DispatchNote } from 'src/app/models/dispatch-note.model';
import { ItemOfDispatchNote } from 'src/app/models/item-of-dispatch-note.model';
import { Item } from 'src/app/models/item.model';
import { Supplier } from 'src/app/models/supplier.model';
import { DispatchNotesService } from 'src/app/services/dispatch-notes.service';
import { ItemAService } from 'src/app/services/item-a.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-add-dispatch-note',
  templateUrl: './add-dispatch-note.component.html',
  styleUrls: ['./add-dispatch-note.component.scss']
})
export class AddDispatchNoteComponent {
  addDispatchNoteForm!: FormGroup;
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
  suppliers: Supplier[]=[];
  items: ItemOfDispatchNote[]=[];
  itemsA: Item[]=[];
  itemsFormArray!: FormArray;




  constructor(private formBuilder: FormBuilder, 
              private itemAService: ItemAService, 
              private supplierService: SupplierService,
              private dispatchService: DispatchNotesService){
    this.initializeForm();
  }

  ngOnInit(){
    this.itemsA=this.itemAService.getItemsA();
    console.log(this.itemsA)
    this.supplierService.getAllSuppliers().subscribe((suppliersRes: Supplier[]) => {
      this.suppliers=suppliersRes;
    })
    console.log(this.suppliers)
  }

  initializeForm() {
    this.addDispatchNoteForm = this.formBuilder.group({
      number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      shippingMethod: ['', Validators.required],
      conCompany: ['', [Validators.required]],
      purchaseOrder: ['', [Validators.pattern('^[0-9]*$'), Validators.required]],
      supplier: ['', Validators.required],
      selectedDate: [null, Validators.required],
      items: this.formBuilder.array([]) 
    });
  }

  addDispatchNote(event: Event): void{
    event.preventDefault();
    if (this.addDispatchNoteForm.valid) {
      // Implementirajte slanje podataka na server
      
      const conCom=new ConstructionCompany();
      const formData = this.addDispatchNoteForm.value;
      const newNote=new DispatchNote(
        formData.number,
        formData.shippingMethod,
        formData.selectedDate,
        formData.supplier,
        conCom,
        formData.purchaseOrder,
        formData.itemsFormArray
      );
        this.dispatchService.addDispatchNote(newNote);
    }
  }
  addItem() {
    this.itemsFormArray = this.addDispatchNoteForm.get('items') as FormArray;
    this.itemsFormArray.push(this.createItem());
    if (this.addDispatchNoteForm.valid) {
//dodavanje u niz TODO
      const itemsData = this.itemsFormArray.value;
      console.log(itemsData); 
    }
  }

  createItem() {
    return this.formBuilder.group({
      itemA: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      note: [''],
      itemOfPurchaseOrder: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  deleteItem(index: number) {
    this.itemsFormArray.removeAt(index);
  }


}
