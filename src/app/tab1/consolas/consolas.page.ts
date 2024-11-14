import { Component, OnInit } from '@angular/core';
import { XeoService } from '../../servicios/xeo.service';
import { Consola } from '../../modelos/consolas.model';
import { TabBarService } from '../../servicios/tab-bar.service';  // Servicio para controlar la visibilidad de la tab-bar
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-consolas',
  templateUrl: './consolas.page.html',
  styleUrls: ['./consolas.page.scss'],
})
export class ConsolasPage implements OnInit {

  consolas: Consola[] = [];
  filteredConsolas: Consola[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;
  hasError: boolean = false;
  selectedConsola: Consola | null = null;

  constructor(private xeoService: XeoService, private tabBarService: TabBarService, private carritoService: CarritoService) {}

  ngOnInit() {
    this.cargarConsolas();
  }

  cargarConsolas() {
    this.isLoading = true;
    this.hasError = false;
    console.log('Cargando consolas...');
    this.xeoService.getConsolas().subscribe(
      (data: Consola[]) => {
        console.log('Datos recibidos:', data);
        this.consolas = data;
        this.filteredConsolas = data;
        this.isLoading = false;
        this.hasError = false;
        this.filterConsolas();
      },
      (error) => {
        console.error('Error al cargar consolas:', error);
        this.isLoading = false;
        this.hasError = true;
      }
    );
  }

  filterConsolas() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredConsolas = this.consolas.filter(consola =>
      consola.nombre.toLowerCase().includes(searchTermLower)
    );
  }

  cambiarUrlImagen(url: string): string {
    if (url.startsWith('http://')) {
      return url.replace('http://', 'https://');
    }
    return url;
  }

  doRefresh(event: any) {
    console.log('Begin async operation');
    this.cargarConsolas();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  verDetalles(consola: Consola) {
    console.log('Consola seleccionada:', consola);
    this.selectedConsola = consola;

    // Llamar al servicio para ocultar la tab-bar
    this.tabBarService.hideTabBar();
  }

  cerrarDetalles() {
    this.selectedConsola = null;
    this.tabBarService.showTabBar(); 

    // Forzar actualización de la barra de tabs
    setTimeout(() => {
      this.tabBarService.updateTabBar();
    }, 100);
  }

  comprarConsola(consola: Consola) {
    this.carritoService.addItem(consola, 'compra');
  }

  alquilarConsola(consola: Consola) {
    this.carritoService.addItem(consola, 'alquiler');
  }
}