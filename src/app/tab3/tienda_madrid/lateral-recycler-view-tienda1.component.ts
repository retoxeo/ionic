import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lateral-recycler-view-tienda1',
  templateUrl: './lateral-recycler-view-tienda1.component.html',
  styleUrls: ['./lateral-recycler-view-tienda1.component.scss'],
})
export class LateralRecyclerViewTienda1Component implements OnInit {
  images: string[] = [
    '/assets/map_azul.png',
    '/assets/map_azul.png',
    '/assets/map_azul.png',
    '/assets/map_azul.png',
    '/assets/map_azul.png',
    '/assets/map_azul.png',
    '/assets/map_azul.png',
    // Agrega más rutas de imágenes aquí
  ];

  constructor() { }

  ngOnInit() {}
}