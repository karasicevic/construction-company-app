import { ItemOfDispatchNote } from "./item-of-dispatch-note.model";
import { Supplier } from "./supplier.model";

export class DispatchNote {
    constructor(
        public number: number,
        public shippingMethod: string,
        public date: Date,
        public supplier: Supplier,
        public purchaseOrder: number,
        public items: ItemOfDispatchNote[]
    ){}
} 
