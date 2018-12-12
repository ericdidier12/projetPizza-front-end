export interface IPizza {
    id: number;
    name: string;
    price: number;
    month_promo: boolean;
    cat_id: number;
    fixed: boolean;
    isfavorite: boolean;

    category: {
        id: number,
        name: string,
        pizzas: any
    }

    ingredients: [
        {
            id: number,
            name: string,
            recipe_qunatity: number,
            stock_quantity: number,
            unit_price: number,
            numberIngredient: number,
            pizzas: IPizza
        }
    ]
}
