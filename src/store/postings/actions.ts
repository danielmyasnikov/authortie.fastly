import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const client = localStorage.getItem('client');
const accessToken = localStorage.getItem('access-token');
const uid = localStorage.getItem('uid');

const headers = { client, uid, ['access-token']: accessToken };

export const getPostings = createAsyncThunk<any, number>(
  'postings/getPostings',
  async (page) => {
    const res = await axios({
      method: 'GET',
      url: `https://authortie-app.herokuapp.com/api/v1/postings?view_type=lenta&page=${page}`,
      headers,
    });
    return res.data;
  },
);
