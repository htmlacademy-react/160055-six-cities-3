import { configureStore } from '@reduxjs/toolkit';

import { offersSlice } from './slices/offers';
import { createAPI } from '../services/api';
import { userSlice } from './slices/user';
import { offerSlice } from './slices/offer';
import { reviewSlice } from './slices/reviews';

export const api = createAPI();

export const store = configureStore({
  reducer: {
    [offersSlice.name]: offersSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [offerSlice.name]: offerSlice.reducer,
    [reviewSlice.name]: reviewSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
