import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomePageComponent } from './home-page/home-page.component';
import { DispatchNotePageComponent } from './dispatch-note-page/dispatch-note-page.component';
import { SupplierPageComponent } from './supplier-page/supplier-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePipe,
    SuppliersPipe,
    DispatchNotePipe,
    HomePageComponent,
    DispatchNotePageComponent,
    SupplierPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
