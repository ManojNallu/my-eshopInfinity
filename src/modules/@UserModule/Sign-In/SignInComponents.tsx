import React, { useEffect } from 'react'
import './signin.css';
import { useForm } from 'react-hook-form';
import { Alert, Button } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { loginUserRegister } from '../../userReducer';
import { Link, useNavigate } from 'react-router-dom';

const SignInComponents = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const actionDispatcher = useAppDispatch();

  const { isUserLoggedIn, errorMessage } = useAppSelector(state => state.userData);

  const tokenId = sessionStorage.getItem("token");


  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    actionDispatcher(loginUserRegister(data));
  }

  if (isUserLoggedIn) {
    navigate('/');
  }

  useEffect(() => {
    if (tokenId ) {
      navigate('/')
    }
  }, []);



  return (
    <div className='signUpform'>
      <h2>Sign-In</h2>

      {
        errorMessage ? (
          (<Alert variant="danger" dismissible>
            {errorMessage}
          </Alert>)
        ) : ""
      }
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row" style={{ width: "100vw" }}>
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
          <div>No Account? Please Register here : <Link to ='sign-Up'>Sign Up</Link> </div>
        </div>
    
        <div className="form-row mt-2">
          <Button type="submit">Sign-In</Button>
        </div>
      </form >
    </div>
  )
}

export default SignInComponents
