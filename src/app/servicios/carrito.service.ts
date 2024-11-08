// carrito.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private items: any[] = [];

  constructor() {}

  addItem(item: any) {
    this.items.push(item);
  }

  getItems() {
    return this.items;
  }

  getItemCount() {
    return this.items.length;
  }

  clearCart() {
    this.items = [];
  }
}