import { identifier, serializable, serialize } from "serializr";


export abstract class Base{

    @serializable(identifier())
    public id: number;

    public serialize(): JSON{
        return serialize(this);
    }
}