import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import User from '../classes/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly ENDPOINT: string = 'https://62a460e6259aba8e10e7498e.mockapi.io/api/v1/users';

  constructor(private readonly http: HttpClient, readonly router: Router) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.ENDPOINT);
  }

  getUser(nameUser: string): Observable<User[]> {
    return this.http
      .get<User[]>(this.ENDPOINT)
      .pipe(
        map((utenti) => utenti.filter(utente => utente.username === nameUser))
      )
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.ENDPOINT, user);
  }

  createUser(form: any, id: string): User {
    let newUser = new User(
      form.username,
      form.email,
      form.password,
      id
    );
    return newUser;
  }

  login(username: string): boolean {
    localStorage.setItem('username', username);
    return true;
  }

  logout(): void {
    localStorage.removeItem('username');
    this.router.navigate(['/auth/login'])
  }

  isLogged(): boolean {
    return localStorage.getItem('username') !== null;
  }

}



