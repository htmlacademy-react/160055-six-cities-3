import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RequestStatus } from '../../const';
import { fetchAllOffers } from '../thunks/offers';
import { FullOffer } from '../../types/offer-type';
import { changeFavorite } from '../thunks/favorites';

interface OffersState {
  offers: FullOffer[];
  status: RequestStatus;
  activeId?: FullOffer['id'];
}

const initialState: OffersState = {
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
      })
      .addCase(changeFavorite.fulfilled, (state, action) => {
        const changedOffer = action.payload;
        const offerToChange = state.offers.find((offer) => offer.id === changedOffer.id);
        if (offerToChange) {
          offerToChange.isFavorite = changedOffer.isFavorite;
        }
      });
  },
  initialState,
  name: 'offers',
  reducers: {
    setActiveId(state, action: PayloadAction<FullOffer['id'] | undefined>) {
      state.activeId = action.payload;
    }
  },
  selectors: {
    offers: (state: OffersState) => state.offers,
    offersStatus: (state: OffersState) => state.status,
    activeId: (state: OffersState) => state.activeId,
  },
});

export const offersActions = {...offersSlice.actions, fetchAllOffers};
export const offersSelectors = offersSlice.selectors;
