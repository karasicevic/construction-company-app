import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Supplier } from '../models/supplier.model';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { SupplierService } from '../services/supplier.service';

@Component({
  selector: 'app-supplier-page',
  templateUrl: './supplier-page.component.html',
  styleUrls: ['./supplier-page.component.scss']
})
export class SupplierPageComponent {

  searchForm!: FormGroup;
  searchResults: Supplier[] = [];
  suppliersT: Supplier[]=[];
  searchTrigger = new Subject<string>();
  showForm: boolean=false;
  validationMessages = {
    taxId: {
      required: 'PIB dobavljača je obavezan!',
      pattern:' PIB se sastoji od 9 cifara!'
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
    this.supplierService.getAllSuppliers().subscribe((suppliersRes: Supplier[]) => {
      this.suppliersT=suppliersRes;
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
    this.showForm=true;
    this.searchResults = [];
    console.log('Selected:', result);
  
    this.searchForm.patchValue({//fali
      taxId: result.taxId,
      name: result.name,
      currentAccount: result.currentAccount,
      phoneNumber: result.phoneNumber
    });
  }

  initializeForm() : void{
    this.searchForm = this.formBuilder.group({
      searchQuery: [''],
      taxId: ['', [Validators.minLength(9), Validators.maxLength(9), Validators.required, Validators.pattern('^[0-9]*$')]],
      name: ['', Validators.required],
      currentAccount: ['', [Validators.required, Validators.minLength(18), Validators.maxLength(18), Validators.pattern('^[0-9]*$')]],
      phoneNumber: ['', [Validators.pattern('^[0-9]*$'), Validators.required]]
    });
  }

  onPonisti(){
    this.showForm=false;
  }

  editSupplier(){
    this.showForm=false;
    console.log("izmenjen dobavljac")

  }

}
