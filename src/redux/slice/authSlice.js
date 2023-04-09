import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  email: null,
  userName: null,
  userId: null,
};

//TO SET ACTIVE USER AND TO REMOVE ACTIVE USER
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.userId = action.payload.userId;
    },
    REMOVE_ACTIVE_USER: state => {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userId = null;
    },
  },
});

export const {SET_ACTIVE_USER, REMOVE_ACTIVE_USER} = authSlice.actions;
export const selectUserEmail = state => state.auth.email;
export const selectUserId = state => state.auth.userId;
export default authSlice.reducer;
