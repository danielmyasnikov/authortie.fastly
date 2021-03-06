import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth/slice';
import { createPost } from './request/slice';
import { postings } from './postings/slice';
import { postingsMain } from './main/slice';
import { profileSlice } from './profile/slice';
import { detailedApplicationSlice } from './detailedApplication/slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    createPost: createPost.reducer,
    postings: postings.reducer,
    postingsMain: postingsMain.reducer,
    profileSlice: profileSlice.reducer,
    detailedApplication: detailedApplicationSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    const options = {
      thunk: true,
      immutableCheck: false,
      serializableCheck: false,
    };

    return getDefaultMiddleware(options);
  },
  preloadedState: {},
});

export default store;
