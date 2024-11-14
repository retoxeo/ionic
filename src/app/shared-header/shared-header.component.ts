import { Component, OnInit } from '@angular/core';
import { PopoverController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PopoverContentComponent } from './popover-content.component';
import { CarritoService } from '../servicios/carrito.service';

@Component({
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.scss'],
})
export class SharedHeaderComponent implements OnInit {
  isPopoverOpen = false;
  cartItems: { item: any, quantity: number, type: 'compra' | 'alquiler' }[] = [];
  itemCount: number = 0;
  total: number = 0;

  constructor(
    private popoverController: PopoverController, 
    private router: Router,
    private menu: MenuController,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.carritoService.getItemCount().subscribe(count => {
      this.itemCount = count;
    });
  
    this.cartItems = this.carritoService.getItems();
    this.updateTotal();
  }

  async presentPopover(ev: Event) {
    const popover = await this.popoverController.create({
      component: PopoverContentComponent,
      event: ev,
      alignment: 'end',
      translucent: true,
      cssClass: 'custom-popover'
    });

    popover.onDidDismiss().then((result) => {
      if (result.data) {
        // Manejar el resultado del popover aquí
      }
      this.isPopoverOpen = false;
    });

    this.isPopoverOpen = true;
    await popover.present();
  }

  async handlePopoverSelection(option: string) {
    if (this.isPopoverOpen) {
      await this.popoverController.dismiss();
      this.isPopoverOpen = false;
    }
    switch (option) {
      case 'login':
        // Manejar la opción de login aquí
        break;
      case 'logout':
        // Manejar la opción de logout aquí
        break;
      case 'perfil':
        // Manejar la opción de perfil aquí
        break;
    }
  }

  async goToProfile(event: Event) {
    await this.handlePopoverSelection('perfil');
  }

  async logout(event: Event) {
    await this.handlePopoverSelection('logout');
  }

  async login(event: Event) {
    await this.handlePopoverSelection('login');
  }

  openCartMenu() {
    this.cartItems = this.carritoService.getItems();
    this.updateTotal();
    this.menu.open('cartMenu');
  }

  updateItemCount() {
    this.carritoService.getItemCount().subscribe(count => {
      this.itemCount = count;
    });
  }

  increaseQuantity(item: any, type: 'compra' | 'alquiler') {
    this.carritoService.addItem(item, type);
    this.cartItems = this.carritoService.getItems();
    this.updateTotal();
  }

  decreaseQuantity(item: any, type: 'compra' | 'alquiler') {
    this.carritoService.removeItem(item, type);
    this.cartItems = this.carritoService.getItems();
    this.updateTotal();
  }

  updateTotal() {
    this.total = this.carritoService.getTotal();
  }
}