import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Graph1Component } from './graph1/graph1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      {
        path: 'graph1',
        component: Graph1Component,
        data: { title: 'Graficas' },
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { title: 'Barras de Progreso' },
      },
      {
        path: 'promises',
        component: PromisesComponent,
        data: { title: 'Pormesas' },
      },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'RXJS' } },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { title: 'Configuraciones' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
