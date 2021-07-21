import { createSlice } from '@reduxjs/toolkit';
// import * as T from './types';
import * as actions from './actions';

const initialState = {
  post: {},
};

export const detailedApplicationSlice = createSlice({
  name: 'detailedApplication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getDetailedApplication.fulfilled, (state, { payload }) => {
      state.post = payload;
    });
  },
});
