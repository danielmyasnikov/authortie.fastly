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
    formData.append('first_name', profileData.name);
    formData.append('last_name', profileData.lastName);
    formData.append('middle_name', profileData.middleName);
    formData.append('affiliation', profileData.affiliation);
    formData.append('about', profileData.about);
    formData.append('country', profileData.country);
    formData.append('public_visibility', profileData.privateAnc);
    formData.append('affiliation_visibility', profileData.privateAff);
    formData.append('email_notifications', profileData.notificationsEmail);
    formData.append('push_notifications', profileData.notificationsBrow);
    formData.append('avatar', profileData.avatar);
    formData.append('degree', profileData.status);
    formData.append('degree_category', profileData.grade);
    formData.append('links', profileData.linksForData);
    const res = await axios({
      method: 'PATCH',
      url: `https://authortie-app.herokuapp.com/api/v1/profiles/update`,
      headers,
      data: formData,
    });
    return res.data;
  },
);

export const getProfile = createAsyncThunk('postings/getPostings', async () => {
  const res = await axios({
    method: 'GET',
    url: `https://authortie-app.herokuapp.com/api/v1/profiles/me`,
    headers,
  });
  return res.data;
});

// "id": 3,
// "first_name": "Владик",
// "last_name": "L",
// "middle_name": "",
// "affiliation": "ВУЗ ",
// "about": "я , просто я ",
// "country": "RUSSIAN FEDERATION",
// "lang": null,
// "city": null,
// "public_visibility": false,
// "affiliation_visibility": false,
// "email_notifications": false,
// "push_notifications": false,
// "created_at": "2021-06-26T15:56:02.062Z",
// "updated_at": "2021-07-08T19:19:45.919Z",
// "user_id": 55,
// "degree": "student",
// "degree_category": "Студент",
// "orcid_uuid": null,
// "avatar_url": "https://staging-authortie.s3.eu-central-1.amazonaws.com/sy4fuqxqlk4zvfqhh3zf4dcm6n0g?response-content-disposition=inline%3B%20filename%3D%22%253F%253F%253F%253F%253F%253F%253F%253F2.png%22%3B%20filename%2A%3DUTF-8%27%27%25D0%25BA%25D0%25B0%25D1%2580%25D1%2582%25D0%25B8%25D0%25BD%25D0%25BA%25D0%25B02.png&response-content-type=image%2Fpng&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYSWN27GKTEJYO7OD%2F20210713%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20210713T184420Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=fdaa63e00bcdf3be0930841eefbd059dfd210e3e4076d26bb2c1300e4c90c662",
// "links": []
