import { Component, OnInit } from '@angular/core';
import { XeoService } from '../servicios/xeo.service';
import { Tienda } from '../modelos/tiendas.model';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  tiendas: Tienda[] = [];

  constructor(private tiendaService: XeoService) {}

  ngOnInit() {
    this.cargarTiendas();
  }

  cargarTiendas() {
    this.tiendaService.getTiendas().subscribe(
      (data: Tienda[]) => {
        this.tiendas = data;
      },
      (error) => {
        console.error('Error al cargar tiendas:', error);
      }
    );
  }
}