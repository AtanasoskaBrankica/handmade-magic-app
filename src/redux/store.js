import {configureStore, combineReducers} from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import productReducer from './slice/productSlice';
import filterReducer from './slice/filterSlice';
const reducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  filter: filterReducer,
});

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
