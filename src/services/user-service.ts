import { Page } from "../shared/models/common/page";
import api from "../api/instance";
import { User } from "../shared/models/user.model";

const API_BASE_URL = "/user";

const show = (): Promise<User> =>
  api
    .get(API_BASE_URL)
    .then((res) => new User().deserialize(res))
    .catch((err) => new Promise((_, reject) => reject(err)));
  
const findAll = (  
  query?: string,
  sort?: string,
  size?: number,
  page?: number,) => 
  api
    .get(API_BASE_URL + "/list", {
      query,
      sort,
      size,
      page
    })
    .then((res: any) => { return new Page<User>().deserialize(res, User); })
    .catch((err) => new Promise((_, reject) => reject(err)));

const update = (id: number | undefined | string, user: User) =>
  api
    .put(API_BASE_URL + "/" + id, user.serialize())
    .then((res) => new User().deserialize(res))
    .catch((err) => new Promise((_, reject) => reject(err)));


const create = (user: User) =>
  api
    .post(API_BASE_URL, user.serialize())
    .then((res) => new User().deserialize(res))
    .catch((err) => new Promise((_, reject) => reject(err)));

const uploadAvatar = (id: number | string | undefined, formData: FormData) =>
  api
    .put(
      API_BASE_URL + "/" + id + "/avatar",
      formData,
      undefined,
      "multipart/form-data"
    )
    .then((res) => console.log(res))
    .catch((err) => new Promise((_, reject) => reject(err)));

  const remove = (): Promise<null | void> =>
    api
      .get("/logout")
      .then((res) => console.log(res))
      .catch((err) => new Promise((_, reject) => reject(err)));

const UserService = {
  show,
  create,
  update,
  uploadAvatar,
  remove,
  findAll
};

export default UserService;
