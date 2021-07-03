import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const client = localStorage.getItem('client');
const accessToken = localStorage.getItem('access-token');
const uid = localStorage.getItem('uid');

const headers = { client, uid, ['access-token']: accessToken };

export const getPostings = createAsyncThunk<
  any,
  { page: number; workType?: string; knowledgeArea?: string },
  any
>('postings/getPostings', async ({ page, workType, knowledgeArea }) => {
  let filter = '';
  if (workType && !knowledgeArea) {
    filter = `&work_type=${workType}`;
  }
  if (!workType && knowledgeArea) {
    filter = `&knowledge_area=${knowledgeArea}`;
  }
  if (workType && knowledgeArea) {
    filter = `&work_type=${workType}&knowledge_area=${knowledgeArea}`;
  }

  const res = await axios({
    method: 'GET',
    url: !!filter
      ? `https://authortie-app.herokuapp.com/api/v1/postings?view_type=lenta&page=${page}${filter}`
      : `https://authortie-app.herokuapp.com/api/v1/postings?view_type=lenta&page=${page}`,
    headers,
  });
  return res.data;
});

