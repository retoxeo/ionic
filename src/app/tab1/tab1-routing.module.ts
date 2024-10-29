import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
    children: [
      {
        path: 'juegos',
        loadChildren: () => import('./juegos/juegos.module').then(m => m.JuegosPageModule)
      },
      {
        path: 'consolas',
        loadChildren: () => import('./consolas/consolas.module').then(m => m.ConsolasPageModule)
      },
      {
        path: 'smarts',
        loadChildren: () => import('./smarts/smarts.module').then(m => m.SmartsPageModule)
      },
      {
        path: '',
        redirectTo: 'juegos',
        pathMatch: 'full' // Redirige a 'juegos' por defecto
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
