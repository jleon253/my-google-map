import {Component, OnInit, ViewChild} from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MyMarker } from '../../classes/myMarker.class';


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

  constructor() { 
    this.loadMarkers();
  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(x => {
      this.center = {
        lat: x.coords.latitude,
        lng: x.coords.longitude
      };
    //   console.log('center', this.center);
    //   this.markers.push({
    //     position: {
    //       lat: x.coords.latitude,
    //       lng : x.coords.longitude
    //     },
    //     label: {
    //       color: 'orange',
    //       text: 'Dame click',
    //       fontWeight: 'bold',
    //       fontSixe: '16px'
    //     },
    //     title: 'Marker title',
    //     info: 'Lorem ipsum dolor atem',
    //     options: {
    //       animation: google.maps.Animation.BOUNCE
    //     }
    //   });
    });
  }

  addMarker(evento: google.maps.MouseEvent) {
    console.log('Agregando marcador - lat', evento.latLng.lat());
    console.log('Agregando marcador - lng', evento.latLng.lng());
    const newMyMarker = new MyMarker(this.markers.length, evento.latLng.lat(), evento.latLng.lng());
    this.map.panTo(evento.latLng);
    console.log('Nuevo my marker', newMyMarker);
    this.markers.push(newMyMarker);
    this.saveMarkers();
  }

  openInfo(marker: MapMarker, titleMarker: string, contentMarker: string, myMarker: MyMarker) {
    console.log(marker);
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
    console.log('markerSelect', this.markerSelect);
    this.markers.splice(this.markerSelect.id, 1);
    this.markers.map((elem, index, arr) => {
      elem.id = index;
      elem.label.text = `${index}`;
    });
    this.map.ngOnChanges();
    console.log('Markers', this.markers);
    this.saveMarkers();
  }

}
