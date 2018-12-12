import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Ipanier } from 'src/app/models/ipanier';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor( private cartService: ShoppingCartService) { }

  cart:Ipanier[] =[];
  totalPrice:number;

  
  addQuantity(index:number){
   this.cart[index].quantity=this.cart[index].quantity+1;
   this.cartService.setCart(this.cart);
   if (localStorage.getItem('token') != null){
     this.cartService.addOneOrderLineInDB( this.cart[index]);
   }

  }

  removeQuantity(index:number){
    if(this.cart[index].quantity!=1){
    this.cart[index].quantity= this.cart[index].quantity-1;
    this.cartService.setCart(this.cart);
    if (localStorage.getItem('token') != null){
      this.cartService.deleteOrderLineInDB( this.cart[index]);
    }
    }
   }

   removePizza(index:number){
   
    
    if (localStorage.getItem('token') != null){
      this.cartService.removeOrderLineInDB( this.cart[index]);
    } 
    this.cart.splice(index,1);
    this.cartService.setCart(this.cart);
   }

   calculTotalPrice():number{
     this.totalPrice = 0 ;
     this.cart.forEach(element => this.totalPrice+=element.pizza.price*element.quantity);
     return this.totalPrice;
   }

   click(){
    alert('Commande payer')
   }

  ngOnInit() {
    
    this.cartService.cart.subscribe(
      resp => {
        this.cart = resp;
        this.calculTotalPrice();
      },
      erreur => console.log('ATTENTION Il y a l\'erreur : ' + erreur));
  }

   
}
