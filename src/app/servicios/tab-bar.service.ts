// TabBarService

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabBarService {
  private tabBarVisible = new BehaviorSubject<boolean>(true);
  tabBarVisible$ = this.tabBarVisible.asObservable();

  constructor() {}

  hideTabBar() {
    const tabBar = document.querySelector('ion-tab-bar');
    if (tabBar) {
      tabBar.style.visibility = 'hidden'; // Ocultar solo la tab-bar
    }
    this.tabBarVisible.next(false);
  }

  showTabBar() {
    const tabBar = document.querySelector('ion-tab-bar');
    if (tabBar) {
      tabBar.style.visibility = 'visible'; // Mostrar la tab-bar nuevamente
    }
    this.tabBarVisible.next(true);
  }
}
