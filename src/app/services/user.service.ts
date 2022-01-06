import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

import {
  LoginForm,
  ProfileForm,
  RegisterForm,
} from '../interfaces/forms.interface';
import { getUsersResponse } from '../interfaces/repsonse-interface';
import { User } from '../models/user.model';

const base_url = environment.base_url;
declare const gapi;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public auth2: any;
  public user: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get headers() {
    return { headers: { 'x-token': this.token } };
  }

  googleInit() {
    return new Promise<void>((resolve) => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id:
            '648897323833-nv1k25tc4vm8u39br4qtpt0ca9ma48v6.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  validateToken(): Observable<boolean> {
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: { 'x-token': this.token },
      })
      .pipe(
        map((resp: any) => {
          const { name, email, img, google, role, uid } = resp.user;
          this.user = new User(name, email, '', img, google, role, uid);
          // this.user.printInfo();
          localStorage.setItem('token', this.token);
          return true;
        }),
        catchError((err) => {
          // console.log(err);
          return of(false);
        })
      );
  }
  // TODO: Crear y aplicar interfaces para las respuestas de las peticiones
  login(formData: LoginForm) {
    try {
      return this.http.post(`${base_url}/login`, formData).pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token);
        })
      );
    } finally {
    }
  }

  loginGoogle(token) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  logOut() {
    localStorage.removeItem('token');

    this.auth2.signOut().then(() => {
      // Redireccionar al login
      this.ngZone.run(() => this.router.navigate(['/login']));
    });
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  // updateUser(formData: {name:string,email:string})
  updateUser(formData: ProfileForm) {
    formData = { ...formData, role: this.user.role };
    return this.http.put(
      `${base_url}/users/${this.uid}`,
      formData,
      this.headers
    );
  }

  changeUserRole(user: User) {
    // console.log(user);

    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers);
  }

  getUsers(from: number = 0) {
    const url = `${base_url}/users?from=${from}`;
    return this.http.get<getUsersResponse>(url, this.headers).pipe(
      map((resp) => {
        resp.users = resp.users.map(
          (user) =>
            new User(
              user.name,
              user.email,
              '',
              user.img,
              user.google,
              user.role,
              user.uid
            )
        );
        return resp;
      })
    );
  }

  deleteUser(user: User) {
    const url = `${base_url}/users/${user.uid}`;
    return this.http.delete(url, this.headers);
  }
}
