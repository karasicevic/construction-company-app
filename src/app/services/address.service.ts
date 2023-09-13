import { Injectable } from '@angular/core';
import { City } from '../models/city.model';
import { Street } from '../models/street.model';
import { Number } from '../models/number.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  //cities: City[]=[new City(11245, "Kusadak"),new City(11000, "Beograd"),new City(16000, "Leskovac")];
  //streets: Street[]=[new Street(new City(11245, "Kusadak"), 12,"trlalalal"),new Street(new City(11000, "Beograd"), 12,"hihihihi"), new Street(new City(16000, "Leskovac"), 12,"nenenenne")];
  //numbers: Number[]=[new Number(new City(11245, "Kusadak"), new Street(new City(11245, "Kusadak"), 12,"trlalalal"), 5)];

  private zipCode=0;
  private apiUrlCities = 'http://localhost:3000/api/cities';
  private apiUrl = '';

  constructor(private http: HttpClient) { }

  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrlCities);
  }

  getStreets(zipCode:number): Observable<Street[]> {
    this.zipCode = zipCode;
    this.apiUrl = `http://localhost:3000/api/streets/${this.zipCode}`
    return this.http.get<Street[]>(this.apiUrl);
    
  }

  getNumbers(zipCode: number, streetId:number): Observable<Number[]> {
    this.apiUrl = `http://localhost:3000/api/numbers/${zipCode}/${streetId}`
    return this.http.get<Number[]>(this.apiUrl);
    
  }
}
