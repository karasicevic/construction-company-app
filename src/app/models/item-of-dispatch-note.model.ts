import { DispatchNote } from "./dispatch-note.model"
import { Item } from "./item.model";

export class ItemOfDispatchNote {
    constructor(
        public dispatchNote: DispatchNote,
        public number: number,
        public note: string,
        public quantity: number,
        public item: Item,
        public purchaseOrder: number,
        public itemOfPurchaseOrder: number
        ){}
}
