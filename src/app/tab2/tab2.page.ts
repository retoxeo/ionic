import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements AfterViewInit {
  map: any;

  tiendas = [
    { lat: 40.416775, lng: -3.703790, nombre: 'Tienda Madrid (PROXIMA APERTURA)' },
    { lat: 41.385064, lng: 2.173404, nombre: 'Tienda Barcelona (PROXIMA APERTURA)' },
    { lat: 43.263000, lng: -2.935000, nombre: 'Tienda Bilbao ' },

    // Agrega más tiendas aquí
  ];

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    this.map = L.map('map').setView([40.416775, -3.703790], 6); // Ubicación inicial del mapa
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    const defaultIcon = L.icon({
      iconUrl: 'assets/map_rojo.png', // Ruta al icono personalizado para las demás tiendas
      iconSize: [38, 38], // Tamaño del icono
      iconAnchor: [22, 38], // Punto del icono que corresponde a la ubicación del marcador
      popupAnchor: [-3, -38] // Punto desde el cual se abrirá el popup relativo al icono
    });

    const bilbaoIcon = L.icon({
      iconUrl: 'assets/map_azul.png', // Ruta al icono personalizado para la tienda de Bilbao
      iconSize: [38, 38], // Tamaño del icono
      iconAnchor: [22, 38], // Punto del icono que corresponde a la ubicación del marcador
      popupAnchor: [-3, -38] // Punto desde el cual se abrirá el popup relativo al icono
    });

    this.tiendas.forEach(tienda => {
      const icon = tienda.nombre.includes('Bilbao') ? bilbaoIcon : defaultIcon;
      L.marker([tienda.lat, tienda.lng], { icon }).addTo(this.map)
        .bindPopup(tienda.nombre)
        .openPopup();
    });
  }
}