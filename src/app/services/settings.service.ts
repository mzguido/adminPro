import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  //
  private linkTheme = document.querySelector('#theme');

  constructor() {
    const urlTheme =
      localStorage.getItem('theme') || './assets/css/colors/blue-dark.css';

    this.linkTheme.setAttribute('href', urlTheme);
  }

  changeTheme(theme: string) {
    //

    const url = `./assets/css/colors/${theme}.css`;
    console.log(url);
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const themes = document.querySelectorAll('.selector');
    themes.forEach((elem) => {
      elem.classList.remove('working');

      const btnTheme = elem.getAttribute('data-theme');
      const btnUrlTheme = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme.getAttribute('href');

      if (btnUrlTheme === currentTheme) {
        elem.classList.add('working');
      }
    });
  }
}
