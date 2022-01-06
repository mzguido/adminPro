import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import {
  DocByTermResponse,
  HospByTermResponse,
  UserByTermResponse,
} from 'src/app/interfaces/repsonse-interface';
import { User } from 'src/app/models/user.model';

import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  totalUsers = 0;
  page = 0;
  isLoading = false;
  imgSubs: Subscription;

  constructor(
    private searchService: SearchService,
    private userService: UserService,
    private modalService: ModalImageService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.getUsers();
    this.imgSubs = this.modalService.newImg
      .pipe(delay(200))
      .subscribe((img) => this.getUsers());
  }

  // TODO: Refactorizar
  get totalPages() {
    return Math.ceil(this.totalUsers / 5);
  }

  changePage(value: number) {
    this.page += value;
    if (this.page < 0) {
      this.page = 0;
      return;
    } else if (this.page * 5 >= this.totalUsers) {
      this.page -= value;
      return;
    }
    this.getUsers();
  }

  getUsers() {
    this.isLoading = true;
    this.userService.getUsers(this.page * 5).subscribe(({ total, users }) => {
      // console.log(resp);
      this.users = users;
      this.totalUsers = total;
      this.isLoading = false;
    });
  }

  getUserByName(name) {
    if (name == '') {
      this.getUsers();
      return;
    }

    this.isLoading = true;
    this.searchService.searchByTerm(name, 'users').subscribe((resp: User[]) => {
      // console.log(resp);
      this.users = resp;
      this.totalUsers = this.users.length;
      this.isLoading = false;
    });
  }

  deleteUser(user: User) {
    if (user.uid === this.userService.uid) {
      return Swal.fire('Error', 'No puede borrar su propio usuario', 'error');
    }
    console.log(user);
    Swal.fire({
      title: 'Eliminar Usuario',
      text: `Desea eliminar al usuario ${user.name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user).subscribe((resp) => {
          this.getUsers();
          Swal.fire(
            'Eliminado!',
            '${user.name} fue eliminado de los usuarios.',
            'success'
          );
        });
      }
    });
  }

  editUser(user: User) {}

  changeRole(user: User) {
    // console.log(user);
    this.userService.changeUserRole(user).subscribe((resp) => {});
  }

  openModal(user: User) {
    this.modalService.openModal('users', user.uid, user.img);
  }

  // Mi implementacion vieja con 2 funciones
  // nextPage() {
  //   if ((this.page + 1) * 5 > this.totalUsers) return;
  //   this.page++;
  //   console.log(this.page);
  //   this.getUsers(this.page * 5);
  // }
  // prevPage() {
  //   if (this.page == 0) return;
  //   this.page--;
  //   this.getUsers(this.page * 5);
  // }

  // Implementacion del profesor, el tenia una prop de la clase llamada this.from
  // changePage(value: number) {
  //   this.from = value;
  //   if (this.from < 0) {
  //     this.form= 0
  //   } else if (this.from > this.totalUsers) {
  //     this.from -= value
  //   }
  // }
}
