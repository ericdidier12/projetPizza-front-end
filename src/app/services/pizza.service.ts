import { ICategory } from './../models/ICategory';
import { IIngredient } from './../models/IIngredient';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IPizza } from '../models/ipizza';

@Injectable({
  providedIn: 'root'
})

export class PizzaService {

  URL = 'http://localhost:8080/api/pizzas';
  
  /**
   * <br> 
   * <p>  Objet pizzasSubject va nous permettre de stocker les recherches
   *       successives de des pizzas dans un tableau de chaîne de caractères,
   *      sous la forme d'un Observable 
   * </p>
   * </br>
   */
   pizzasSubject = new Subject<any[]>();
   private  pizza = [];
   
  constructor(private _Http: HttpClient) { }
  
  getPizzas(): Observable<IPizza[]> {
    return this._Http.get<IPizza[]>(this.URL);
  }

  getPizzasByCategory(nameCategory: any): Observable<IPizza[]> {
    return this._Http.get<IPizza[]>('/api/trieCategorieByName' + '/' + nameCategory);
  }

  public getIngredients(): Observable<IIngredient[]> {
    return this._Http.get<IIngredient[]>('/api/pizzas/ingredients');
  }

  public getCategories(): Observable<ICategory[]> {
    return this._Http.get<ICategory[]>('/api/pizzas/categories');
  }

  emitPizzaSubject() {
    this.pizzasSubject.next(this.pizza.slice());
  }


  
}
