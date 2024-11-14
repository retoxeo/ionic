import { Component, OnInit } from '@angular/core';
import { XeoService } from '../../servicios/xeo.service';
import { Smart } from '../../modelos/smarts.model';
import { TabBarService } from '../../servicios/tab-bar.service';  // Servicio para controlar la visibilidad de la tab-bar
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-smarts',
  templateUrl: './smarts.page.html',
  styleUrls: ['./smarts.page.scss'],
})
export class SmartsPage implements OnInit {

  smarts: Smart[] = [];
  filteredSmarts: Smart[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;
  hasError: boolean = false;
  selectedSmart: Smart | null = null;

  constructor(private xeoService: XeoService, private tabBarService: TabBarService, private carritoService: CarritoService) {}

  ngOnInit() {
    this.cargarSmarts();
  }

  cargarSmarts() {
    this.isLoading = true;
    this.hasError = false;
    console.log('Cargando dispositivos móviles...');
    this.xeoService.getSmarts().subscribe(
      (data: Smart[]) => {
        console.log('Datos recibidos:', data);
        this.smarts = data;
        this.filteredSmarts = data;
        this.isLoading = false;
        this.hasError = false;
        this.filterSmarts();
      },
      (error) => {
        console.error('Error al cargar dispositivos móviles:', error);
        this.isLoading = false;
        this.hasError = true;
      }
    );
  }

  filterSmarts() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredSmarts = this.smarts.filter(smart =>
      smart.nombre.toLowerCase().includes(searchTermLower)
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
    this.cargarSmarts();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  verDetalles(smart: Smart) {
    console.log('Dispositivo seleccionado:', smart);
    this.selectedSmart = smart;

    // Llamar al servicio para ocultar la tab-bar
    this.tabBarService.hideTabBar();
  }

  cerrarDetalles() {
    this.selectedSmart = null;
    this.tabBarService.showTabBar(); 

    // Forzar actualización de la barra de tabs
    setTimeout(() => {
      this.tabBarService.updateTabBar();
    }, 100);
  }

  comprarSmart(smart: Smart) {
    this.carritoService.addItem(smart, 'compra');
  }

  alquilarSmart(smart: Smart) {
    this.carritoService.addItem(smart, 'alquiler');
  }
}