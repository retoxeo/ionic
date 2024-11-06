import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lateral-recycler-view-tienda2',
  templateUrl: './lateral-recycler-view-tienda2.component.html',
  styleUrls: ['./lateral-recycler-view-tienda2.component.scss'],
})
export class LateralRecyclerViewTienda2Component implements OnInit {
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