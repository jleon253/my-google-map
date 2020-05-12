import {Component, OnInit, ViewChild} from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import {MyMarker} from '../../classes/myMarker.class';

import {MatSnackBar} from '@angular/material/snack-bar';


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

  constructor( private _snackBar: MatSnackBar ) { 
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

  removeMarker() {
    this.markers.splice(this.markerSelect.id, 1);
    this.markers.map((elem, index, arr) => {
      elem.id = index;
    });
    const snackBarRef = this._snackBar.open('Marcador borrado', 'Cerrar');
    this.saveMarkers();
  }

}
