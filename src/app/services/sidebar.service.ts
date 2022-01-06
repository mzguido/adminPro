import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  //
  public menu: any[] = [
    {
      title: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Home', url: '/' },
        { title: 'Barra de progreso', url: 'progress' },
        { title: 'Gráficas', url: 'graph1' },
        { title: 'Promesas', url: 'promises' },
        { title: 'Rxjs', url: 'rxjs' },
      ],
    },

    {
      title: 'Mantenimiento',
      icon: 'mdi mdi-tooltip-edit',
      submenu: [
        { title: 'Usuarios', url: 'users' },
        { title: 'Hospitales', url: 'hospitals' },
        { title: 'Medicos', url: 'doctors' },
      ],
    },
  ];

  constructor() {}
}
