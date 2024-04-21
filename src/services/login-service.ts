import { LoginRequest } from "shared/models/login.model";
import api from "../api/instance";

const API_BASE_URL = "/login";

const login = (loginRequest: LoginRequest) =>
  api
    .post(API_BASE_URL, loginRequest.serialize())
    .then((res) => {console.log("Login Successed...!"); return res;})
    .catch((err) => new Promise((_, reject) => reject(err)));


const LoginService = {
    login
};
    
export default LoginService;
