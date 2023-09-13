import { Injectable } from '@angular/core';
import { DispatchNote } from '../models/dispatch-note.model';
import { Observable, catchError, forkJoin, from, map, of, switchMap } from 'rxjs';
import { Supplier } from '../models/supplier.model';
import { ItemOfDispatchNote } from '../models/item-of-dispatch-note.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SupplierService } from './supplier.service';
import { Item } from '../models/item.model';
import { MeasureUnit } from '../models/measure-unit.model';

export class NoteData {
  constructor(
    public number: number,
    public shippingMethod: string,
    public date: Date,
    public supplierTaxId: string,
    public purchaseOrder: number,
    public items: ItemsData[]
  ) { }
}
export class ItemsData {
  constructor(
    public dispatchNote: number,
    public number: number,
    public item: number,
    public note: string,
    public quantity: number,
    public purchaseOrder: number,
    public itemOfPurchaseOrder: number
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class DispatchNotesService {

  private items: ItemOfDispatchNote[] = []
  private apiUrl = `http://localhost:3000/api/dispatch-notes`;



  constructor(private http: HttpClient, private supplierService: SupplierService) { }



  getAllDispatchNotes(): Observable<DispatchNote[]> {
    return this.http.get<NoteData[]>(this.apiUrl).pipe(
      switchMap((noteDataArray: NoteData[]) => {
        // Dobavljanje dobavljača i mapiranje
        return from(this.supplierService.getAllSuppliers()).pipe(
          switchMap((suppliers: Supplier[]) => {
            // Kreiranje niza observabla za getAllItems pozive
            const itemObservables: Observable<ItemOfDispatchNote[]>[] = [];

            const dispatchNotes: DispatchNote[] = [];

            for (const noteData of noteDataArray) {
              const supplierToShow = suppliers.find((supp) => supp.taxId === noteData.supplierTaxId) as Supplier;

              // Kreiranje observabla za svaki getAllItems poziv i dodavanje u niz
              const itemsObservable = this.getAllItems(noteData.number).pipe(
                map((res: ItemOfDispatchNote[]) => {
                  return res;
                })
              );
              itemObservables.push(itemsObservable);

              const dispatchNote = new DispatchNote(
                noteData.number,
                noteData.shippingMethod,
                noteData.date,
                supplierToShow,
                noteData.purchaseOrder,
                [] // Početno prazan niz stavki, dodamoće kasnije kroz observable
              );
              dispatchNotes.push(dispatchNote);
            }

            // ForkJoin će čekati da se sve observabla izvrše pre nego što nastavi
            return forkJoin(itemObservables).pipe(
              map((itemArrays: ItemOfDispatchNote[][]) => {
                itemArrays.forEach((itemsArray, index) => {
                  dispatchNotes[index].items = itemsArray;
                  dispatchNotes[index].items.forEach(i => {
                    i.dispatchNote = dispatchNotes[index];
                  });
                });
                return dispatchNotes;
              })
            );
          })
        );
      })
    );
  }

  private getAllItems(number: number): Observable<ItemOfDispatchNote[]> {
    return this.http.get<ItemsData[]>(`${this.apiUrl}/${number}`).pipe(
      map((items: ItemsData[]) => {
        const itemsToReturn: ItemOfDispatchNote[] = [];
        items.forEach(itemData => {
          const itemToAdd = new ItemOfDispatchNote(
            null, // Postavite DispatchNote na odgovarajuću vrednost ako je dostupna
            itemData.number,
            itemData.note,
            itemData.quantity,
            new Item(itemData.item, '', 0, 0, new MeasureUnit('', '')), // Postavite Item na odgovarajuću vrednost ako je dostupna
            itemData.purchaseOrder,
            itemData.itemOfPurchaseOrder
          );
          itemsToReturn.push(itemToAdd);
        });
        return itemsToReturn;
      }),
      catchError(error => {
        console.error('Error fetching item data:', error);
        return of([]); // Vratite prazan niz u slučaju greške
      })
    );
  }

  addDispatchNote(note: DispatchNote) {
    const itemsData: ItemsData[] = [];
    note.items.forEach(item => {
      const i = new ItemsData(
        note.number,
        item.number,
        item.item.id,
        item.note,
        item.quantity,
        item.purchaseOrder,
        item.itemOfPurchaseOrder
      );
      itemsData.push(i);
    });
    const newNote = new NoteData(
      note.number,
      note.shippingMethod,
      note.date,
      note.supplier.taxId,
      note.purchaseOrder,
      itemsData
    )
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post(this.apiUrl, newNote, httpOptions)
      .pipe(
        map((response: any) => response)
      ).subscribe();

  }

  editDispatchNote(note: DispatchNote) {
    console.log("usao u edit u servisu")
    const itemsData: ItemsData[] = [];
    note.items.forEach(item => {
      const i = new ItemsData(
        note.number,
        item.number,
        item.item.id,
        item.note,
        item.quantity,
        item.purchaseOrder,
        item.itemOfPurchaseOrder
      );
      itemsData.push(i);
    });

    const updatedNote = new NoteData(
      note.number,
      note.shippingMethod,
      note.date,
      note.supplier.taxId,
      note.purchaseOrder,
      itemsData
    )
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.put(`${this.apiUrl}/${updatedNote.number}`, updatedNote, httpOptions)
      .pipe(
        map((response: any) => response)
      ).subscribe();

  }

}
