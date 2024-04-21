import { deserialize, serializable } from "serializr";
import { Base } from "./common/base.model";
import { Deserializable } from "./common/deserializable";

export class LoginRequest extends Base implements Deserializable { 

    @serializable
    public userName: string;

    @serializable
    public password: string;

    deserialize(input: any): this {
        return Object.assign(this, deserialize(LoginRequest, input));
    }
}