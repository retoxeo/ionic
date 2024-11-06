import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lateral-recycler-view',
  templateUrl: './lateral-recycler-view.component.html',
  styleUrls: ['./lateral-recycler-view.component.scss'],
})
export class LateralRecyclerViewComponent implements OnInit {
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