import { Injectable } from '@angular/core';
import { Supplier } from '../models/supplier.model';
import { Observable, of } from 'rxjs';
import { City } from '../models/city.model';
import { Street } from '../models/street.model';
import { Number } from '../models/number.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private city=new City(11245, "Kusadak");
  private street=new Street(this.city, 12,"trlalalal");
  private number1=new Number(this.city, this.street, 5);


  private suppliers: Supplier[] = [ new Supplier("123456789", "dobavljac1", "123456789123456789","1234567890", this.city, this.street, this.number1)];

    getAllSuppliers(): Observable<Supplier[]> {
      return of(this.suppliers);
    }

    editSupplier(supplier: Supplier) {
      console.log("edited:", supplier);
    }

    addSupplier(supplier: Supplier) {
      console.log("added:", supplier);
    this.suppliers.push(supplier);
  }
  constructor() { }

}
