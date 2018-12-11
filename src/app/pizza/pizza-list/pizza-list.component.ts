import { AuthService } from './../../services/auth.service';
import { Ipanier } from './../../models/ipanier';
import { ICategory } from './../../models/ICategory';
import { IIngredient } from './../../models/IIngredient';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IPizza } from 'src/app/models/ipizza';
import { PizzaService } from 'src/app/services/pizza.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit, OnDestroy {

  isEventByCategorie: boolean = false;
  listCategories: ICategory[];
  cart: Ipanier[];
  listPizza: IPizza[];
  listIngredient: IIngredient[];
  filteredPizzas: IPizza[];
  connecterUser: User = null;
  colorChangeEtoile: string;
  isconnected: boolean = false;

  pizzaSubscription: Subscription;


//constructor
  constructor(private _service: PizzaService, private authService: AuthService, 
              private cartService: ShoppingCartService,
               private _route: ActivatedRoute) {
    this._route.data.subscribe(data => {
      this.filteredPizzas = data['pizzas'];
    });
  }

//ngOnInit
  ngOnInit() {

    this._route.data.subscribe(
      data => {
        this.listPizza = data['pizzas'];
      }
    );
   
    /*this.pizzaSubscription = this._service.getPizzas().subscribe(
      resp => this.listPizza = resp,
      erreur => console.log('ATTENTION Il y a l\'erreur : ' + erreur));
     this._service.emitPizzaSubject();  
     */


    this._service.getCategories().subscribe(
      resp => this.listCategories = resp
    );
    this.cartService.cart.subscribe(
      resp => this.cart = resp,
      erreur => console.log('ATTENTION Il y a l\'erreur : ' + erreur));
   
    this.authService.connectedUser.subscribe(
      user => {
      this.connecterUser = user,
        this.isconnected = true;
        console.log(" class PizzaListComponent affiche connecterUser : " + JSON.stringify(this.connecterUser));
      },
      err => this.connecterUser = null
    );


  }

/**
 * add to cart Pizza
 * 
 * @param pizza 
 */
  addToCart(pizza: IPizza) {

    if (!this.cart) {
      const cart: Ipanier[] = [{ 'pizza': pizza, 'quantity': 1 }];
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
        this.cart[index].quantity = this.cart[index].quantity + 1;
      } else {
        this.cart.push({ 'pizza': pizza, 'quantity': 1 });
      }
      this.cartService.setCart(this.cart);

    }
  }


  onselectItemCategory() {
    this.isEventByCategorie = true;
    if (this.isEventByCategorie) {
      this.listPizza = this.filteredPizzas;
      
    }

  }

  getColors() {
    return 'style="font-size:24px;color:red';
  }
  getColor() {
    return this.getColors();
  }



}
