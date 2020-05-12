export class MyMarker {
  public id = 0;
  public titulo = 'Sin título';
  public desc = 'Sin descripción';
  public position = {
    lat: 0,
    lng: 0
  };
  public label = {
    color: 'orange',
    text: '',
    fontWeight: 'bold',
    fontSixe: '16px'
  };
  // public options = {
  //   animation: google.maps.Animation.BOUNCE
  // };

  constructor(id: number, lat: number, lng: number) {
    this.id = id;
    this.position.lat = lat;
    this.position.lng = lng;
  }
}