import { createAsyncThunk } from '@reduxjs/toolkit';
import * as T from './types';
import axios from 'axios';
import {
  STATUS_OPTIONS,
  STUDENT_OPTIONS,
  GRADE_OPTIONS,
  COUNTRIES,
} from 'src/constants/profileConstants';

const client = localStorage.getItem('client');
const accessToken = localStorage.getItem('access-token');
const uid = localStorage.getItem('uid');

const headers = { client, uid, ['access-token']: accessToken };

const defaultArr = { value: '', label: '' };

interface Options {
  label: string;
  value: string;
}

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
    formData.append('email_notifications', profileData.notificationsEmail);
    formData.append('push_notifications', profileData.notificationsBrow);
    profileData.avatar && formData.append('avatar', profileData.avatar);
    formData.append('degree', profileData.status);
    formData.append('degree_category', profileData.grade);
    formData.append('links', JSON.stringify(profileData.linksForData));
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

  const { data } = res;

  const userCountry = COUNTRIES.filter((item: Options) => item.label === data.country)[0];

  const userLinks: T.Links[] = !!data.links && !!data.links.length
    ? data.links.map((item: { url: string }, index: number) => ({
        url: item.url,
        id: index,
      }))
    : [
        { url: '', id: 1 },
        { url: '', id: 2 },
      ];

  const userDegree = !!data.degree
    ? STATUS_OPTIONS.filter((item: Options) => item.value === data.degree)[0]
    : defaultArr;

  const userGrade =
    userDegree.value === 'student'
      ? STUDENT_OPTIONS.filter((item: Options) => item.value === data.degree_category)[0]
      : GRADE_OPTIONS.filter((item: Options) => item.value === data.degree_category)[0];

  const profile: T.Profile = {
    name: data.first_name,
    lastName: data.last_name,
    middleName: data.middle_name,
    affiliation: data.affiliation,
    about: data.about,
    country: userCountry,
    privateAnc: data.public_visibility,
    notificationsEmail: data.email_notifications,
    notificationsBrow: data.push_notifications,
    avatarUrl: data.avatar_url,
    status: userDegree,
    grade: userGrade,
    links: userLinks,
    confirmOrcid: data.orcid_uuid,
  };

  return profile;
});

export const getAuthProfile = createAsyncThunk<any, any>('postings/getAuthProfile', async (id) => {
  const res = await axios({
    method: 'GET',
    url: `https://authortie-app.herokuapp.com/api/v1/profiles/${id}`,
    headers,
  });

  const { data } = res;

  const userCountry = COUNTRIES.filter((item: Options) => item.label === data.country)[0];
  const userLinks: T.Links[] = !!data.links.length
    ? data.links.map((item: { url: string }, index: number) => ({
        url: item.url,
        id: index,
      }))
    : [
        { url: '', id: 1 },
        { url: '', id: 2 },
      ];

  const userDegree = !!data.degree
    ? STATUS_OPTIONS.filter((item: Options) => item.value === data.degree)[0]
    : defaultArr;

  const userGrade =
    userDegree.value === 'student'
      ? STUDENT_OPTIONS.filter((item: Options) => item.value === data.degree_category)[0]
      : GRADE_OPTIONS.filter((item: Options) => item.value === data.degree_category)[0];

  const profile: T.Profile = {
    name: data.first_name,
    lastName: data.last_name,
    middleName: data.middle_name,
    affiliation: data.affiliation,
    about: data.about,
    country: userCountry,
    privateAnc: data.public_visibility,
    notificationsEmail: data.email_notifications,
    notificationsBrow: data.push_notifications,
    avatarUrl: data.avatar_url,
    status: userDegree,
    grade: userGrade || defaultArr,
    links: userLinks,
    confirmOrcid: data.orcid_uuid,
  };

  return profile;
});
