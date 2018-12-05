import { IPizza } from 'src/app/models/ipizza';

export interface IIngredient {
    id: number,
    name: string,
    recipe_qunatity: number ,
    stock_quantity: number ,
    unit_price: number,
    numberIngredient: number ,
    pizzas: IPizza
}
