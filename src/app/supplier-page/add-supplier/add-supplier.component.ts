import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent {
  addSupplierForm!: FormGroup;
  validationMessages = {
    taxId: {
      required: 'PIB dobavljača je obavezan!',
      pattern:' PIB se sastoji samo od cifara!',
      minLength:' PIB se sastoji od tačno 9 cifara!',
      maxLength:' PIB se sastoji od tačno 9 cifara!'
    },
    name:{
      required: "Naziv dobavljača je obavezan!"
    },
    currentAccount:{
      required: " Tekući račun je obavezno polje!",
      minLength:"Tekući račun se sastoji od tačno 18 cifara!",
      maxLength:'Tekući račun se sastoji od tačno 18 cifara!',
      pattern: 'Tekući račun se sastoji samo od cifara!'
    },
    phoneNumber:{
      required: "Broj telefona je obavezan!",
      pattern:' Broj telefona se sastoji samo od cifara!'
    }
  };


  constructor(private formBuilder: FormBuilder, private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() : void{
    this.addSupplierForm = this.formBuilder.group({
      taxId: ['', [Validators.minLength(9), Validators.maxLength(9), Validators.required, Validators.pattern('^[0-9]*$')]],
      name: ['', Validators.required],
      currentAccount: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18), Validators.pattern('^[0-9]*$')]],
      phoneNumber: ['', [Validators.pattern('^[0-9]*$'), Validators.required]]
    });
  }

  addSupplier(event: Event): void {
    event.preventDefault();
    if (this.addSupplierForm.valid) {
      const supplierData = this.addSupplierForm.value;
      const supplier = new Supplier(
        supplierData.taxId,
        supplierData.name,
        supplierData.currentAccount,
        supplierData.phoneNumber
        );
      this.supplierService.addSupplier(supplier);
      this.addSupplierForm.reset();
    }
  }

}
