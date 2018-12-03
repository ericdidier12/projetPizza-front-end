import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPizza } from '../models/ipizza';

@Injectable({
  providedIn: 'root'
})

export class PizzaService {

  URL = 'http://localhost:8080/api/pizzas';

  constructor(private _Http: HttpClient) { }

  getPizzas(): Observable<IPizza[]> {
    return this._Http.get<IPizza[]>(this.URL);
  }
}
