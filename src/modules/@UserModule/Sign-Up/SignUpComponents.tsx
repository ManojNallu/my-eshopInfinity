import React from 'react'
import { Alert, Button, Spinner } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import './sign-Up.css';
import { UserRegisterObj, registerUserAction } from '../../userReducer';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useNavigate } from 'react-router-dom';



const SignUpComponents = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const actiondispatcher: any = useAppDispatch();

    const {
        isRegistrationInProgress,
        errorMessage,
        successMessage,
        isUserRegistered
    } = useAppSelector(state => state.userData);


    const onSubmit = (data: any) => {
        console.log(data);
        const userData: UserRegisterObj = {
            userName: `${data.firstName} ${data.lastName}`,
            email: data.email,
            password: data.password,
        }
        actiondispatcher(registerUserAction(userData));
    }

    console.log(useAppSelector(state => state.userData));
   


    if(isUserRegistered){
        navigate('/sign-In');
    }

    return (
        <div className='signInform'>
            <h2 className="heading">Sign-Up</h2>

            
            {
                errorMessage !== "" &&
                (<Alert variant="danger" dismissible>
                    {errorMessage}
                </Alert>)
            }

         

            
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row" style={{ width: "100vw" }}>
                    <div className="col-md-4 mb-2">
                        <label>First Name</label>
                        <input type="text" className="form-control" placeholder="Enter first name" {...register("firstName", { required: "First name is required" })} />
                        {errors?.firstName && errors?.firstName?.type === 'required' && (
                            <div className="error">{errors?.firstName?.message?.toString()}</div>)}
                    </div>
                    <div className="col-md-4 mb-2">
                        <label>Last Name</label>
                        <input type="text" className="form-control" placeholder="Enter last name" {...register("lastName", { required: "Last name is required" })}></input>
                        {errors?.lastName && errors?.lastName?.type === 'required' && (
                            <div className="error">{errors?.lastName?.message?.toString()}</div>)}
                    </div>
                    <div className="col-md-4 mb-2">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Enter email" {...register("email", {
                            required: "email  is required",
                            pattern:
                                //here again in pattern we are taking another object.
                                { value: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, message: "Invalid email" }

                        })}></input>
                        {errors?.email && (
                            <div className="error">{errors?.email?.message?.toString()}</div>)}
                    </div>
                    <div className="col-md-4 mb-2">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter Password"
                            {...register("password", {
                                required: "Password is required",
                                validate: {
                                    checkForMinLength: (value: string) => value.length >= 6,
                                    checkForMaxLength: (value: string) => value.length <= 15
                                }
                            })}></input>
                        {errors?.password && errors?.password?.type === "required" && (
                            <div className="error">{errors?.password?.message?.toString()}</div>)}

                        {errors?.password && errors?.password?.type === "checkForMinLength" && (
                            <div className="error">password must be greater than 6 letters</div>)}

                        {errors?.password && errors?.password?.type === "checkForMaxLength" && (
                            <div className="error">Password must be less than 15 letters</div>)}
                    </div>
                </div>
                <div className="form-row mt-2">
                    <Button type="submit">
                        {
                            isRegistrationInProgress ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    <span>Registering</span>
                                </>) : "Register"
                        }
                    </Button>
                </div>
            </form >
        </div>
    )
}

export default SignUpComponents;

