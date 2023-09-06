import { Component } from '@angular/core';
import { DispatchNote } from '../models/dispatch-note.model';
import { DispatchNotesService } from '../services/dispatch-notes.service';

@Component({
  selector: 'app-dispatch-note-page',
  templateUrl: './dispatch-note-page.component.html',
  styleUrls: ['./dispatch-note-page.component.scss']
})
export class DispatchNotePageComponent {

  notes: DispatchNote[]=[];

  constructor(private dispatchService:DispatchNotesService){
    this.dispatchService.getAllDispatchNotes().subscribe((dispatchNotes: DispatchNote[]) => {
      this.notes=dispatchNotes;
    })
  }

}
