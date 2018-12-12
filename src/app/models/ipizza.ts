import { IIngredient } from "./IIngredient";
import { ICategory } from "./ICategory";

export interface IPizza {
    id: number; // long 
    name: string; // ok
    price: number; // float
    month_promo: boolean; // ok
    fixed: boolean;
    isfavorite: boolean;

    number: number;
    category: ICategory;
    ingredients: IIngredient[];

}

