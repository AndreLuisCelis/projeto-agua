import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router:Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') as string));
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/','login'])
  }

  getToken(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    return currentUser.token
  }

  getCurrentUser(){
    return JSON.parse(localStorage.getItem('currentUser') as string);
  }
}
