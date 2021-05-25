import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth/slice'

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
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

export default store