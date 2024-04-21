import { deserialize, serializable } from "serializr";
import { Base } from "./common/base.model";
import { Deserializable } from "./common/deserializable";

export class User extends Base implements Deserializable {

  @serializable
  public firstName: string;
  @serializable
  public lastName: string;
  @serializable
  public userName: string;
  @serializable
  public phoneNumber: string;
  @serializable
  public password: string;
  @serializable
  public email: string;

  deserialize(input: any): this {
    return Object.assign(this, deserialize(User, input));
  }

  get name() {
    return `${this.firstName} ${this.lastName}`;
  }

  get invitedBy() {
    if (this.firstName == null && this.lastName == null) {
      return this.userName;
    }
    return this.name;
  }
}
