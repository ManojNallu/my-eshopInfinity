import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getProductsAction = createAsyncThunk(
    'products/getProducts',
    async (category: string | undefined, { rejectWithValue }) => {

        try {
            const API_URL = `http://localhost:4000/api/v1/products/getProducts?search={"category": "${category}"}`;
            const response = await axios.get(API_URL);

            return {
                type: category,
                data: response.data,
            }

        } catch (err: any) {
            let errorMessage = "Unable to Retrive Products";

            return rejectWithValue({
                message: errorMessage
            })
        }
    }
)

export const getProductDetails = createAsyncThunk(
    'products/getProductById',
    async (productId: string, { rejectWithValue }) => {
        try {
            const API_URL = `http://localhost:4000/api/v1/products/getProducts?search={"_id": "${productId}"}`;
            const response = await axios.get(API_URL);
            return response.data;
        } catch {
            let errorMessage = 'Unable to Retrive Products';

            return rejectWithValue({
                message: errorMessage
            })
        }
    }
)

