import { CustomLabel } from "components/common/label";
import { Button, Card, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { User } from "shared/models/user.model";
import * as yup from 'yup';
import { Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import UserService from "services/user-service";
import { toastify } from "components/common/toast/toast";
import HeaderNav from "../common/header.tsx";
import { useNavigate } from "react-router-dom";



type UserForm = {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export const UserAdditionForm = () => {

    const [isFormValid, setIsFormValid] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
    
      }, []); 

    const schema = yup.object().shape({
        userName: yup.string().label("User Name")
            .required("User name must be required")
            .min(4, "User name must have minimum 4 characters"),
        firstName: yup.string()
            .required("First name must be required")
            .min(4, "First name must have minimum 4 characters"),
        lastName: yup.string()
            .required("Last name must be required")
            .min(4, "Last name must have minimum 4 characters"),
        email: yup.string()
            .required("Last name must be required")
            .min(4, "Last name must have minimum 4 characters"),
        phoneNumber: yup.string()
            .required("Phone Number must be required")
            .min(4, "Phone Number must have minimum 4 characters"),
        password: yup.string()
            .when('$isEdit', (isEdit, schema) => {
                return (isEdit[0] || isEdit[0] == undefined) ? schema.nullable() : schema.required("Password must be required").min(4, "Password must have minimum 4 characters")
            })
    })
    .required();

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
          defaultValues: {
              userName: "",
              firstName: "",
              lastName: "",
              phoneNumber: "",
              email: "",
              password: "",
          },
      });

    const submit = (data: UserForm) => {
        console.log("submitted", data);
        const user = new User();
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.email = data.email;
        user.userName = data.userName;
        user.phoneNumber = data.phoneNumber;
        
        user.password = data.password;
        createUser(user);
        
    };

    const createUser = (user: User) => {
        UserService.create(user).then(
            (res) => {
              toastify("User Added Successfully..!", { type: "success" });
              navigate("/login");
            },
            (error) => {
              toastify("User Addition Failure..!", { type: "error" });
            }
        )
    }


    const formData = watch();

    const context = {
        isEdit: isEdit
    };

    useEffect(() => {
        schema.isValid(formData, { context }).then(valid => {
            setIsFormValid(valid);
        });
    }, [formData]);


    const setFormValue = (fieldId: any, fieldValue: any) => {
        setValue(fieldId, fieldValue.target.value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
    };

    return (
        <>
        <div>
      <HeaderNav />
      <div className="flex justify-center mt-[64px] p-4">
            <Card className="flex w-[300px]">
                <form
                    className="flex w-full flex-col gap-4 bg-white  border-b border-gray-200"
                    onSubmit={handleSubmit(submit)}>
                        <div>
                            <div className="mb-2 block">
                                <CustomLabel htmlFor="userName" value="User Name" required={true}/>
                            </div>
                            <TextInput
                                id="userName"
                                type="text"
                                value={watch('userName')}
                                onChange={(value) => setFormValue('userName', value)}
                                helperText={
                                    <>
                                      { 
                                        errors?.userName ? 
                                            <span className="font-medium text-red-600"> {errors?.userName?.message} </span>
                                            : <></>
                                      }
                                    </>
                                }
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <CustomLabel htmlFor="firstName" value="First Name" required={true}/>
                            </div>
                            <TextInput
                                id="firstName"
                                type="text"
                                value={watch('firstName')}
                                onChange={(value) => setFormValue('firstName', value)}
                                helperText={
                                    <>
                                      { 
                                        errors?.firstName ? 
                                            <span className="font-medium text-red-600"> {errors?.firstName?.message} </span>
                                            : <></>
                                      }
                                    </>
                                }
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <CustomLabel htmlFor="lastName" value="Last Name" required={true}/>
                            </div>
                            <TextInput
                                id="lastName"
                                type="text"
                                value={watch('lastName')}
                                onChange={(value) => setFormValue('lastName', value)}
                                helperText={
                                    <>
                                      { 
                                        errors?.lastName ? 
                                            <span className="font-medium text-red-600"> {errors?.lastName?.message} </span>
                                            : <></>
                                      }
                                    </>
                                }
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <CustomLabel htmlFor="email" value="Email" required={true}/>
                            </div>
                            <TextInput
                                id="email"
                                type="text"
                                value={watch('email')}
                                onChange={(value) => setFormValue('email', value)}
                                helperText={
                                    <>
                                      { 
                                        errors?.lastName ? 
                                            <span className="font-medium text-red-600"> {errors?.lastName?.message} </span>
                                            : <></>
                                      }
                                    </>
                                }
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <CustomLabel htmlFor="phoneNumber" value="Phone Number" required={true}/>
                            </div>
                            <TextInput
                                id="phoneNumber"
                                type="text"
                                value={watch('phoneNumber')}
                                onChange={(value) => setFormValue('phoneNumber', value)}
                                helperText={
                                    <>
                                      { 
                                        errors?.phoneNumber ? 
                                            <span className="font-medium text-red-600"> {errors?.phoneNumber?.message} </span>
                                            : <></>
                                      }
                                    </>
                                }
                            />
                        </div>
                        { !isEdit && 
                            <div>
                                <div className="mb-2 block">
                                    <CustomLabel htmlFor="password" value="Password" required={true}/>
                                </div>
                                <TextInput
                                    id="password"
                                    type="password"
                                    value={watch('password')}
                                    onChange={(value) => setFormValue('password', value)}
                                    helperText={
                                        <>
                                        { 
                                            errors?.password ? 
                                                <span className="font-medium text-red-600"> {errors?.password?.message} </span>
                                                : <></>
                                        }
                                        </>
                                    }
                                />
                            </div>
                        }
                        <button type="submit" disabled={!isFormValid} className={isFormValid ? 'bg-blue-700 rounded-lg' : 'bg-gray-300 rounded-lg'}>Submit</button>

                        {/* <Button type="submit" >Submit</Button> */}
                </form>
            </Card>
            </div>
            </div>
        </>
    );

}


export default UserAdditionForm;