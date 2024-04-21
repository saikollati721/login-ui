import { PageObject } from "./page.object";
import { Pageable } from "./pageable";


export declare const Type: FunctionConstructor;

export declare interface Type<T> extends Function{
    new (...args: any[]): T;

}

export class Page<T extends PageObject>{
    public content: T[];
    public totalElements: number=0;
    public totalPages: number=0;
    public pageable: Pageable;
    public numberOfElements?: number;
    public first: boolean;
    public last: boolean;
    public empty: boolean;

    deserialize(input: any, classRef: Type<PageObject>): this{
        Object.assign(this, input);
        this.content = input.content.map((data: any) => new classRef().deserialize(data));
        this.pageable = new Pageable().deserialize(input.pageable);
        return this;
    }

}