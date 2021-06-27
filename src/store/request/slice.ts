import { createSlice } from '@reduxjs/toolkit';
// import * as T from './types';
import * as actions from './actions';

const initialState = {
  lastPostings: [],
};

export const createPost = createSlice({
  name: 'createPost',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getLastPostings.fulfilled, (state, { payload }) => {
      state.lastPostings = payload;
    });
  },
});
