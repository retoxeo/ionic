import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular'; 

@Component({
  selector: 'app-popover-content',
  template: `
    <ion-list>
      <ion-item button (click)="selectOption('login')">Login</ion-item>
      <ion-item button (click)="selectOption('perfil')">Perfil</ion-item>
      <ion-item button (click)="selectOption('logout')">Cerrar sesión</ion-item>
    </ion-list>
  `
})
export class PopoverContentComponent {
  constructor(private popoverController: PopoverController) {} 

  async selectOption(option: string) {
    await this.popoverController.dismiss(option);
  }
}