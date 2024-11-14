import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabBarService {
  private tabBarVisible = new BehaviorSubject<boolean>(true);
  tabBarVisible$ = this.tabBarVisible.asObservable();
  private tabBarPosition: { left: string, width: string } | null = null;

  constructor() {}

  hideTabBar() {
    const tabBar = document.querySelector('ion-tab-bar') as HTMLElement;
    if (tabBar) {
      this.saveTabBarPosition();
      tabBar.style.visibility = 'hidden'; // Ocultar solo la tab-bar
    }
    this.tabBarVisible.next(false);
  }

  showTabBar() {
    const tabBar = document.querySelector('ion-tab-bar') as HTMLElement;
    if (tabBar) {
      tabBar.style.visibility = 'visible'; // Mostrar la tab-bar nuevamente
      this.restoreTabBarPosition();
    }
    this.tabBarVisible.next(true);
  }

  updateTabBar() {
    const tabBar = document.querySelector('ion-tab-bar') as HTMLElement;
    if (tabBar) {
      tabBar.style.display = 'none';
      tabBar.offsetHeight; // Forzar reflujo
      tabBar.style.display = '';
    }
  }

  private saveTabBarPosition() {
    const tabIndicator = document.querySelector('.tab-indicator') as HTMLElement;
    if (tabIndicator) {
      this.tabBarPosition = {
        left: tabIndicator.style.left,
        width: tabIndicator.style.width
      };
    }
  }

  private restoreTabBarPosition() {
    const tabIndicator = document.querySelector('.tab-indicator') as HTMLElement;
    if (tabIndicator && this.tabBarPosition) {
      tabIndicator.style.left = this.tabBarPosition.left;
      tabIndicator.style.width = this.tabBarPosition.width;
    }
  }
}