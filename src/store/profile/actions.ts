import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const client = localStorage.getItem('client');
const accessToken = localStorage.getItem('access-token');
const uid = localStorage.getItem('uid');

const headers = { client, uid, ['access-token']: accessToken };

export const setProfile = createAsyncThunk<any, any>(
  'postings/getPostings',
  async (profileData) => {
    const formData = new FormData();
    formData.append('affiliation', profileData.affiliation);
    formData.append('about', profileData.about);
    formData.append('country', profileData.country);
    formData.append('public_visibility', profileData.privateAnc);
    formData.append('affiliation_visibility', profileData.privateAff);
    formData.append('email_notifications', profileData.notificationsEmail);
    formData.append('push_notifications', profileData.notificationsBrow);
    formData.append('avatar', profileData.avatar);

    const res = await axios({
      method: 'GET',
      url: `https://authortie-app.herokuapp.com/api/v1/profiles/update`,
      headers,
      data: { formData },
    });
    return res.data;
  },
);
