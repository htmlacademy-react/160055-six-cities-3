import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RequestStatus } from '../../const';
import { fetchAllOffers } from '../thunks/offers';
import { FullOffer } from '../../types/offer-type';

const INIT_CITY = 'Paris';

interface OffersState {
  offers: FullOffer[];
  status: RequestStatus;
  city: string;
}

const initialState: OffersState = {
  city: INIT_CITY,
  status: RequestStatus.Idle,
  offers: [],
};

const offersSlice = createSlice({
  extraReducers(builder) {
    builder
      .addCase(fetchAllOffers.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchAllOffers.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchAllOffers.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
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
    offersStatus: (state) => state.status,
  },
});

const offersActions = {...offersSlice.actions, fetchAllOffers};
const offersSelectors = offersSlice.selectors;
// {
//   ...offersSlice.selectors,
//   cityOffers: createSelector(offersSlice.selectors.offers, offersSlice.selectors.city, (allOffers, city) => allOffers.filter((offer) => offer.city.name === city)),
// };

export {offersActions, offersSelectors, offersSlice};
