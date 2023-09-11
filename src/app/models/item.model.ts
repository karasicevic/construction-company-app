import { MeasureUnit } from "./measure-unit.model";

export class Item {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public VATrate: number,
        public measureUnit: MeasureUnit
    ){}
}
