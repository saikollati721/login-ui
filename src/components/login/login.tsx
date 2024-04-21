import { Button, Card, TextInput } from "flowbite-react";
import { useState, useEffect, useContext } from "react";
import HeaderNav from "../common/header.tsx";
import LoginService from "../../services/login-service.ts";
import { LoginRequest } from "../../shared/models/login.model.ts";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../contexts/session-context.ts";
import { toastify } from "../../components/common/toast/toast.tsx";
import { CustomLabel } from "../../components/common/label.tsx";
import * as yup from "yup";
import { Resolver, useForm } from "react-hook-form";
import { User } from "../../shared/models/user.model.ts";
import { yupResolver } from "@hookform/resolvers/yup";

type UserForm = {
  userName: string;
  password: string;
};

function LoginComponent() {
  const [loginRequest, setLoginRequest] = useState<LoginRequest>();
  const [isFormValid, setIsFormValid] = useState(false);

  const auth = useContext(SessionContext);
  const navigate = useNavigate();

  const schema = yup
    .object()
    .shape({
      userName: yup
        .string()
        .label("User Name")
        .required("User name must be required"),
      password: yup.string().required("Password must be required"),
    })
    .required();

  useEffect(() => {
    if (auth.user) {
      navigate(`/ui/`);
    }
    const loginRequest = new LoginRequest();
    setLoginRequest(loginRequest);
  }, []);

  const submit = (data: UserForm) => {
    console.log("submitted", data);
    const user = new User();
    user.userName = data.userName;
    user.password = data.password;

    LoginService.login(user).then(
      (res) => {
        toastify("Login Successfull..!", { type: "success" });
        auth.refreshSession(() => {
          console.log("session created");
          navigate("/");
        });
      },
      (error) => {
        console.log("Login Failure " + error);
        toastify("Your username or password is invalid.", { type: "error" });
      }
    );
  };

  const resolver = yupResolver(schema) as Resolver<UserForm>;

  const {
    setValue,
    getValues,
    watch,
    reset,
    formState: { isDirty, errors },
    handleSubmit,
  } = useForm<UserForm>({
    resolver: resolver,
  });

  const formData = watch();

  const setFormValue = (fieldId: any, fieldValue: any) => {
    setValue(fieldId, fieldValue.target.value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    schema.isValid(formData).then((valid) => {
      setIsFormValid(valid);
    });
  }, [formData]);

  return (
    <div>
      <HeaderNav />
      <div className="flex justify-center mt-[64px] p-4">
        <Card className="flex w-100 max-w-sm w-full">
          <form
            className="flex w-100 flex-col gap-4 bg-white  border-b border-gray-200"
            onSubmit={handleSubmit(submit)}
          >
            <div>
              <div className="mb-2 block">
                <CustomLabel
                  htmlFor="userName"
                  value="User Name"
                  required={true}
                />
              </div>
              <TextInput
                id="userName"
                type="text"
                value={watch("userName")}
                onChange={(value) => setFormValue("userName", value)}
                helperText={
                  <>
                    {errors?.userName ? (
                      <span className="font-medium text-red-600">
                        {" "}
                        {errors?.userName?.message}{" "}
                      </span>
                    ) : (
                      <></>
                    )}
                  </>
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <CustomLabel
                  htmlFor="password"
                  value="Password"
                  required={true}
                />
              </div>
              <TextInput
                id="password"
                type="password"
                value={watch("password")}
                onChange={(value) => setFormValue("password", value)}
                helperText={
                  <>
                    {errors?.password ? (
                      <span className="font-medium text-red-600">
                        {" "}
                        {errors?.password?.message}{" "}
                      </span>
                    ) : (
                      <></>
                    )}
                  </>
                }
              />
            </div>

            <button type="submit" disabled={!isFormValid} className={isFormValid ? 'bg-blue-700 rounded-lg' : 'bg-gray-300 rounded-lg'}>Submit</button>

            {/* <Button type="submit" disabled={!isFormValid}>
              Submit
            </Button> */}
          </form>
        </Card>
      </div>
    </div>
  );
}

export default LoginComponent;
