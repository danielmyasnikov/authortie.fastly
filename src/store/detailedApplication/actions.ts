import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDetailedApplication = createAsyncThunk('main/getPostings', async (id: string) => {
  const res = await axios({
    method: 'GET',
    url: `https://authortie-app.herokuapp.com/api/v1/postings/${id}`,
  });
  return res.data;
});
