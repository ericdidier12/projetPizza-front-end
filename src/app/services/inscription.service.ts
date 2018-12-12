import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  constructor(private http: HttpClient) { }

  attemptSignup(username: string, password: string, name: string, email: string, adress: string, date: string): Observable<any> {
    const userinfo = {username: username, password: password, name: name, email: email, adress: adress};
    console.log('attempt signup');
    return this.http.post<any>('http://localhost:8080/api/signup', userinfo);
    }




}
