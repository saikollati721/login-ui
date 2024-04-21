import { Base } from "./base.model";
import { Deserializable } from "./deserializable";
import { object, serializable, deserialize } from "serializr";
import { Sort } from "./sort";

export class Pageable extends Base implements Deserializable{
    @serializable(object(Sort))
    public sort: Sort | undefined;
    @serializable
    public offset: number=0;
    @serializable
    public pageNumber: number=0;
    @serializable
    public pageSize: number=0;
    @serializable
    public paged: boolean=false;

    deserialize(input: any): this {
        return Object.assign(this, deserialize(Pageable, input));
    }
}