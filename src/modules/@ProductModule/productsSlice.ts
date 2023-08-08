import { createSlice } from "@reduxjs/toolkit";
import { getProductDetails, getProductsAction } from "./products.actions";


export interface productsSale  {
    productDetailData : any;
    isProductLoading : boolean;
    category: string;
    errorMessage: string,
    isProductsLoading:boolean,
    smartphones:Array<Object>,
    laptops : Array<Object>,
    fashion : Array<Object>,
    skincare : Array<Object>,
    kids : Array<Object>,
    footware : Array<Object>,
}

const productInitialState : productsSale = {
    productDetailData : {},
    isProductLoading : false,
    errorMessage: '',
    isProductsLoading: false,
    smartphones: [],
    laptops: [],
    fashion: [],
    skincare: [],
    kids: [],
    footware: [],
    category:"",
    
}

const productSlice = createSlice({
    name:'products',
    initialState:productInitialState,
    reducers:{},
    extraReducers:(build) =>{
        build
            .addCase(getProductsAction.pending, (state:any,action:any) => {
                state.isProductsLoading = true;
            })

            .addCase(getProductsAction.fulfilled, (state:any,action:any) =>{
                /**
            *   {  
            * the response will be stored in the action.payload 
            * here we are adding type : category to the response.data which is came from API.
            *     action: {
            *          payload : {
            *                        type: '',
            *                        data: [{}, {}, {}]
            *                        }
            *       }
            *   } 
            * 
            */
                const category:string = action.payload.type;
                state.isProductsLoading = false;
                state[category] = action.payload.data;
            })

            .addCase(getProductsAction.rejected,(state:any,action:any) =>{
                state.errorMessage = action.payload.message; 
            })

            .addCase(getProductDetails.pending,(state:any,action:any) =>{
                state.isProductLoading = true;
            })

            .addCase(getProductDetails.fulfilled, (state:any,action : any) =>{
                state.isProductLoading = true;
                state.productDetailData = action.payload[0];

            })

            .addCase(getProductDetails.rejected,(state:any,action:any) =>{
                state.isProductLoading = false;
                state.errorMessage = action.payload.message
                
            })
    }
});

const {reducer,actions} = productSlice;

export default reducer;
