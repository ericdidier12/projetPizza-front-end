import { ICategory } from './../../models/ICategory';
import { IIngredient } from './../../models/IIngredient';
import { Component, OnInit } from '@angular/core';
import { IPizza } from 'src/app/models/ipizza';
import { PizzaService } from 'src/app/services/pizza.service';
import { FormsModule }   from '@angular/forms';


@Component({
  selector: 'app-pizza-list',
  templateUrl: './pizza-list.component.html',
  styleUrls: ['./pizza-list.component.css']
})
export class PizzaListComponent implements OnInit {
  listPizza: IPizza[];
  indexCategorie: string = '';
  listIngredient : IIngredient [];
  listCategories: ICategory [];

  
  constructor(private _service:PizzaService ) { }

  ngOnInit() {
    this._service.getPizzas().subscribe(
      resp => this.listPizza = resp,
      erreur => console.log('ATTENTION Il y a l\'erreur : ' + erreur));

      this._service.getCategories().subscribe(
        resp => this.listCategories = resp
      );
  }

      selectItemCategory(event :any){
      this.indexCategorie = event.target.value;
      console.log(this.indexCategorie);

     
  }



}
