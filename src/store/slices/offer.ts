import { createSlice } from '@reduxjs/toolkit';

import { RequestStatus } from '../../const';
import { fetchOffer, fetchNearBy } from '../thunks/offers';
import { FullOffer, Offer } from '../../types/offer-type';

interface OfferState {
  info: FullOffer | null;
  nearby: Offer[];
  status: RequestStatus;
}

const initialState: OfferState = {
  info: null,
  nearby: [],
  status: RequestStatus.Idle,
};

export const offerSlice = createSlice({
  extraReducers(builder) {
    builder
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.info = action.payload;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(fetchOffer.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchNearBy.fulfilled, (state, action) => {
        state.nearby = action.payload;
      });
  },
  initialState,
  name: 'offer',
  reducers: {
    clear(state) {
      state.info = null;
      state.nearby = [];
    }
  },
  selectors: {
    offer: (state: OfferState) => state.info,
    offerStatus: (state: OfferState) => state.status,
    nearbyOffers: (state: OfferState) => state.nearby,
  },
});

export const offerActions = {...offerSlice.actions, fetchNearBy, fetchOffer};
export const offerSelector = offerSlice.selectors;
