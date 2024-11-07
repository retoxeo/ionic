import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation, PositionOptions } from '@capacitor/geolocation';

declare var google: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild('map', { static: false }) mapElement!: ElementRef; // Using non-null assertion

  map: any;
  userMarker: any;
  locationError: boolean = false;

  async ionViewDidEnter() {
    await this.loadMap();
  }

  async loadMap() {
    try {
      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      };

      const coordinates = await Geolocation.getCurrentPosition(options);
      const latLng = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      };

      this.initializeMap(latLng);
      this.locationError = false;
    } catch (error) {
      console.log('Error getting location', error);
      this.locationError = true;
      // Usa una ubicación predeterminada si no se puede obtener la ubicación actual
      const defaultLatLng = { lat: 40.416775, lng: -3.703790 }; // Madrid, España
      this.initializeMap(defaultLatLng);
    }
  }

  initializeMap(latLng: { lat: number, lng: number }) {
    if (typeof google !== 'undefined') {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: latLng,
        zoom: 15,
        disableDefaultUI: true,
      });

      this.userMarker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: 'Tu ubicación',
        icon: {
          url: '/assets/map_azul.png',
          scaledSize: new google.maps.Size(40, 40)
        }
      });

      const locations = [
        { lat: 40.416775, lng: -3.703790, nombre: 'Tienda Madrid (PROXIMA APERTURA)' },
        { lat: 41.385064, lng: 2.173404, nombre: 'Tienda Barcelona (PROXIMA APERTURA)' },
        { lat: 43.263012, lng: -2.934985, nombre: 'Tienda Bilbao (PROXIMA APERTURA)' },
      ];

      locations.forEach(location => {
        new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: this.map,
          title: location.nombre,
        });
      });
    }
  }

  async moveToCurrentLocation() {
    try {
      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      };

      const coordinates = await Geolocation.getCurrentPosition(options);
      const latLng = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      };

      if (this.userMarker) {
        this.userMarker.setPosition(latLng);
      } else {
        this.userMarker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: 'Tu ubicación',
          icon: {
            url: '/assets/map_azul.png',
            scaledSize: new google.maps.Size(40, 40)
          }
        });
      }

      this.map.setCenter(latLng);
      this.locationError = false;
    } catch (error) {
      console.log('Error getting location', error);
      this.locationError = true;
      if (this.userMarker) {
        this.userMarker.setMap(null);
        this.userMarker = null;
      }
    }
  }
}