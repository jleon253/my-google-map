import {Component, OnInit, ViewChild} from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import {MyMarker} from '../../classes/myMarker.class';

import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MapaDialogComponent } from './mapa-dialog/mapa-dialog.component';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  @ViewChild(GoogleMap, {static: false}) map: GoogleMap;
  @ViewChild(MapInfoWindow, {static: false}) info: MapInfoWindow;

  zoom = 17;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap'
  };
  markers: MyMarker[] = [];
  markerSelect: MyMarker;
  infoTitle = '';
  infoContent = '';

  constructor( private _snackBar: MatSnackBar, private _dialog: MatDialog ) { 
    this.loadMarkers();
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(x => {
      this.center = {
        lat: x.coords.latitude,
        lng: x.coords.longitude
      };
    });
  }

  addMarker(evento: google.maps.MouseEvent) {
    const newMyMarker = new MyMarker(this.markers.length, evento.latLng.lat(), evento.latLng.lng());
    this.map.panTo(evento.latLng);
    this.markers.push(newMyMarker);
    this.saveMarkers();
  }

  openInfo(marker: MapMarker, titleMarker: string, contentMarker: string, myMarker: MyMarker) {
    this.infoTitle = titleMarker;
    this.infoContent = contentMarker;
    this.markerSelect = myMarker;
    this.info.open(marker);
  }

  saveMarkers() {
    localStorage.setItem('myMarkers', JSON.stringify(this.markers));
  }

  loadMarkers() {
    if (localStorage.getItem('myMarkers')) {
      this.markers = JSON.parse(localStorage.getItem('myMarkers'));
    }
  }

  editMarker() {
    const dialogRef = this._dialog.open(MapaDialogComponent, {
      width: '300px',
      height: 'auto',
      data: {
        titulo: this.infoTitle,
        descripcion: this.infoContent
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.markers[this.markerSelect.id].titulo = result.titulo;
        this.markers[this.markerSelect.id].desc = result.descripcion;
        this.infoTitle = result.titulo;
        this.infoContent = result.descripcion;
        this.showSnackBar('Marcador actualizado');
        this.saveMarkers();
      }
    });
  }

  removeMarker() {
    this.markers.splice(this.markerSelect.id, 1);
    this.markers.map((elem, index, arr) => {
      elem.id = index;
    });
    this.showSnackBar('Marcador borrado');
    this.saveMarkers();
  }

  showSnackBar(msg: string) {
    const snackBarRef = this._snackBar.open(msg, 'Cerrar');
  }

}
