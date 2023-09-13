import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Supplier } from '../models/supplier.model';
import { Subject, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { SupplierService } from '../services/supplier.service';
import { City } from '../models/city.model';
import { Street } from '../models/street.model';
import { Number } from '../models/number.model';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-supplier-page',
  templateUrl: './supplier-page.component.html',
  styleUrls: ['./supplier-page.component.scss']
})
export class SupplierPageComponent {

  searchForm!: FormGroup;
  searchResults: Supplier[] = [];
  suppliersT: Supplier[] = [];
  searchTrigger = new Subject<string>();
  showForm: boolean = false;
  cities: City[] = [];
  streets: Street[] = [];
  numbers: Number[] = [];

  citySel!: City;
  streetSel!: Street;
  numberSel!: Number;
  validationMessages = {
    taxId: {
      required: 'PIB dobavljača je obavezan!',
      pattern: ' PIB se sastoji od 9 cifara!'
    },
    name: {
      required: "Naziv dobavljača je obavezan!"
    },
    currentAccount: {
      required: " Tekući račun je obavezno polje!",
      minLength: "Tekući račun se sastoji od tačno 18 cifara!",
      maxLength: 'Tekući račun se sastoji od tačno 18 cifara!',
      pattern: 'Tekući račun se sastoji samo od cifara!'
    },
    phoneNumber: {
      required: "Broj telefona je obavezan!",
      pattern: ' Broj telefona se sastoji samo od cifara!'
    }
  };

  constructor(private formBuilder: FormBuilder, private supplierService: SupplierService, private addressService: AddressService) { }

  ngOnInit(): void {
    this.supplierService.getAllSuppliers().subscribe((suppliersRes: Supplier[]) => {
      this.suppliersT = suppliersRes;
    });
    this.addressService.getAllCities().subscribe((citiesRes: City[])=>{
      this.cities=citiesRes;
    });

    this.initializeForm();
    this.searchTrigger
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe((query: string) => {
        this.performSearch(query);
      });
  }

  performSearch(query: string): void {
    if (!query) {
      this.searchResults = [];
      return;
    }

    this.supplierService.getAllSuppliers().subscribe((suppliers: Supplier[]) => {
      this.searchResults = suppliers.filter((contractor: Supplier) =>
        contractor.taxId.toLowerCase().includes(query) ||
        contractor.name.toLowerCase().includes(query)
      );
    });
  }


  onSearch(): void {
    const query = this.searchForm.value.searchQuery.toLowerCase();
    this.searchTrigger.next(query);
  }

  selectSearchResult(result: any) {
    this.showForm = true;
    this.searchResults = [];
    console.log('Selected:', result);

    let selCity = this.cities.find((city) => city.zipCode === result.cityId) as City;
    this.citySel=selCity;
    console.log(this.citySel)
    console.log(selCity)    
    
    this.addressService.getStreets(selCity.zipCode).pipe(
      switchMap((streetsRes: Street[]) => {
        this.streets = streetsRes;
  
        let selStreet: Street = new Street(selCity, 999, "1");
        this.streets.forEach((str) => {
          if (str.id == result.streetId) {
            selStreet = str;
          }
        });
        this.streetSel=selStreet;
        console.log(this.streetSel)
        console.log(selStreet)
  
        return this.addressService.getNumbers(selCity.zipCode, selStreet.id).pipe(
          map((numbersRes: Number[]) => {
            this.numbers = numbersRes;
  
            let selNum: Number = new Number(selCity, selStreet, 2);
            this.numbers.forEach((num) => {
              if (num.number == result.number) {
                selNum = num;
              }
            });
            this.numberSel=selNum;
            console.log(this.numberSel)
            console.log(selNum)
  
            this.searchForm.patchValue({
              taxId: result.taxId,
              name: result.name,
              currentAccount: result.currentAccount,
              phoneNumber: result.phoneNumber,
              city: selCity,
              street: selStreet,
              number: selNum
            });
          })
        );
      })
    ).subscribe();
  }

  initializeForm(): void {
    this.searchForm = this.formBuilder.group({
      searchQuery: [''],
      taxId: ['', [Validators.minLength(9), Validators.maxLength(9), Validators.required, Validators.pattern('^[0-9]*$')]],
      name: ['', Validators.required],
      currentAccount: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18), Validators.pattern('^[0-9]*$')]],
      phoneNumber: ['', [Validators.pattern('^[0-9]*$'), Validators.required]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      number: ['', [Validators.required]]
    });
  }

  onPonisti() {
    this.showForm = false;
  }

  editSupplier(event: Event): void {
    event.preventDefault();
    if (this.searchForm.valid) {
      const supplierData = this.searchForm.value;
      const supplier = new Supplier(
        supplierData.taxId,
        supplierData.name,
        supplierData.currentAccount,
        supplierData.phoneNumber,
        this.citySel,
        this.streetSel,
        this.numberSel
      );
      console.log("za izmenu")
      console.log(supplier);
      this.supplierService.editSupplier(supplier);
      this.searchForm.reset();
      this.cities = [];
      this.addressService.getAllCities().subscribe((citiesRes: City[])=>{
        this.cities=citiesRes;
      });
      this.streets = [];
      this.numbers = [];
    }
    this.showForm = false;
    this.suppliersT=[];
    this.supplierService.getAllSuppliers().subscribe((suppliersRes: Supplier[]) => {
      this.suppliersT = suppliersRes;
    });
  }

  onCitySelectionChange(event: MatSelectChange): void {
    console.log("usao u city change")
    const selectedCity = event.value;
    this.streets = [];
    this.numbers = [];
    console.log('Izabran grad:', selectedCity);
    this.addressService.getStreets(selectedCity.zipCode).subscribe((streetsRes: Street[])=>{
      this.streets=streetsRes;
    });
    this.citySel = selectedCity;
  }

  onStreetSelectionChange(event: MatSelectChange): void {
    console.log("usao u street change")
    const selectedStreet = event.value;
    this.numbers = [];
    console.log('Izabrana ulica:', selectedStreet);
    this.addressService.getNumbers(selectedStreet.cityId, selectedStreet.id).subscribe((numbersRes: Number[])=>{
      this.numbers=numbersRes;
    });
    this.streetSel = selectedStreet;
  }

  onNumberSelectionChange(event: MatSelectChange): void {
    console.log("usao u number change")
    const selectedNumber = event.value;
    this.numberSel = selectedNumber;
  }

}
