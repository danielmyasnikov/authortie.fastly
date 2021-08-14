import { createSlice } from '@reduxjs/toolkit';
import * as T from './types';
import * as actions from './actions';

const initialState: T.State = {
  profile: {
    id: NaN,
    name: '',
    lastName: '',
    middleName: '',
    affiliation: '',
    about: '',
    country: {
      value: '',
      label: '',
    },
    privateAnc: false,
    notificationsEmail: true,
    notificationsBrow: true,
    avatar: undefined,
    avatarUrl: '',
    confirmOrcid: false,
    status: {
      value: '',
      label: '',
    },
    grade: {
      value: '',
      label: '',
    },
    links: [
      { url: '', id: 1 },
      { url: '', id: 2 },
    ],
  },
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getProfile.fulfilled, (state, { payload }) => {
      Object.assign(state.profile, payload);
    }),
      builder.addCase(actions.getAuthProfile.fulfilled, (state, { payload }) => {
        Object.assign(state.profile, payload);
      });
  },
});
