import { createAsyncThunk } from '@reduxjs/toolkit'
import * as T from './types'
import axios from 'axios'

export interface AuthErrors {
  emailError: string;
  passwordError: string;
  passwordConfirmationError?: string;
}

export const getRegistration = createAsyncThunk<
  undefined,
  T.Auth,
  { rejectValue: AuthErrors }
>(
  'auth/REGISTRATION',
  async ({ email,
    password,
    passwordConfirmation }, { rejectWithValue }) => {
    try {
      await axios.post(`https://authortie-app.herokuapp.com/auth`, {
        email,
        password,
        password_confirmation: passwordConfirmation
      })

      return undefined
    } catch (err) {
      const emailError: string = err.response.data.errors.email;
      const passwordError: string = err.response.data.errors.password || ''
      const passwordConfirmationError = err.response.data.errors.password_confirmation || "";
      return rejectWithValue({ emailError, passwordError, passwordConfirmationError });
    }
  }
)



export const getSignIn = createAsyncThunk<
  undefined,
  T.Auth,
  { rejectValue: AuthErrors }
>(
  'auth/SIGN_IN',
  async ({ email,
    password,
  }, { rejectWithValue }) => {
    try {
      await axios.post(`https://authortie-app.herokuapp.com//auth/sign_in`, {
        email,
        password,
      })

      return undefined
    } catch (err) {
      const emailError: string = err.response.data.errors.email;
      const passwordError: string = err.response.data.errors.password || ''
      return rejectWithValue({ emailError, passwordError });
    }
  }
)