import { City } from "./city.model";

export class Street {
    constructor(
        public city: City,
        public id: number,
        public name: string
    ){}
}
