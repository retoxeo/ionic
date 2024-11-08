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
  cartItems: any[] = [];
  itemCount: number = 0;

  constructor(
    private popoverController: PopoverController, 
    private router: Router,
    private menu: MenuController,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.updateItemCount();
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
        this.handlePopoverSelection(result.data);
      }
      this.isPopoverOpen = false;
    });

    this.isPopoverOpen = false;
    await popover.present();
  }

  async handlePopoverSelection(option: string) {
    if (this.isPopoverOpen) {
      await this.popoverController.dismiss();
      this.isPopoverOpen = false;
    }
    switch (option) {
      case 'login':
        this.router.navigate(['/login']);
        break;
      case 'perfil':
        this.router.navigate(['/perfil']);
        break;
      case 'logout':
        this.router.navigate(['/logout']);
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
    this.menu.open('cartMenu');
  }

  updateItemCount() {
    this.itemCount = this.carritoService.getItemCount();
  }
}