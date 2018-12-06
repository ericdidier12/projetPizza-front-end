import { Injectable } from '@angular/core';
import { Ipanier } from '../models/ipanier';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  
  private _cart: BehaviorSubject<Ipanier[]> = new BehaviorSubject(JSON.parse(localStorage.getItem('pizzaCart'))|| [] );
  public readonly cart: Observable<Ipanier[]> = this._cart.asObservable();
  constructor() { }

  setCart(cart:Ipanier[]){
    localStorage.setItem('pizzaCart', JSON.stringify(cart));
    this._cart.next(cart);
  }




}
