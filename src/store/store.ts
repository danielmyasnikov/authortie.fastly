import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth/slice';
import { createPost } from './request/slice';
import { postings } from './postings/slice';
import { postingsMain } from './main/slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    createPost: createPost.reducer,
    postings: postings.reducer,
    postingsMain: postingsMain.reducer,
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
