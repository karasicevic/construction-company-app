import { Injectable } from '@angular/core';
import { DispatchNote } from '../models/dispatch-note.model';
import { Observable, of } from 'rxjs';
import { Supplier } from '../models/supplier.model';
import { City } from '../models/city.model';
import { Street } from '../models/street.model';
import { Number } from '../models/number.model';
import { ConstructionCompany } from '../models/construction-company.model';
import { ItemOfDispatchNote } from '../models/item-of-dispatch-note.model';

@Injectable({
  providedIn: 'root'
})
export class DispatchNotesService {
  
  private city=new City(11245, "Kusadak");
  private street=new Street(this.city, 12,"trlalalal");
  private number1=new Number(this.city, this.street, 5);
  private items: ItemOfDispatchNote[]=[]

  notes: DispatchNote[]=[new DispatchNote(159456789, "avionom", new Date(11-11-2023), new Supplier("123456789", "dobavljac1", "123456789123456789","1234567890",this.city, this.street, this.number1),new ConstructionCompany(),
  1594826, this.items)];

  constructor() { }

  addDispatchNote(note: DispatchNote){
    console.log(note)
  }

  getAllDispatchNotes(): Observable<DispatchNote[]> {
      return of(this.notes);
    }
}
