import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import * as T from './types';
import * as actions from './actions';

const initialState: T.State = {
  isAuth: false,
  registrationTab: false,
  headers: {},
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getAuth: (state) => {
      state.isAuth = true;
    },
    getLogout: (state) => {
      state.isAuth = false;
    },
    setRegistrationTab: (state, { payload }: PayloadAction<boolean>) => {
      state.registrationTab = payload;
    },
    setHeaders: (state, { payload }: PayloadAction<object>) => {
      state.headers = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(actions.getSignIn.fulfilled, (state) => {
        state.isAuth = true;
      })
      .addCase(actions.getRegistration.fulfilled, (state, { payload }) => {
        state.headers = payload;
        state.isAuth = true;
      });
  },
});
