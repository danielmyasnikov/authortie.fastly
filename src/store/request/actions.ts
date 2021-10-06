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
        ? `https://authortie-app.herokuapp.com/api/v1/profiles/${id}`
        : 'https://authortie-app.herokuapp.com/api/v1/profiles/me';
      const res = await axios({
        method: 'GET',
        url,
        headers,
      });
      return res.data;
    } catch (err) {

    }
  },
);

export const createPostings = createAsyncThunk<undefined, any, { state: RootState }>(
  'createPost/createPostings',
  async (data, { getState }) => {
    try {
      const headers = getHeaders(getState());
      await axios({
        method: 'POST',
        url: 'https://authortie-app.herokuapp.com/api/v1/postings',
        headers,
        data,
      });
      return undefined;
    } catch (err) {

    }
  },
);

export const createPostingsApp = createAsyncThunk<undefined, any, { state: RootState }>(
  'createPost/createPostingsApp',
  async (data, { getState }) => {
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

    }
  },
);

export const editPostings = createAsyncThunk<undefined, any, { state: RootState }>(
  'createPost/editPostings',
  async ({ data, id }, { getState }) => {
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

    }
  },
);
