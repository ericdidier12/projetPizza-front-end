import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { FormsModule } from '@angular/forms';
import { PizzaResolverService } from '../services/PizzaResolver.service';
import { AuthService } from '../services/auth.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CheckboxModule } from 'primeng/checkbox';




const appRoutes : Routes = [
  {path: 'pizza', component: PizzaListComponent,
        resolve: {pizzas: PizzaResolverService}},
  {path: 'pizza/:category', component: PizzaListComponent,
                             resolve: {pizzas: PizzaResolverService}},
  { path: 'shoppingCart', component: ShoppingCartComponent},
  ];

@NgModule({
  declarations: [
    PizzaListComponent,
    ShoppingCartComponent,
  ],
  imports: [
    RouterModule.forChild(appRoutes),
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    CheckboxModule

  ],

  providers: [
    PizzaResolverService,
    AuthService
  ]
})
export class PizzaModule { }
