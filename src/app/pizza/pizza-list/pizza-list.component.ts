import { IIngredient } from './../../models/IIngredient';
import { Component, OnInit } from '@angular/core';
import { IPizza } from 'src/app/models/ipizza';
import { PizzaService } from 'src/app/services/pizza.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { Ipanier } from 'src/app/models/ipanier';


@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {
  
  cart: Ipanier[] ;
  listPizza: IPizza[];
  listIngredient: IIngredient[];

  constructor(private _service: PizzaService, private cartService: ShoppingCartService) { }


  addToCart(pizza: IPizza) {

    if (!this.cart) {
      const cart:Ipanier[] = [{ 'pizza': pizza, 'quantity': 1 }];
      this.cartService.setCart(cart);
    }
    else {
      let found = false;
      let index;

      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].pizza.name === pizza.name) {
          index = i;
          found = true;
        }
      }

      if (found == true) {
        this.cart[index].quantity=this.cart[index].quantity+1;
      } else {
        this.cart.push({ 'pizza': pizza, 'quantity': 1 });
      }
      this.cartService.setCart(this.cart);

    }
  }

  ngOnInit() {
    this._service.getPizzas().subscribe(
      resp => this.listPizza = resp,
      erreur => console.log('ATTENTION Il y a l\'erreur : ' + erreur));

      this.cartService.cart.subscribe(
        resp => this.cart = resp,
        erreur => console.log('ATTENTION Il y a l\'erreur : ' + erreur));
  }

}
