import { City } from "./city.model";
import { Street } from "./street.model";
import { Number } from "./number.model";

export class Supplier {
    constructor(
    public taxId: string,
    public name: string,
    public currentAccount: string,
    public phoneNumber: string,
    public city: City=new City(12345, "city"),
    public street: Street=new Street(city, 123,"sdfasdf"),
    public number: Number=new Number(city, street, 1)
    ){}
  }