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
export class PizzaListComponent implements OnInit {

  isEventByCategorie: boolean = false;
  listCategories: ICategory[];
  cart: Ipanier[];
  listPizza: IPizza[];
  listIngredient: IIngredient[];
  filteredPizzas: IPizza[];
  connecterUser: User = null;
  colorChangeEtoile: string;
  isconnected: boolean = false;
  currentUser : User ;

  pizzaFavorite: IPizza[];


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


    this._service.getCategories().subscribe(
      resp => this.listCategories = resp
    );
    this.cartService.cart.subscribe(
      resp => this.cart = resp,
      erreur => console.log('ATTENTION Il y a l\'erreur : ' + erreur));

    this.authService.connectedUser.subscribe(
      user => {
        this.connecterUser = user,

          console.log(" class PizzaListComponent affiche connecterUser : " + JSON.stringify(this.connecterUser));
      },
      err => this.connecterUser = null
    );
    
    this.currentUser = this.authService.getUserConnect();
    if(this.currentUser){
      this.pizzaFavorite = this.currentUser.pizzas;
      this.listPizza.forEach(element => {
        element.isfavorite = this.isFavorite(element.id)
      });
    }
    

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


  isFavorite(id) {
    if(this.pizzaFavorite && this.pizzaFavorite.find(p => p.id === id)){
      return true;
    }
    else {
      return false;
    }
  }


  onListPizza(index) {
    
    if(this.listPizza[index].isfavorite) {
      this._service.deletePizzaFavorie(this.listPizza[index].id).subscribe(
        dataUser => {
          this.updateStatusFavory(dataUser, index);
        });
    } else {
      this._service.addPizzaFavorie(this.listPizza[index].id).subscribe(
            dataUser => {
              this.updateStatusFavory(dataUser, index);
            });
    }
    this.listPizza[index].isfavorite = !this.listPizza[index].isfavorite;
    console.log(" id_Pizza " + this.listPizza[index].isfavorite );
  }

  private updateStatusFavory(dataUser: User, index: any) {
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(dataUser));
    this.pizzaFavorite = dataUser.pizzas;
    this.listPizza[index].isfavorite = this.isFavorite(this.listPizza[index].id);
  }
}
