import { configureStore } from '@reduxjs/toolkit'
import user from '../reducers/user'
import products from '../reducers/products'
import order from '../reducers/order'
export default configureStore({
  reducer: {
    user,products,order
  }
})