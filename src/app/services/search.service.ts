import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import {
  DocByTermResponse,
  HospByTermResponse,
  searchByTermResponse,
  UserByTermResponse,
} from '../interfaces/repsonse-interface';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { 'x-token': this.token } };
  }

  tranformInUsers(users: User[]) {
    return users.map(
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
  }

  searchByTerm(
    term: string = '',
    type: 'users' | 'hospitals' | 'doctors'
  ): Observable<HospByTermResponse | User[]> {
    const url = `${base_url}/search/collection/${type}/${term}`;
    return this.http
      .get<UserByTermResponse | HospByTermResponse | DocByTermResponse>(
        url,
        this.headers
      )
      .pipe(
        map((resp) => {
          if (type === 'users') {
            return this.tranformInUsers(resp.results as User[]);
          } else if (type === 'hospitals') {
            return resp;
          } else if (type === 'doctors') {
            return resp;
          }
        })
      );
  }

  searchByTermProfe(
    term: string = '',
    type: 'users' | 'hospitals' | 'doctors'
  ) {
    const url = `${base_url}/search/collection/${type}/${term}`;
    return this.http.get<searchByTermResponse>(url, this.headers).pipe(
      map((resp) => {
        resp.results;
      })
    );
  }
}
