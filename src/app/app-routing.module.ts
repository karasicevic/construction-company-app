import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { Supplier } from './models/supplier.model';
import { SupplierPageComponent } from './supplier-page/supplier-page.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { DispatchNotePageComponent } from './dispatch-note-page/dispatch-note-page.component';
import { AddSupplierComponent } from './supplier-page/add-supplier/add-supplier.component';
import { AddDispatchNoteComponent } from './dispatch-note-page/add-dispatch-note/add-dispatch-note.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'suppliers', component: SupplierPageComponent},
  { path: 'suppliers/add', component: AddSupplierComponent},
  { path: 'dispatch-notes', component: DispatchNotePageComponent},
  { path: 'dispatch-notes/add', component: AddDispatchNoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
