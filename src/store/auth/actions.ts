import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as T from './types';

export interface AuthErrors {
  emailError: string;
  passwordError: string;
  passwordConfirmationError?: string;
  fullMessagesError?: string;
}

export const getRegistration = createAsyncThunk<object, T.Auth, { rejectValue: AuthErrors }>(
  'auth/REGISTRATION',
  async ({ email, password, passwordConfirmation }, { rejectWithValue }) => {
    try {
      const res = await axios.post('https://authortie-app.herokuapp.com/auth', {
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      const client = res.headers.client;
      const accessToken = res.headers['access-token'];
      const uid = res.headers.uid;

      localStorage.setItem('uid', uid);
      localStorage.setItem('access-token', accessToken);
      localStorage.setItem('client', client);
      localStorage.setItem('expiry', res.headers.expiry);

      const headers = { client, uid, 'access-token': accessToken };
      return headers;
    } catch (err: any) {
      const emailError: string = err.response.data.errors.email;
      const passwordError: string = err.response.data.errors.password || '';
      const passwordConfirmationError = err.response.data.errors.password_confirmation || '';
      const fullMessagesError = err.response.data.errors.full_messages || '';
      return rejectWithValue({
        emailError,
        passwordError,
        passwordConfirmationError,
        fullMessagesError,
      });
    }
  },
);

export const getSignIn = createAsyncThunk<undefined, T.Auth, { rejectValue: string }>(
  'auth/SIGN_IN',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post('https://authortie-app.herokuapp.com/auth/sign_in', {
        email,
        password,
      });
      localStorage.setItem('uid', res.headers.uid);
      localStorage.setItem('access-token', res.headers['access-token']);
      localStorage.setItem('client', res.headers.client);
      localStorage.setItem('expiry', res.headers.expiry);
      return undefined;
    } catch (err) {
      const errorMassege = 'Не верные данные при авторизации ';
      return rejectWithValue(errorMassege);
    }
  },
);
