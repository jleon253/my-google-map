import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './modules/material/material.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapaComponent } from './components/mapa/mapa.component';
import {MapaDialogComponent} from './components/mapa/mapa-dialog/mapa-dialog.component';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  entryComponents: [
    MapaDialogComponent
  ],
  declarations: [
    AppComponent,
    MapaComponent,
    MapaDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    GoogleMapsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
