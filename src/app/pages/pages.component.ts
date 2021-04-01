import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  //

  constructor(private settingServ: SettingsService) {}

  ngOnInit(): void {
    customInitFunctions();

    // Forma del profe, ahora esta en SttingsService
    // Mi forma
    // const urlTheme = localStorage.getItem('theme');
    // if (urlTheme) {
    //   this.linkTheme.setAttribute('href', urlTheme);
    // } else {
    //   this.linkTheme.setAttribute(
    //     'href',
    //     './assets/css/colors/default-dark.css'
    //   );
    // }
  }
}
