import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RequestStatus } from '../../const';
import { fetchAllOffers } from '../thunks/offers';
import { FullOffer } from '../../types/offer-type';

const INIT_CITY = 'Paris';

interface OffersState {
  offers: FullOffer[];
  status: RequestStatus;
  city: string;
  activeId?: FullOffer['id'];
}

const initialState: OffersState = {
  city: INIT_CITY,
  status: RequestStatus.Idle,
  offers: [],
};

export const offersSlice = createSlice({
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
    },
    setActiveId(state, action: PayloadAction<FullOffer['id'] | undefined>) {
      state.activeId = action.payload;
    }
  },
  selectors: {
    city: (state) => state.city,
    offers: (state) => state.offers,
    offersStatus: (state) => state.status,
    activeId: (state) => state.activeId,
  },
});

export const offersActions = {...offersSlice.actions, fetchAllOffers};
export const offersSelectors = offersSlice.selectors;
// {
//   ...offersSlice.selectors,
//   cityOffers: createSelector(offersSlice.selectors.offers, offersSlice.selectors.city, (allOffers, city) => allOffers.filter((offer) => offer.city.name === city)),
// };