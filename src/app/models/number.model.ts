import { City } from "./city.model";
import { Street } from "./street.model";

export class Number {
    constructor(
        public city: City,
        public street: Street,
        public number: number
        ){}
}
