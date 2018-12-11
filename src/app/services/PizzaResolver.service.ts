import { PizzaService } from 'src/app/services/pizza.service';
import { Injectable } from '@angular/core';

import { IPizza } from '../models/ipizza';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PizzaResolverService implements Resolve<IPizza[]> {
  
  constructor(private pizzaService : PizzaService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPizza[]> {
    let category = route.params['category'];
    if (category == null) {
      return this.pizzaService.getPizzas();
     
    }
    return this.pizzaService.getPizzaBycategory(category);
  }
 
 
}