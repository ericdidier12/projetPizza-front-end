import { Injectable } from '@angular/core';
import { Ipanier } from '../models/ipanier';
import { Observable, BehaviorSubject} from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IPizza } from '../models/ipizza';


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

  removeOrderLineInDB(entry:Ipanier){
    this.http.post<any>('http://localhost:8080/api/card/remove',entry).subscribe(
      res => console.log('inside postmehtod of sub.function', res),//only objects
      (error:HttpErrorResponse)=>console.log(error.error));
  }

  addOneOrderLineInDB(entry:Ipanier){
    this.http.post<any>('http://localhost:8080/api/card/addOne',entry).subscribe(
      res => console.log('inside postmehtod of sub.function', res),//only objects
      (error:HttpErrorResponse)=>console.log(error.error)); 
  }

  deleteOrderLineInDB(entry:Ipanier){
    this.http.post<any>('http://localhost:8080/api/card/deleteOne',entry).subscribe(
      res => console.log('inside postmehtod of sub.function', res),//only objects
      (error:HttpErrorResponse)=>console.log(error.error));
  }

  sendCard() {
 
     this.http.post<any>('http://localhost:8080/api/card/getCard',JSON.parse(localStorage.getItem('pizzaCart'))).subscribe(
      newPanier => this.setCart(newPanier),//only objects
      (error:HttpErrorResponse)=>console.log(error.error));
    }

    
  getQuantity():number{
    let quantity:number=0;
    let newC:Ipanier[]=JSON.parse(localStorage.getItem('pizzaCart')) 
    for (let i = 0; i <newC.length; i++) {
      quantity=quantity+newC[i].quantity;
    }
    return quantity;
  }

}
