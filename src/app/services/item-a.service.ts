import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { MeasureUnit } from '../models/measure-unit.model';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/city.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemAService {


  //private items: Item[]=[new Item(123, "Bočna daska", 2356, 0.2, new MeasureUnit("kom", "Komad")), new Item(456, "Kratka daska", 1555, 0.2, new MeasureUnit("kom", "Komad")),new Item(789, "Crna daska", 3565, 0.2,new MeasureUnit("kom", "Komad"))];
  private apiUrl = 'http://localhost:3000/api/items';

  constructor(private http: HttpClient) { }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

 
}
