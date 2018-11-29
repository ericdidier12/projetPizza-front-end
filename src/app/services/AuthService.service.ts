import { EventEmitter,Injectable } from '@angular/core';
import {User} from "../models/user";
import {HttpClient} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public connectedUser: EventEmitter<User> = new EventEmitter<User>();

  constructor(private http: HttpClient) { }
  /**
   * Permet de verifier la soumission de notre login et le compare a l'authentification de notre token.
   * 
   * @param user  objet de type user
   */
  public login(user: User): void {
    this.http.post('/api/login', user, {observe: 'response'}).subscribe(
         res => {
        const token = res.headers.get('Authorization').substr(7);
        localStorage.setItem('token', token);
        this.whoAmI();
      },
      err => {
        this.connectedUser.emit(null);
      }
    );
  }
  
  public whoAmI(): void {

    if (localStorage.getItem('token') != null) {
      this.http.get<User>('/api/user/whoami').subscribe(
        user => this.connectedUser.emit(user),
        err => this.connectedUser.emit(null)
      );
    } else {
      this.connectedUser.emit(null);
    }
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.connectedUser.emit(null);
  }

}
