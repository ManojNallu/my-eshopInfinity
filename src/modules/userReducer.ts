import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
    successMessage: string;
    errorMessage: string;
    isRegistrationInProgress: boolean;
    isLoginInProgress: boolean;
    isUserRegistered: boolean;
    isUserLoggedIn: boolean;
    userName: string;
    userId:string;
    cartId: string;
    token: string;
}

const userInitialState: User = {
    isLoginInProgress: false,
    successMessage: "",
    errorMessage: "",
    isRegistrationInProgress: false,
    isUserRegistered: false,
    isUserLoggedIn: false,
    userName: '',
    userId:'',
    cartId: '',
    token:'',
}

export interface LoginData {
    email : string,
    password : string,
}



export interface UserRegisterObj {
    userName: string;
    email: string;
    password: string;
}


/* this is the action 
createAsyncThunk is used to create asyn actions.
this will accept two parameters
    a.actionName (slice Name + action name);
    b.async function
*/
export const registerUserAction = createAsyncThunk(
    'user/registerUser',
    async (userData: UserRegisterObj, { rejectWithValue }) => {
        try {
            const API_URL = 'http://localhost:4000/api/v1/users/register';
            const response: any = await axios.post(API_URL, userData);
            return response.data;
        } catch (err: any) {
            let errorMessage = 'Unable to resister the User. plaese try again';
            if (err?.response?.data?.message) {
                errorMessage = err?.response?.data?.message;
            }
            return rejectWithValue({
                message: errorMessage
            })
        }
    }
);

export const loginUserRegister = createAsyncThunk(
    'user/loginUser',
    async(loginData:LoginData,{ rejectWithValue}) =>{
        try{
            const API_URL = 'http://localhost:4000/api/v1/users/login';
            const response:any = await axios.post(API_URL,loginData);
            return response.data;
        }catch(err : any){
            let errorMessage = "Unable to login.Please try again";

            if(err?.response?.data?.meassage){
                errorMessage = err?.response?.data?.message;
            }

            return rejectWithValue({
                message:errorMessage
            })
        }

    }
);


const userSlice = createSlice({
    name: "user",
    initialState: userInitialState,
    reducers: {},
    extraReducers: (build: any) => {
        build
            .addCase(registerUserAction.pending, (state: any, action: any) => {
                state.isRegistrationInProgress = true;
               

            })

            .addCase(registerUserAction.fulfilled, (state: any, action: any) => {
                state.isUserRegistered = true;
                state.isRegistrationInProgress = false;
                state.successMessage = action?.payload?.message
               
            })

            .addCase(registerUserAction.rejected, (state: any, action: any) => {
                state.isUserRegistered = false;
                state.isRegistrationInProgress = false;
                state.errorMessage = action?.payload?.message
            })

            .addCase(loginUserRegister.pending,(state:any,action:any) =>{
                state.isLoginInProgress = true;
            })

            .addCase(loginUserRegister.fulfilled, (state:any,action:any) =>{
                state.isUserLoggedIn = true;
                state.isLoginInProgress = false;
                const userId = action?.payload?.userId;
                const token = action?.payload?.token
                const userName = action?.payload?.userName
                const cartId = action?.payload?.cartId

                sessionStorage.setItem('userId',userId);
                sessionStorage.setItem('token',token);
                sessionStorage.setItem('userName',userName);
                sessionStorage.setItem("cartId",cartId);

            })

            .addCase(loginUserRegister.rejected, (state:any,action:any) =>{
                state.isUserLoggedIn = false;
                state.isLoginInProgress = false;
                state.errorMessage = action?.payload?.message;
            })

         

    }

});

/*
this createslice function returns one object contains reducers and action
{
    reducers : {},
    action : {},
}

{ reducer , actions } this is  object destructuring

*/
const { reducer, actions } = userSlice;

//here we exporetd reducer deafultly so in reducer.ts  we can give any name so we have given useReducer in the reducer.ts 
export default reducer;

function Async(userData: any, UserRegisterObj: any, arg2: { rejectWithValue: any; }): import("@reduxjs/toolkit").AsyncThunkPayloadCreator<unknown, void, { state?: unknown; dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined; extra?: unknown; rejectValue?: unknown; serializedErrorType?: unknown; pendingMeta?: unknown; fulfilledMeta?: unknown; rejectedMeta?: unknown; }> {
    throw new Error("Function not implemented.");
}
