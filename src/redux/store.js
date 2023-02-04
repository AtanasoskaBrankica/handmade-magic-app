import {configureStore, combineReducers} from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import productReducer from './slice/productSlice';
const reducer = combineReducers({
  auth: authReducer,
  product: productReducer,
});

const store = configureStore({
  reducer,
});

export default store;
