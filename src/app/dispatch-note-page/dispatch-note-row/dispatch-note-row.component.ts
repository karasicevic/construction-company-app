import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DispatchNote } from 'src/app/models/dispatch-note.model';
import { ItemOfDispatchNote } from 'src/app/models/item-of-dispatch-note.model';
import { Item } from 'src/app/models/item.model';
import { MeasureUnit } from 'src/app/models/measure-unit.model';
import { Supplier } from 'src/app/models/supplier.model';
import { DispatchNotesService } from 'src/app/services/dispatch-notes.service';
import { ItemAService } from 'src/app/services/item-a.service';
import { SupplierService } from 'src/app/services/supplier.service';


@Component({
  selector: 'app-dispatch-note-row',
  templateUrl: './dispatch-note-row.component.html',
  styleUrls: ['./dispatch-note-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DispatchNoteRowComponent {
  @Input() note!: DispatchNote;
  @Input() items!: ItemOfDispatchNote[];
  editForm!: FormGroup;
  showForm: boolean = false;
  editItemB: boolean = false;
  addNewItem: boolean = false;
  itemsFormArray!: FormArray;
  numberOfEditedItem: number = 0;
  validationMessages = {
    number: {
      required: 'Broj otpremnice je obavezan!',
      pattern: ' PIB se sastoji samo od cifara!'
    },
    shippingMethod: {
      required: "Način otpreme je obavezan!"
    },
    conCompany: {
      required: " Građevinsko preduzeće je obavezno polje!"
    },
    purchaseOrder: {
      required: "Broj narudžbenice je obavezan!",
      pattern: ' Broj naradžbenice se sastoji samo od cifara!'
    }
  };
  @Input() displayedColumns: string[] = ['itemA', 'quantity', 'itemAMU', 'itemAPrice', 'note', 'itemOfPurchaseOrder', 'actions'];

  itemsA: Item[] = [];
  suppliers: Supplier[] = [];

  constructor(private dispatchService: DispatchNotesService,
    private supplierService: SupplierService,
    private formBuilder: FormBuilder,
    private itemAService: ItemAService
  ) {
    this.initializeForm();
    itemAService.getAllItems().subscribe((itemsARes: Item[]) => {
      this.itemsA = itemsARes;
    });
    this.supplierService.getAllSuppliers().subscribe((suppliersRes: Supplier[]) => {
      this.suppliers = suppliersRes;
    })
  }

  initializeForm() {
    this.editForm = this.formBuilder.group({
      number: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      shippingMethod: ['', Validators.required],
      purchaseOrder: ['', [Validators.pattern('^[0-9]*$'), Validators.required]],
      selectedSupplier: ['', Validators.required],
      selectedDate: [null, Validators.required],
      itemsNew: this.formBuilder.array([]),
      eitemA: [''],
      quantity: [''],
      note: [''],
      itemOfPurchaseOrder: [''],
      eitemAMU: [''],
      eitemAPrice: ['']
    });
  }

  openForm() {
    this.showForm = true;
    this.patchValues();
    this.items.forEach(item => {
      item.item = this.itemsA.find((i) => i.id === item.item.id) as Item;
    });
  }

  patchValues() {
    let selSupplier=this.suppliers.find((supp) => supp.taxId === this.note.supplier.taxId) as Supplier;
    this.editForm.patchValue({
      number: this.note.number,
      shippingMethod: this.note.shippingMethod,
      selectedDate: this.note.date,
      selectedSupplier: selSupplier,
      purchaseOrder: this.note.purchaseOrder
    });
  }

  //**************Menjanje otpremnice u bazi***************/

  editDispatchNote(event: Event): void {
    event.preventDefault();
    if (this.editForm.valid) {
      
      const formData = this.editForm.value;
      console.log(formData)

      const itemsToSave: ItemOfDispatchNote[] = [];

      const updatedNote=new DispatchNote(
        formData.number,
        formData.shippingMethod,
        formData.selectedDate,
        formData.selectedSupplier,
        formData.purchaseOrder,
        itemsToSave
      );
      
    const itemsFormArray = this.editForm.get('itemsNew') as FormArray;
    let i=1;
    this.items.forEach(item => {
      item.number=i;
      itemsToSave.push(item)
      i++;
    });
    itemsFormArray.controls.forEach((itemControl) => {
      const itemGroup = itemControl as FormGroup;
      const newItemOfDispatchNote = new ItemOfDispatchNote(
        this.note,
        i,
        itemGroup.get('noteadd')?.value,
        itemGroup.get('quantityadd')?.value,
        itemGroup.get('itemAadd')?.value,
        updatedNote.purchaseOrder,
        itemGroup.get('itemOfPurchaseOrderadd')?.value,
      );
      itemsToSave.push(newItemOfDispatchNote);
      i++;
    });
    updatedNote.items=itemsToSave;
    this.items=itemsToSave;
    this.note=updatedNote;
      
       this.dispatchService.editDispatchNote(updatedNote);
     }
     if (this.itemsFormArray && this.itemsFormArray.length > 0) {
     this.itemsFormArray.clear();
    } 
     this.closeForm();
    }
  

  //**************Dodavnje nove stavke***************/

  addItem() {
    this.addNewItem = true;
    this.itemsFormArray = this.editForm.get('itemsNew') as FormArray;
    this.itemsFormArray.push(this.createItem());

    const itemsData = this.itemsFormArray.value;
  }

  createItem() {
    return this.formBuilder.group({
      itemAadd: ['', Validators.required],
      quantityadd: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      noteadd: [''],
      itemOfPurchaseOrderadd: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      itemAMUadd: [''],
      itemAPriceadd: ['']
    });
  }

  deleteItemAdded(index: number) {
    this.itemsFormArray.removeAt(index);
  }

  onItemAChange(selectedItemA: any, index: number) {
    const itemsFormArray = this.editForm.get('itemsNew') as FormArray;
    const itemGroup = itemsFormArray.at(index) as FormGroup;

    if (selectedItemA) {
      itemGroup.get('itemAMUadd')?.setValue(selectedItemA.measureUnit);
      itemGroup.get('itemAPriceadd')?.setValue(selectedItemA.price * selectedItemA.VATrate);
    } else {
      itemGroup.get('itemAMUadd')?.setValue(null);
      itemGroup.get('itemAPriceadd')?.setValue(null);
    }
  }

  //**************Izmena i brisanje postojecih stavki***********/

  editItem(item: ItemOfDispatchNote) {
    this.initLittleEditForm();
    this.numberOfEditedItem = item.number;
    this.editItemB = true;
    this.editForm.patchValue({
      eitemA: item.item.name,
      eitemAMU: item.item.measureUnit,
      eitemAPrice: item.item.price * item.item.VATrate,
      quantity: item.quantity,
      note: item.note,
      itemOfPurchaseOrder: item.itemOfPurchaseOrder
    });
  }

  initLittleEditForm() {
    this.editForm.get('eitemA')?.setValidators([Validators.required]);
    this.editForm.get('quantity')?.setValidators([
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]);
    this.editForm.get('itemOfPurchaseOrder')?.setValidators([
      Validators.required,
      Validators.pattern('^[0-9]*$')
    ]);
  }

  saveEditItem() {
    const index = this.items.findIndex(item => item.number === this.numberOfEditedItem);
    if (index !== -1) {
      const updatedItem = this.items[index];
      updatedItem.quantity = this.editForm.get('quantity')?.value;
      updatedItem.note = this.editForm.get('note')?.value;
      updatedItem.itemOfPurchaseOrder = this.editForm.get('itemOfPurchaseOrder')?.value;
      this.items[index] = updatedItem;
      this.items = [...this.items];
    } else {
      console.log("greska pri izmeni stavke")
    }

    this.numberOfEditedItem = 0;
    this.editItemB = false;
  }

  deleteItem(item: ItemOfDispatchNote) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.items = [...this.items];
    }
  }


  //**********Ponistavanje izmene****************/
  closeForm() {
    this.showForm = false;
    //promeni se u oba niza ne znam zasto?????????????
    this.items = this.note.items;
  }
}
