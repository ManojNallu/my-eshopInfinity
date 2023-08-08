import { configureStore } from "@reduxjs/toolkit";
import appReducers from "./reducers";


const appStore = configureStore({
    reducer: appReducers,
})

export default appStore;



/*
*
    storte : {
                UserData{
                    isUserRegistered : false;
                    isUserLoggedIn  : false;
                    userName : string;
                    cartId : string;
                }




                productsData{}
                CartsData{}
            }




*
**/