import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store/types';
import axios from 'axios';
import { getHeaders } from 'store/auth/selectors';

export const getLastPostings = createAsyncThunk<any[], string | undefined, { state: RootState }>(
  'createPost/getLastPosting',
  async (id, { getState }) => {
    try {
      const headers = getHeaders(getState());
      const url = id
        ? `https://authortie-app.herokuapp.com/api/v1/postings/${id}`
        : 'https://authortie-app.herokuapp.com/api/v1/postings?view_type=mine';
      const res = await axios({
        method: 'GET',
        url,
        headers,
      });
      return res.data;
    } catch (err) {}
  },
);

export const createPostingsApp = createAsyncThunk<
  undefined,
  any,
  { rejectValue: string; state: RootState }
>('createPost/createPostingsApp', async (data, { rejectWithValue, getState }) => {
  try {
    const headers = getHeaders(getState());
    await axios({
      method: 'POST',
      url: 'https://authortie-app.herokuapp.com/api/v1/postings/create_list',
      headers,
      data: {
        postings: data,
      },
    });
    return undefined;
  } catch (err) {
    return rejectWithValue('error');
  }
});

export const editPostings = createAsyncThunk<
  undefined,
  any,
  { rejectValue: string; state: RootState }
>('createPost/editPostings', async ({ data, id }, { rejectWithValue, getState }) => {
  try {
    const headers = getHeaders(getState());
    await axios({
      method: 'PATCH',
      url: `https://authortie-app.herokuapp.com/api/v1/postings/${id}`,
      headers,
      data,
    });
    return undefined;
  } catch (err) {
    return rejectWithValue('error');
  }
});
