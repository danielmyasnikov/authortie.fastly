import { createSlice } from '@reduxjs/toolkit';
import * as T from './types';
import * as actions from './actions';

const initialState: T.State = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getAuth: (state) => {
      state.isAuth = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actions.getSignIn.fulfilled, (state, action) => {
        state.isAuth = true;
      })
      .addCase(actions.getRegistration.fulfilled, (state, action) => {
        state.isAuth = true;
      });
  },
});
