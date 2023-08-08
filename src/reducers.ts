import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./modules/userReducer";// userReducer is the name given to the reducer which is returned by userSlice
import productsReducer from "./modules/@ProductModule/productsSlice"


const appReducers = combineReducers({
    userData : userReducer,
    productsData : productsReducer,
})

export default appReducers;