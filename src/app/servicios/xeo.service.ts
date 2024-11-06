import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Videojuego, Genero } from '../modelos/videojuegos.model';

@Injectable({
  providedIn: 'root'
})
export class XeoService {
  public url = 'https://retoxeo8.duckdns.org/xeo/';

  constructor(private http: HttpClient) { }

  getVideojuegos(): Observable<Videojuego[]> {
    return this.http.get<Videojuego[]>(this.url + 'videojuegos');
  }

  getGeneros(): Observable<Genero[]> {
    return this.http.get<Genero[]>(this.url + 'generos');
  }
}