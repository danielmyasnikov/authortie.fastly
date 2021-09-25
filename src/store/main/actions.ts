import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPostingsMain = createAsyncThunk('main/getPostings', async () => {
  const res = await axios({
    method: 'GET',
    url: 'https://authortie-app.herokuapp.com/api/v1/postings?view_type=landings',
  });
  res.data.length = 4;
  return res.data;
});
