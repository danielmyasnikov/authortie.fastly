import { createAsyncThunk } from '@reduxjs/toolkit'
import * as T from './types'
import axios from 'axios'

export const getRegistration = createAsyncThunk<
  undefined,
  T.Auth,
  { rejectValue: { errorMessage: string } }
>(
  'auth',
  async ({ email,
    password,
    passwordConfirmation }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`https://authortie-app.herokuapp.com/auth`, {
        email,
        password,
        password_confirmation: passwordConfirmation
      })
      return undefined
    } catch (error) {
      console.log(error);
    }

  }
)