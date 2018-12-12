import {EventEmitter, Injectable} from '@angular/core';
import {User} from "../models/user";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/";
import {tap} from "rxjs/operators";
import { ShoppingCartService } from './shopping-cart.service';
import { Ipanier } from '../models/ipanier';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public connectedUser: EventEmitter<User> = new EventEmitter<User>();

  constructor(private http: HttpClient, private cartService:ShoppingCartService) { }

  public logins(user: User): Observable<HttpResponse<Object>> {
    return this.http.post('/api/login', user, {observe: 'response'}).pipe(
      tap(res => {
          const token = res.headers.get('Authorization').substr(7);
          this.saveToken(token);
          this.whoAmITest();
        },
        err => {
          this.connectedUser.emit(null);
        })
    );
  }

  public saveToken(jwtToken){
    localStorage.setItem('token', jwtToken);
  }


  /**
   * qui suis-je ?
   */
  public whoAmITest() {
    if (localStorage.getItem('token') != null){
      console.log("=> whoAmI() => Affiche le token du localStorage => " + localStorage.getItem('token'));
      this.http.get<User>('/api/user/whoami')
               .subscribe(
                user => {
                  console.log( "" + user);
                  this.connectedUser.emit(user);
                  
                },
                err => {
                  console.log(" imposible d'avoir le retour de cette utilisateur  ");
                  this.connectedUser.emit(null);
                });
    }
  }

  
  public logout(): void {
    localStorage.removeItem('token');
    localStorage.setItem('isConnect', JSON.stringify(false));
    this.cartService.setCart([]);
    this.connectedUser.emit(null);
  }
}
