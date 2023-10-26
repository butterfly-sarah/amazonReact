import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { error } from '../components/Toast';
import Api from '../config/api';


export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    orders:[],
  },
  reducers: {
    addOrder:(state,action)=>{
        let data=action.payload
        state.orders.push(data)
    }
  },
})

// Action creators are generated for each case reducer function
export const {addOrder} = productsSlice.actions

export default productsSlice.reducer