import { createAsyncThunk } from '@reduxjs/toolkit';
import * as T from './types';
import axios from 'axios';

export const getRegistration = createAsyncThunk<undefined, T.Auth, { rejectValue: string }>(
  'auth/REGISTRATION',
  async ({ email, password, passwordConfirmation }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`https://authortie-app.herokuapp.com/auth`, {
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      localStorage.setItem('uid', res.headers.uid);
      localStorage.setItem('access-token', res.headers['access-token']);
      localStorage.setItem('client', res.headers.client);
      return undefined;
    } catch (err) {
      const errorMassege = 'Не верные данные при авторизации ';
      return rejectWithValue(errorMassege);
    }
  },
);

export const getSignIn = createAsyncThunk<undefined, T.Auth, { rejectValue: string }>(
  'auth/SIGN_IN',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`https://authortie-app.herokuapp.com//auth/sign_in`, {
        email,
        password,
      });
      localStorage.setItem('uid', res.headers.uid);
      localStorage.setItem('access-token', res.headers['access-token']);
      localStorage.setItem('client', res.headers.client);
      return undefined;
    } catch (err) {
      const errorMassege = 'Не верные данные при авторизации ';
      return rejectWithValue(errorMassege);
    }
  },
);
