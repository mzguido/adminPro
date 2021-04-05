import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

// Este import genera un error desde el la actualizacion de mi PC
// import { resolve } from 'node:dns';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [],
})
export class PromisesComponent implements OnInit {
  //

  constructor() {}

  ngOnInit(): void {
    this.getUsers().then((users) => {
      console.log(users);
    });
  }

  getUsers() {
    // fetch('https://reqres.in/api/users').then((resp) => {
    //   resp.json().then((body) => console.log(body));
    // });

    return new Promise((resolve) => {
      fetch('https://reqres.in/api/users')
        .then((resp) => resp.json())
        .then((body) => resolve(body.data));
    });
  }
}
