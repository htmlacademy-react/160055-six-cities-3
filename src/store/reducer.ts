import { createReducer } from '@reduxjs/toolkit';
import { setCity } from './action';

import { offers } from '../mocks/offers';

const INIT_CITY = 'Paris';

const initialState = {
  city: INIT_CITY,
  offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    });
});

export {reducer};
