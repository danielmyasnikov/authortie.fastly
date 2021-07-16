import { createSlice } from '@reduxjs/toolkit';
// import * as T from './types';
import * as actions from './actions';

const initialState = {
  postings: [],
};

export const postingsMain = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getPostingsMain.fulfilled, (state, { payload }) => {
      state.postings = payload;
    });
  },
});
