import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from 'store/types';
import { getHeaders } from 'store/auth/selectors';

export const getDetailedApplication = createAsyncThunk<any, string, { state: RootState }>(
  'detailedApplication/getPostings',
  async (id, { getState }) => {
    const headers = getHeaders(getState());
    const res = await axios({
      method: 'GET',
      headers,
      url: `https://authortie-app.herokuapp.com/api/v1/postings/${id}`,
    });
    return res.data;
  },
);

export const submitBids = createAsyncThunk<any, any, { state: RootState }>(
  'detailedApplication/submitBids',
  async ({ requestId, supplyId, agreementType }, { getState }) => {
    const headers = getHeaders(getState());
    const formData = new FormData();
    formData.append('request_posting_id', requestId);
    formData.append('supply_posting_id', supplyId);
    formData.append('agreement_type', String(agreementType));

    const data = {
      request_posting_id: requestId,
      supply_posting_id: supplyId,
      agreement_type: agreementType,
    };

    await axios({
      method: 'POST',
      url: 'https://authortie-app.herokuapp.com/api/v1/bids',
      headers,
      data,
    });

    return undefined;
  },
);

export const submitBidsUp = createAsyncThunk<any, any, { state: RootState }>(
  'detailedApplication/submitBidsUp',
  async ({ requestId, supplyId, agreementType }, { getState }) => {
    const headers = getHeaders(getState());
    const formData = new FormData();
    formData.append('request_posting_id', requestId);
    formData.append('supply_posting_id', supplyId);
    formData.append('agreement_type', String(agreementType));

    const data = {
      request_posting_id: requestId,
      supply_posting_id: supplyId,
      agreement_type: agreementType,
    };

    await axios({
      method: 'PATCH',
      url: 'https://authortie-app.herokuapp.com/api/v1/bids/update',
      headers,
      data,
    });

    return undefined;
  },
);
