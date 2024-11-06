import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  step: number = 1;

  constructor() {}

  nextStep() {
    this.step = 2;
  }

  submitForm() {
    // Lógica para enviar el formulario
    console.log('Formulario enviado');
  }
}