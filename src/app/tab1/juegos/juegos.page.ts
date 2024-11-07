import { Component, OnInit } from '@angular/core';
import { XeoService } from '../../servicios/xeo.service';
import { Videojuego, Genero } from '../../modelos/videojuegos.model';

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
  isLoading: boolean = true; // Variable de estado para rastrear la carga de datos
  hasError: boolean = false; // Variable de estado para rastrear si ha ocurrido un error

  constructor(private xeoService: XeoService) {}

  ngOnInit() {
    this.cargarVideoJuegos();
    this.cargarGeneros();
  }

  cargarVideoJuegos() {
    this.isLoading = true;
    this.hasError = false;
    this.selectedGenero = ''; // Restablece el select a la opción por defecto "Todos"
    console.log('Cargando videojuegos...');
    this.xeoService.getVideojuegos().subscribe(
      (data: Videojuego[]) => {
        console.log('Datos recibidos:', data);
        this.juegos = data;
        this.filteredJuegos = data;
        this.isLoading = false; // Datos cargados, desactivar el estado de carga
        this.hasError = false; // Reiniciar el estado de error
        this.filterJuegos(); // Filtra los juegos después de cargar los datos
      },
      (error) => {
        console.error('Error al cargar videojuegos:', error);
        this.isLoading = false; // Error al cargar datos, desactivar el estado de carga
        this.hasError = true; // Activar el estado de error
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
}