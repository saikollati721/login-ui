import { serializable, deserialize } from "serializr";
import { Deserializable } from "./deserializable";

export class Sort implements Deserializable{
    @serializable
    public sorted: boolean = false;

    deserialize(input: any): this {
        return Object.assign(this, deserialize(Sort, input))
    }
}