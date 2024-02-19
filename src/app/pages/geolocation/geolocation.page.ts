import { Component, OnInit } from '@angular/core';
import { Geolocation, GeolocationPluginPermissions } from '@capacitor/geolocation';
declare var L: any;

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.page.html',
  styleUrls: ['./geolocation.page.scss'],
})
export class GeolocationPage implements OnInit {
  public location: any = { latitude: null, longitude: null };
  constructor() { }

  ngOnInit() {
    
  }

  ionViewDidEnter(){
    this.printCurrentPosition();
  }

  setMap() {
    const leafletMap = new L.map('map');
    let latLng = [this.location.latitude, this.location.longitude];
    leafletMap.setView(latLng, 15);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(leafletMap);

    let marker = L.marker(latLng).addTo(leafletMap);
    marker.bindPopup("I am here now").openPopup();

    // let popup = L.popup()
    // .setLatLng(latLng)
    // .setContent("I am here now")
    // .openOn(leafletMap);
  }

  async printCurrentPosition() {
    const options: any = {
      enableHighAccuracy: true,
      timeout: 15000
    }

    const permission = await Geolocation.requestPermissions();
    console.log(JSON.stringify(permission));

    if(permission.location == 'granted'){
      try {
        const position = await Geolocation.getCurrentPosition(options);
        console.log(position);
        this.location = position.coords;
        this.setMap();
      } catch (err: any) {
        alert('Error: ' + JSON.stringify(err));
      }
    } else {
      alert('Permission denied. Please set the permission to allow geolocation');
    }

  }

}
