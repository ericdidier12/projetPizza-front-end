import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
 
  constructor( private cartService: ShoppingCartService) { }

  ngOnInit() {

   //this.cartService.mergeIt();
   if (localStorage.getItem('token') != null && 
   (JSON.parse(localStorage.getItem('isConnect'))==false || localStorage.getItem('isConnect') === null) ) {
this.cartService.sendCard();
this.cartService.getNewCard();

localStorage.setItem('isConnect', JSON.stringify(true));
}
return this.cartService.isConnected;
 
  }

}
