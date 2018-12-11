import {Authority} from "./authority";
import { IPizza } from "./ipizza";

export class User {

  constructor(public username: string,
              public password: string,
              public authorities: Authority[], 
              public pizzas:IPizza[]) {
  }
}
