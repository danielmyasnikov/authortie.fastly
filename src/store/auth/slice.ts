import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import * as T from './types';
import * as actions from './actions';

const initialState: T.State = {
  isAuth: false,
  registrationTab: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getAuth: (state) => {
      state.isAuth = true;
    },
    setRegistrationTab: (state, { payload }: PayloadAction<boolean>) => {
      state.registrationTab = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actions.getSignIn.fulfilled, (state) => {
        state.isAuth = true;
      })
      .addCase(actions.getRegistration.fulfilled, (state) => {
        state.isAuth = true;
      });
  },
});
