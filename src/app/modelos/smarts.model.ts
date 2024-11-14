export interface Smart {
  id_producto: number;
  id_dispositivo_movil: number;
  nombre: string;
  descripcion: string;
  precio: number;
  sistema_operativo: string;
  tipo: string;
  ram: string;
  procesador: string;
  almacenamiento: string;
  fecha_lanzamiento: string;
  desarrollador: string;
  fotos: string[];
  stock: number;
}