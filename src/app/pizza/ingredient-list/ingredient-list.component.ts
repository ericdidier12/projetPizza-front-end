import { PizzaService } from './../../services/pizza.service';
import { Component, OnInit } from '@angular/core';
import { IIngredient } from 'src/app/models/IIngredient';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit {
  
  listIngredients: IIngredient[];
  constructor(private _service :PizzaService) { }

  ngOnInit() {
       this._service.getIngredients().subscribe(
         data => {
            this.listIngredients = data ;
         },      
       );

  }

  addToCart(p){
    
  }



}
