import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { RouterModule, Routes } from '@angular/router';



const appRoutes : Routes = [
  { path: 'pizzas', component: PizzaListComponent},
  ];

@NgModule({
  declarations: [
    PizzaListComponent
  ],
  imports: [
    RouterModule.forChild(appRoutes),
    CommonModule,
  ],
})
export class PizzaModule { }
