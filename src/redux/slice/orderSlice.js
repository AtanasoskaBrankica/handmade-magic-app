import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  totalOrdersAmount: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    STORE_ORDERS(state, action) {
      state.orders = action.payload;
    },
    CALCULATE_TOTAL_ORDERS_AMOUNT(state, action) {
      const array = [];
      state.orders.map(item => {
        const {orderAmount} = item;

        return array.push(orderAmount);
      });
      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalOrdersAmount = totalAmount;
    },
  },
});

export const {STORE_ORDERS, CALCULATE_TOTAL_ORDERS_AMOUNT} = orderSlice.actions;
export const selectOrders = state => state.orders.orders;
export const selectTotalOrdersAmount = state => state.orders.totalOrdersAmount;
export default orderSlice.reducer;
