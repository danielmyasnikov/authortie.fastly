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

const LINKS_DEFAULT = [
  { url: '', id: 1 },
  { url: '', id: 2 },
  { url: '', id: 3 },
  { url: '', id: 4 },
  { url: '', id: 5 },
  { url: '', id: 6 },
];

interface Options {
  label: string;
  value: string;
}

export const setProfile = createAsyncThunk<any, any>(
  'postings/getPostings',
  async (profileData) => {
    const formData = new FormData();
    profileData.name && formData.append('first_name', profileData.name);
    profileData.lastName && formData.append('last_name', profileData.lastName);
    profileData.middleName && formData.append('middle_name', profileData.middleName);
    profileData.affiliation && formData.append('affiliation', profileData.affiliation);
    profileData.about && formData.append('about', profileData.about);
    profileData.country && formData.append('country', profileData.country);
    profileData.privateAnc && formData.append('public_visibility', profileData.privateAnc);
    profileData.notificationsEmail &&
      formData.append('email_notifications', profileData.notificationsEmail);
    profileData.notificationsBrow &&
      formData.append('push_notifications', profileData.notificationsBrow);
    profileData.avatar && formData.append('avatar', profileData.avatar);
    profileData.status && formData.append('degree', profileData.status);
    profileData.grade && formData.append('degree_category', profileData.grade);
    profileData.linksForData && formData.append('links', JSON.stringify(profileData.linksForData));
    const res = await axios({
      method: 'PATCH',
      url: `https://authortie-app.herokuapp.com/api/v1/profiles/update`,
      headers,
      data: formData,
    });
    return res.data;
  },
);

export const getProfile = createAsyncThunk(
  'postings/getPostings',
  async (id: string | undefined) => {
    const url = !!id
      ? `https://authortie-app.herokuapp.com/api/v1/profiles/${id}`
      : `https://authortie-app.herokuapp.com/api/v1/profiles/me`;
    const res = await axios({
      method: 'GET',
      url,
      headers,
    });

    const { data } = res;

    const userCountry = COUNTRIES.filter((item: Options) => item.label === data.country)[0];

    const userLinks: T.Links[] =
      !!data.links && !!data.links.length
        ? data.links.map((item: { url: string }, index: number) => ({
            url: item.url,
            id: index,
          }))
        : LINKS_DEFAULT;

    const userDegree = !!data.degree
      ? STATUS_OPTIONS.filter((item: Options) => item.value === data.degree)[0]
      : defaultArr;

    const userGrade =
      userDegree.value === 'student'
        ? STUDENT_OPTIONS.filter((item: Options) => item.value === data.degree_category)[0]
        : GRADE_OPTIONS.filter((item: Options) => item.value === data.degree_category)[0];

    const profile: T.Profile = {
      id: data.id,
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
      regoDate: data.rego_date,
      reputationScore: data.reputation_score
    };

    return profile;
  },
);

export const getAuthProfile = createAsyncThunk<any, any>('postings/getAuthProfile', async (id) => {
  const res = await axios({
    method: 'GET',
    url: `https://authortie-app.herokuapp.com/api/v1/profiles/${id}`,
    headers,
  });

  const { data } = res;

  const userCountry = COUNTRIES.filter((item: Options) => item.label === data.country)[0];

  const userLinks: T.Links[] =
    !!data.links && !!data.links.length
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
    id: data.id,
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
    regoDate: data.rego_date,
    reputationScore: data.reputation_score
  };

  return profile;
});
