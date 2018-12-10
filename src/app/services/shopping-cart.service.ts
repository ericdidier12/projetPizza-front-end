import { Injectable } from '@angular/core';
import { Ipanier } from '../models/ipanier';
import { Observable, BehaviorSubject, merge, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http: HttpClient) { }

  private _cart: BehaviorSubject<Ipanier[]> = new BehaviorSubject(JSON.parse(localStorage.getItem('pizzaCart')) || []);
  public readonly cart: Observable<Ipanier[]> = this._cart.asObservable();

 
 private _isConnected: BehaviorSubject<Boolean> = new BehaviorSubject(JSON.parse(localStorage.getItem('isConnect')));
 public isConnected: Observable<Boolean>=this._isConnected.asObservable();
  

  setCart(cart: Ipanier[]) {
    localStorage.setItem('pizzaCart', JSON.stringify(cart));
    this._cart.next(cart);
  }



  sendCard():Observable<any> {
    const yo:string ="yo"
    console.log(yo);
    return this.http.post<any>('http://localhost:8080/api/card/getCard', JSON.parse(localStorage.getItem('pizzaCart'))) ;    
    }

  getNewCard() {
    this.http.get<Ipanier[]>('http://localhost:8080/api/card/mergeCard')
      .subscribe(newPanier => localStorage.setItem('pizzaCart', JSON.stringify(newPanier))
      );
    }



    mergeIt():Observable<Boolean>{
      if (localStorage.getItem('token') != null && 
              (JSON.parse(localStorage.getItem('isConnect'))==false || localStorage.getItem('isConnect') === null) ) {
        this.sendCard();
       // this.getNewCard();
                
        localStorage.setItem('isConnect', JSON.stringify(true));
    }
    return this.isConnected;
  }



}
