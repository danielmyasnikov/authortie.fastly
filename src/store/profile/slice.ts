import { createSlice } from '@reduxjs/toolkit';
// import * as T from './types';
import * as actions from './actions';

const initialState = {
  profile: {},
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getProfile.fulfilled, (state, { payload }) => {
      Object.assign(state.profile, payload);
    });
  },
});
