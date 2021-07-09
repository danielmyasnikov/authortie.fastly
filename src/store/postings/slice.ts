import { createSlice } from '@reduxjs/toolkit';
// import * as T from './types';
import * as actions from './actions';

const initialState = {
  postings: [],
  isLoadNecessary: true,
};

export const postings = createSlice({
  name: 'postings',
  initialState,
  reducers: {
    cleanPostings: (state) => {
      state.postings = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getPostings.fulfilled, (state, { payload }) => {
      state.postings = state.postings.concat(payload);
      state.isLoadNecessary = payload.length > 0;
    });
  },
});
