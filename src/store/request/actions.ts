import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const client = localStorage.getItem('client');
const accessToken = localStorage.getItem('access-token');
const uid = localStorage.getItem('uid');

const headers = { client, uid, ['access-token']: accessToken };

export const getLastPostings = createAsyncThunk('createPost/getLastPosting', async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: `https://authortie-app.herokuapp.com/api/v1/postings?view_type=mine`,
      headers,
    });
    return res.data;
  } catch (err) {
    return;
  }
});

export const createPostings = createAsyncThunk<undefined, any>(
  'createPost/createPostings',
  async (data) => {
    try {
      await axios({
        method: 'POST',
        url: `https://authortie-app.herokuapp.com/api/v1/postings`,
        headers,
        data,
      });
      return undefined;
    } catch (err) {
      return;
    }
  },
);

export const createPostingsApp = createAsyncThunk<undefined, any>(
  'createPost/createPostings',
  async (data) => {
    try {
      await axios({
        method: 'POST',
        url: `https://authortie-app.herokuapp.com/api/v1/postings/create_list`,
        headers,
        data: {
          postings: data,
        },
      });
      return undefined;
    } catch (err) {
      return;
    }
  },
);

export const editPostings = createAsyncThunk<undefined, any, any>(
  'createPost/editPostings',
  async ({ data, id }) => {
    try {
      await axios({
        method: 'PATCH',
        url: `https://authortie-app.herokuapp.com/api/v1/postings/${id}`,
        headers,
        data,
      });
      return undefined;
    } catch (err) {
      return;
    }
  },
);
