import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const client = localStorage.getItem('client');
const accessToken = localStorage.getItem('access-token');
const uid = localStorage.getItem('uid');

const headers = { client, uid, ['access-token']: accessToken };

export const getDetailedApplication = createAsyncThunk(
  'detailedApplication/getPostings',
  async (id: string) => {
    const res = await axios({
      method: 'GET',
      headers,
      url: `https://authortie-app.herokuapp.com/api/v1/postings/${id}`,
    });
    return res.data;
  },
);

export const submitBids = createAsyncThunk<any, any, any>(
  'detailedApplication/submitBids',
  async ({ requestId, supplyId, agreementType }) => {
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
      url: `https://authortie-app.herokuapp.com/api/v1/bids`,
      headers,
      data: data,
    });

    return undefined;
  },
);

export const submitBidsUp = createAsyncThunk<any, any, any>(
  'detailedApplication/submitBidsUp',
  async ({ requestId, supplyId, agreementType }) => {
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
      url: `https://authortie-app.herokuapp.com/api/v1/bids/update`,
      headers,
      data: data,
    });

    return undefined;
  },
);
