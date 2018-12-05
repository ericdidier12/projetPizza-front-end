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
  public
  constructor(private http: HttpClient) { }

  public login(user: User): Observable<HttpResponse<Object>> {
    return this.http.post('/api/login', user, {observe: 'response'}).pipe(
      tap(res => {
          const token = res.headers.get('Authorization').substr(7);
          localStorage.setItem('token', token);
        //  this.whoAmI();
        },
        err => {
          this.connectedUser.emit(null);
        })
    );
  }



 
  public logins(user: User): Observable<HttpResponse<Object>> {
    return this.http.post('/api/login', user, {observe: 'response'}).pipe(
      tap(res => {
          const token = res.headers.get('Authorization').substr(7);
        //  localStorage.setItem('token', token);
        this.save(token);
        this.whoAmITest();
        },
        err => {
          this.connectedUser.emit(null);
          this.connectedUser.emit(user);

        })
    );
  }

  public save(jwtToken){
    localStorage.setItem('token', jwtToken);
  }

  public getwhoAmI(){
   
  }

  /**
   * qui suis-je ?
   */
  public whoAmI(): void {
    if (localStorage.getItem('token') != null){
      console.log("=> whoAmI() => Affiche le token du localStorage => " + localStorage.getItem('token'));
      this.http.get<User>('/api/user/whoami').subscribe(
        user => {
          console.log(user);
          //this.connectedUser.emit(user);
        },
        err => {
          console.log("Tu n'existe pas ")
          this.connectedUser.emit(null);
        }
      );
    }
  }

  public whoAmITest(): Observable<User> {
    if (localStorage.getItem('token') != null){
      console.log("=> whoAmI() => Affiche le token du localStorage => " + localStorage.getItem('token'));
      return this.http.get<User>('/api/user/whoami');
    }
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.connectedUser.emit(null);
  }
}
