import { ICategory } from './../models/ICategory';
import { IIngredient } from './../models/IIngredient';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { IPizza } from '../models/ipizza';
import {catchError, tap} from 'rxjs/operators';
import { User } from '../models/user';

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
   pizzasSubject = new Subject<IPizza[]>();
   
   private  pizza: IPizza[] = [];

  constructor(private _Http: HttpClient) { }
  
  getPizzas(): Observable<IPizza[]> {
    return  this._Http.get<IPizza[]>(this.URL);
  }

  getPizzasByCategory(nameCategory: any): Observable<IPizza[]> {
    return this._Http.get<IPizza[]>('/api/pizzas/trieCategorieByName' + '/' + nameCategory);
  }

  getPizzaBycategory(category: string): Observable<IPizza[]> {
    return this._Http.get<IPizza[]>('/api/pizzas/trieCategorieByName' + '/' + category)
      .pipe(catchError(this.handleError));
  }


  public getIngredients(): Observable<IIngredient[]> {
    return this._Http.get<IIngredient[]>('/api/pizzas/ingredients')
    .pipe(catchError(this.handleError));
  }

  public getCategories(): Observable<ICategory[]> {
    return this._Http.get<ICategory[]>('/api/pizzas/categories')
    .pipe(catchError(this.handleError));
  }

  addPizzaFavorie(id: any): Observable<User> {
    return this._Http.get<User>(`/api/user/addPizzafavorie/${id}`)
    .pipe(catchError(this.handleError));
  }

  deletePizzaFavorie(id: any): Observable<User> {
    return this._Http.get<User>(`/api/user/deletePizzafavorie/${id}`)
    .pipe(catchError(this.handleError));
  }

  getAllIngredients() :Observable<IIngredient[]> {
    return this._Http.get<IIngredient[]>("api/pizzas/ingredients")
    .pipe(catchError(this.handleError));
  }

  getPizzaCustom(selectedValues) :Observable<IPizza> {
    return this._Http.post<IPizza>("api/pizzas/buildPizzaCustom",selectedValues)
    .pipe(catchError(this.handleError));
  }
  private handleError(err: HttpErrorResponse) {

    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }


  
}
