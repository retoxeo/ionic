import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('tabIndicator', { static: false }) tabIndicator!: ElementRef;

  constructor() {}
  
  onTabChange(event: any) {
    const selectedTab = event.tab;
    const tabButtons = document.querySelectorAll('ion-tab-button');
    const selectedButton = Array.from(tabButtons).find(button => button.getAttribute('tab') === selectedTab);

    if (selectedButton && this.tabIndicator) {
      const indicator = this.tabIndicator.nativeElement;
      const selectedButtonRect = selectedButton.getBoundingClientRect();
      const tabButtonsRect = selectedButton.parentElement ? selectedButton.parentElement.getBoundingClientRect() : { left: 0, width: 0 };
      const label = selectedButton.querySelector('ion-label');

      if (label) {
        const labelRect = label.getBoundingClientRect();
        indicator.style.left = `${labelRect.left - tabButtonsRect.left}px`;
        indicator.style.width = `${labelRect.width}px`; // Ajusta el ancho del indicador al ancho del texto
      }
    }
  }
}