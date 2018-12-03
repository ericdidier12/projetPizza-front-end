import {EventEmitter, Injectable} from '@angular/core';
import {User} from "../models/user";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public connectedUser: EventEmitter<User> = new EventEmitter<User>();

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<HttpResponse<Object>> {
    return this.http.post('/api/login', user, {observe: 'response'}).pipe(
      tap(res => {
          const token = res.headers.get('Authorization').substr(7);
          localStorage.setItem('token', token);
          this.whoAmI();
        },
        err => {
          this.connectedUser.emit(null);
        })
    );
  }

  /**
   * qui suis-je ?
   */
  public whoAmI(): void {
    if (localStorage.getItem('token') != null){
      console.log("=> whoAmI() => affiche le token que le cote-server" + localStorage.getItem('token'));
      this.http.get<User>('/api/user/whoami').subscribe(
        user => {
          this.connectedUser.emit(user);
        },
        err => {
          console.log("Tu n'existe pas ")
          this.connectedUser.emit(null);
        }
      );
    }
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.connectedUser.emit(null);
  }
}
