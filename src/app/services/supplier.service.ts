import { Injectable } from '@angular/core';
import { Supplier } from '../models/supplier.model';
import { Observable, map, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


export class SupplierData{
  constructor(
  public taxId: string,
  public name: string,
  public currentAccount: string,
  public phoneNumber: string,
  public cityId: number,
  public streetId: number,
  public number: number){}

}

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private apiUrl = 'http://localhost:3000/api/suppliers';

  
  constructor(private http: HttpClient) { }

    getAllSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.apiUrl);
    }


    addSupplier(supplier: Supplier) {
      console.log(supplier)
      const newSupplier=new SupplierData(
        supplier.taxId,
        supplier.name,
        supplier.currentAccount,
        supplier.phoneNumber,
        supplier.city.zipCode,
        supplier.street.id,
        supplier.number.number
      )
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      this.http.post(this.apiUrl, newSupplier, httpOptions)
      .pipe(
        map((response: any) => response)
        ).subscribe();
    }

    editSupplier(supplier: Supplier) {
      console.log("edited:", supplier);
      const editedSupplier=new SupplierData(
        supplier.taxId,
        supplier.name,
        supplier.currentAccount,
        supplier.phoneNumber,
        supplier.city.zipCode,
        supplier.street.id,
        supplier.number.number
      )
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      this.http.put(`${this.apiUrl}/${supplier.taxId}`, editedSupplier, httpOptions)
      .pipe(
        map((response: any) => response)
        ).subscribe();
    }


}
