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

  async ionViewDidEnter() {
    await this.loadMap();
  }

  async loadMap() {
    try {
      // Configura las opciones de Geolocation para alta precisión
      const options: PositionOptions = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      };

      // Obtiene la ubicación actual con alta precisión
      const coordinates = await Geolocation.getCurrentPosition(options);
      const latLng = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude,
      };

      // Verifica si Google Maps está disponible
      if (typeof google !== 'undefined') {
        // Inicializa el mapa
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
          center: latLng,
          zoom: 15,
          disableDefaultUI: true, // Desactiva la UI por defecto para mejorar el rendimiento
        });

        // Añade un marcador en la ubicación actual con un icono personalizado
        this.userMarker = new google.maps.Marker({
          position: latLng,
          map: this.map,
          title: 'Tu ubicación',
          icon: {
            url: '/assets/map_azul.png', // Ruta al icono personalizado
            scaledSize: new google.maps.Size(40, 40) // Ajusta el tamaño del icono
          }
        });

        // Añade marcadores adicionales
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
    } catch (error) {
      console.log('Error getting location', error);
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
            url: '/assets/map_azul.png', // Ruta al icono personalizado
            scaledSize: new google.maps.Size(40, 40) // Ajusta el tamaño del icono
          }
        });
      }

      this.map.setCenter(latLng);
    } catch (error) {
      console.log('Error getting location', error);
      if (this.userMarker) {
        this.userMarker.setMap(null);
        this.userMarker = null;
      }
    }
  }
}