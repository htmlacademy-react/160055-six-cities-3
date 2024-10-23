import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { offers } from '../../mocks/offers';

const INIT_CITY = 'Paris';

const initialState = {
  city: INIT_CITY,
  offers
};

const offersSlice = createSlice({
  initialState,
  name: 'offers',
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    }
  },
  selectors: {
    city: (state) => state.city,
    offers: (state) => state.offers,
  },
});

const offersActions = offersSlice.actions;
const offersSelectors = {
  ...offersSlice.selectors,
  cityOffers: createSelector(offersSlice.selectors.offers, offersSlice.selectors.city, (allOffers, city) => allOffers.filter((offer) => offer.city.name === city)),
};

export {offersActions, offersSelectors, offersSlice};
