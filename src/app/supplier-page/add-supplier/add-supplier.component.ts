import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City } from 'src/app/models/city.model';
import { Street } from 'src/app/models/street.model';
import { Number } from 'src/app/models/number.model';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/services/supplier.service';
import { AddressService } from 'src/app/services/address.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent {
  addSupplierForm!: FormGroup;
  cities: City[]=[];
  streets: Street[]=[];
  numbers: Number[]=[];

  city!: City;
  street!: Street;
  number!: Number;

  
  validationMessages = {
    taxId: {
      required: 'PIB dobavljača je obavezan!',
      pattern: 'PIB se sastoji samo od cifara!',
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


  constructor(private formBuilder: FormBuilder, private supplierService: SupplierService, private addressService: AddressService) {}

  ngOnInit(): void {
    console.log("on inti")
    this.initializeForm();
    console.log("init form")

    this.addressService.getAllCities().subscribe((citiesRes: City[])=>{
      this.cities=citiesRes;
    });
    console.log("get cities done")

  }

  initializeForm() : void{
    this.addSupplierForm = this.formBuilder.group({
      taxId: ['', [Validators.minLength(9), Validators.maxLength(9), Validators.required, Validators.pattern('^[0-9]*$')]],
      name: ['', Validators.required],
      currentAccount: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18), Validators.pattern('^[0-9]*$')]],
      phoneNumber: ['', [Validators.pattern('^[0-9]*$'), Validators.required]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      number: ['', [Validators.required]]
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
        supplierData.phoneNumber,
        this.city,
        this.street,
        this.number
        );
      this.supplierService.addSupplier(supplier);
      this.addSupplierForm.reset();
      this.cities=[];
      this.addressService.getAllCities().subscribe((citiesRes: City[])=>{
        this.cities=citiesRes;
      });
      this.streets=[];
      this.numbers=[];
    }
  }

  onCitySelectionChange(event: MatSelectChange): void {
    const selectedCity = event.value; 
    this.streets=[];
    this.numbers=[];
    console.log('Izabran grad:', selectedCity);
    this.addressService.getStreets(selectedCity.zipCode).subscribe((streetsRes: Street[])=>{
      this.streets=streetsRes;
    });
    this.city=selectedCity;
  }

  onStreetSelectionChange(event: MatSelectChange): void {
    const selectedStreet = event.value; 
    this.numbers=[];
    console.log('Izabrana ulica:', selectedStreet);
    this.addressService.getNumbers(selectedStreet.cityId, selectedStreet.id).subscribe((numbersRes: Number[])=>{
      this.numbers=numbersRes;
    });
    this.street=selectedStreet;
  }
  
  onNumberSelectionChange(event: MatSelectChange): void {
    const selectedNumber=event.value;
    this.number=selectedNumber;
  }

}
