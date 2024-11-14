import { Component, OnInit } from '@angular/core';
import { XeoService } from '../../servicios/xeo.service';
import { Videojuego, Genero } from '../../modelos/videojuegos.model';
import { TabBarService } from '../../servicios/tab-bar.service';  // Servicio para controlar la visibilidad de la tab-bar
import { CarritoService } from 'src/app/servicios/carrito.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.page.html',
  styleUrls: ['./juegos.page.scss'],
})
export class JuegosPage implements OnInit {

  juegos: Videojuego[] = [];
  filteredJuegos: Videojuego[] = [];
  generos: Genero[] = [];
  searchTerm: string = '';
  selectedGenero: string = '';
  isLoading: boolean = true;
  hasError: boolean = false;
  selectedJuego: Videojuego | null = null;


    // Juegos de ejemplo
    ejemploJuegos: Videojuego[] = [
      {
        id_producto: 1,
        id_videojuego: 1,
        nombre: 'Juego de ejemplo 1',
        descripcion: 'Descripción del juego de ejemplo 1',
        precio: 100,
        precio_alquiler: 50,
        pegi: 12,
        fecha_lanzamiento: new Date().toISOString(),
        desarrollador: 'Desarrollador de ejemplo',
        fotos: ['ruta/a/imagen1.jpg'],
        generos: [{ id: 1, nombre: 'Acción' }]
      },
      {
        id_producto: 2,
        id_videojuego: 2,
        nombre: 'Juego de ejemplo 2',
        descripcion: 'Descripción del juego de ejemplo 2',
        precio: 20,
        precio_alquiler: 50,
        pegi: 12,
        fecha_lanzamiento: new Date().toISOString(),
        desarrollador: 'Desarrollador de ejemplo',
        fotos: ['ruta/a/imagen2.jpg'],
        generos: [{ id: 2, nombre: 'Aventura' }]
      }
    ];

  constructor(private xeoService: XeoService, private tabBarService: TabBarService, private carritoService: CarritoService) {}

  ngOnInit() {
    this.cargarVideoJuegos();
    this.cargarGeneros();
  }

  cargarVideoJuegos() {
    this.isLoading = true;
    this.hasError = false;
    this.selectedGenero = ''; // Restablecer el filtro de género
    console.log('Cargando videojuegos...');
    this.xeoService.getVideojuegos().subscribe(
      (data: Videojuego[]) => {
        console.log('Datos recibidos:', data);
        this.juegos = data;
        this.filteredJuegos = data;
        this.isLoading = false;
        this.hasError = false;
        this.filterJuegos();
      },
      (error) => {
        console.error('Error al cargar videojuegos:', error);
        this.isLoading = false;
        this.hasError = true;
      }
    );
  }

  cargarGeneros() {
    this.xeoService.getGeneros().subscribe(
      (data: Genero[]) => {
        this.generos = data;
      },
      (error) => {
        console.error('Error al cargar géneros:', error);
      }
    );
  }

  filterJuegos() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredJuegos = this.juegos.filter(juego =>
      juego.nombre.toLowerCase().includes(searchTermLower) &&
      (this.selectedGenero === '' || juego.generos.some(genero => genero.nombre === this.selectedGenero))
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
    this.cargarVideoJuegos();
    this.cargarGeneros();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  verDetalles(juego: Videojuego) {
    console.log('Juego seleccionado:', juego);
    this.selectedJuego = juego;

    // Llamar al servicio para ocultar la tab-bar
    this.tabBarService.hideTabBar();
  }

  cerrarDetalles() {
    this.selectedJuego = null;
    this.tabBarService.showTabBar(); 

    // Forzar actualización de la barra de tabs
    setTimeout(() => {
      this.tabBarService.updateTabBar();
    }, 100);
  }

  comprarJuego(juego: Videojuego) {
    this.carritoService.addItem(juego, 'compra');
  }

  alquilarJuego(juego: Videojuego) {
    this.carritoService.addItem(juego, 'alquiler');
  }
}