export interface Genero {
  id: number;
  nombre: string;
}

export interface Videojuego {
  id_producto: number;
  id_videojuego: number;
  nombre: string;
  descripcion: string;
  precio: number;
  precio_alquiler: number;
  pegi: number;
  fecha_lanzamiento: string;
  desarrollador: string;
  fotos: string[];
  generos: Genero[];
}