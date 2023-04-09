import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    STORE_ORDERS(state, action) {
      state.orders = action.payload;
    },
  },
});

export const {STORE_ORDERS} = orderSlice.actions;
export const selectOrders = state => state.orders.orders;

export default orderSlice.reducer;
