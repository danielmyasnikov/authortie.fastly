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
  async (postData) => {
    try {
      const res = await axios({
        method: 'POST',
        url: `https://authortie-app.herokuapp.com/api/v1/postings`,
        headers,
        data: {
          knowledge_area: postData.knowledgeArea,
          title: postData.title,
          comment: postData.comment,
          approx_date: postData.approxDate,
          keyword_list: postData.keywordList,
          work_type: postData.workType,
          reward_type: postData.rewardType,
          reward_comment: postData.serviceRewardDescription,
          reward_currency: postData.currency,
          reward_sum: postData.sum,
          secreted: postData.secreted,
          revert_posting_attributes: {
            approx_date: postData.rewordApproxDate,
            work_type: postData.rewardWorkType,
            knowledge_area: postData.rewardnNowledgeArea,
            title: postData.rewardTitle,
            comment: postData.rewardComment,
          },
        },
      });
      return undefined;
    } catch (err) {
      return;
    }
  },
);
