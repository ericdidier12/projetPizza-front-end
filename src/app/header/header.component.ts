import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Ipanier } from '../models/ipanier';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 public connecterUser:User = null;
 cart:Ipanier[];
 indice:number;

  constructor(private authService : AuthService, private cartService:ShoppingCartService) { }

  ngOnInit() {
    this.authService.connectedUser.subscribe(
      user=> { this.connecterUser = user, 
       console.log(" class HeaderComponent affiche connecterUser : " + JSON.stringify (this.connecterUser) ) ;
      },
      err=>this.connecterUser = null
    );

    this.cartService.cart.subscribe(
      resp => {this.cart = resp; this.indice=this.cart.length},
      erreur => console.log('ATTENTION Il y a l\'erreur : ' + erreur));
  }
  
  logout():void{
    this.authService.logout();
  }
}
