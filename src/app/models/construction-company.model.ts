import { City } from "./city.model";
import { Number } from "./number.model";
import { Street } from "./street.model";

export class ConstructionCompany {
    constructor(
        public taxId: number = 1234567,
        public name: string = "XYZ",
        public idNumber: number=123456789,
        public idNumberCEO: number=11021989025025,
        public nameOfCEO: string="Bojan Popovic",
        public phoneNumber: string="062356569",
        public emali: string="mail@mail.com",
        public city: City=new City(11000,"Beograd"),
        public street: Street=new Street(city, 123,"Rtanjska"),
        public numberOfStreet: Number=new Number(city, street, 5)
    ){}
}
