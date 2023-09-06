import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemAService {

  private items: Item[]=[new Item(123, "Bočna daska", 2356, 0.2),new Item(456, "Kratka daska", 1555, 0.2),new Item(789, "Crna daska", 3565, 0.2)];

  constructor() { }

  getItemsA(){
    return this.items;
  }
}
