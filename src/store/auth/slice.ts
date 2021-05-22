import { createSlice } from '@reduxjs/toolkit'
import * as T from './types'
import * as actions from './actions'

const initialState: T.Auth = {
    email: "",
    password: "",
    passwordConfirmation: ""
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    // extraReducers: (builder) => {
    //     builder
    //       .addCase(, (state, action) => {
    //         // action is inferred correctly here if using TS
    //       })
    //     },
})
