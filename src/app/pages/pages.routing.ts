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
import { ProfileComponent } from './profile/profile.component';

import { UsersComponent } from './maintenance/users/users.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { title: 'Configuraciones' },
      },
      {
        path: 'graph1',
        component: Graph1Component,
        data: { title: 'Graficas' },
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { title: 'Perfil de usuario' },
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

      // Mantenimientos
      {
        path: 'users',
        component: UsersComponent,
        data: { title: 'Usuarios de App' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
