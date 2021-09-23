import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as actions from './actions';

const initialState = {
  lastPostings: [] as any[],
  dataArray: [] as any[],
  errorIndex: [] as number[],
  isSubmitData: false,
};

export const createPost = createSlice({
  name: 'createPost',
  initialState,
  reducers: {
    setDataArray: (state, { payload }: PayloadAction<any[]>) => {
      state.dataArray = payload;
    },
    setErrorIndex: (state, { payload }: PayloadAction<any[]>) => {
      state.errorIndex = payload;
    },
    getSubmitData: (state, { payload }: PayloadAction<boolean>) => {
      state.isSubmitData = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actions.getLastPostings.fulfilled, (state, { payload }) => {
      state.lastPostings = payload;
    });
  },
});
