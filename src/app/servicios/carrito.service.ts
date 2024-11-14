import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private items: { item: any, quantity: number, type: 'compra' | 'alquiler' }[] = [];
  private itemCount = new BehaviorSubject<number>(0);

  constructor() {}

  getItems() {
    return this.items;
  }

  getItemCount() {
    return this.itemCount.asObservable();
  }

  addItem(item: any, type: 'compra' | 'alquiler') {
    const existingItem = this.items.find(cartItem => cartItem.item.id_producto === item.id_producto && cartItem.type === type);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ item, quantity: 1, type });
    }

    this.updateItemCount();
  }

  removeItem(item: any, type: 'compra' | 'alquiler') {
    const index = this.items.findIndex(cartItem => cartItem.item.id_producto === item.id_producto && cartItem.type === type);

    if (index !== -1) {
      if (this.items[index].quantity > 1) {
        this.items[index].quantity -= 1;
      } else {
        this.items.splice(index, 1);
      }
    }

    this.updateItemCount();
  }

  getTotal() {
    return this.items.reduce((total, cartItem) => {
      const price = cartItem.type === 'compra' ? cartItem.item.precio : cartItem.item.precio_alquiler;
      return total + (price * cartItem.quantity);
    }, 0);
  }

  private updateItemCount() {
    const count = this.items.reduce((total, cartItem) => total + cartItem.quantity, 0);
    this.itemCount.next(count);
  }
}