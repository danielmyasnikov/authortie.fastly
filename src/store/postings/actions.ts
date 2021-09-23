import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'store/types';
import { getHeaders } from 'store/auth/selectors';

export const getPostings = createAsyncThunk<
  any,
  { page: number; workType?: string; knowledgeArea?: string },
  { state: RootState }
>('postings/getPostings', async ({ page, workType, knowledgeArea }, { getState }) => {
  const headers = getHeaders(getState());
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
