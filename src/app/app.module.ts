import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomePageComponent } from './home-page/home-page.component';
import { DispatchNotePageComponent } from './dispatch-note-page/dispatch-note-page.component';
import { SupplierPageComponent } from './supplier-page/supplier-page.component';
import { HeaderComponent } from './global-components/header/header.component';
import { FooterComponent } from './global-components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { AddSupplierComponent } from './supplier-page/add-supplier/add-supplier.component';
import { AddDispatchNoteComponent } from './dispatch-note-page/add-dispatch-note/add-dispatch-note.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupplierRowComponent } from './supplier-page/supplier-row/supplier-row.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { DispatchNoteRowComponent } from './dispatch-note-page/dispatch-note-row/dispatch-note-row.component';
import { HttpClientModule } from '@angular/common/http';
import { NgScrollbarModule  } from 'ngx-scrollbar';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DispatchNotePageComponent,
    SupplierPageComponent,
    HeaderComponent,
    FooterComponent,
    ContactPageComponent,
    AddSupplierComponent,
    AddDispatchNoteComponent,
    SupplierRowComponent,
    DispatchNoteRowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    HttpClientModule,
    NgScrollbarModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
