import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';



const appRoutes : Routes = [
  { path: 'pizzas', component: PizzaListComponent}, 
  { path: 'shoppingCart', component: ShoppingCartComponent},

  ];

@NgModule({
  declarations: [
    PizzaListComponent,
    ShoppingCartComponent
  ],
  imports: [
    RouterModule.forChild(appRoutes),
    CommonModule,
  ],
})
export class PizzaModule { }
