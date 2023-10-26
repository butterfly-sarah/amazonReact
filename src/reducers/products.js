import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { error } from '../components/Toast';
import Api from '../config/api';

export const fetchProducts=createAsyncThunk(
    "products/fetchProducts",
    async(_,thunkApi)=>{
        try{
            const response=await Api.get("/products")
            return response.data
        }
        catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)

export const fetchCategory=createAsyncThunk(
    "products/fetchCategory",
    async(_,thunkApi)=>{
        try{
            const response=await Api.get("/products/categories")
            return response.data
        }
        catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)
export const fetchProduct=createAsyncThunk(
    "products/fetchProduct",
    async(id,thunkApi)=>{
        try{
            const response=await Api.get("/products/"+id)
            return response.data
        }
        catch(error){
            return thunkApi.rejectWithValue(error.message)
        }
    }
)
export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    all:[],
    categories:[],
    product:{}
  },
  reducers: {
    
  },
  extraReducers:(builer)=>{
    builer.addCase(fetchProducts.fulfilled,(state,action)=>{
        state.all=action.payload
    })
    builer.addCase(fetchCategory.fulfilled,(state,action)=>{
        state.categories=action.payload
    })
    builer.addCase(fetchProduct.fulfilled,(state,action)=>{
        state.product=action.payload
    })
  }
})

// Action creators are generated for each case reducer function
export const {} = productsSlice.actions

export default productsSlice.reducer