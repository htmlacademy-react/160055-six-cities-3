import { createSlice } from '@reduxjs/toolkit';

import { RequestStatus } from '../../const';
import { Offer } from '../../types/offer-type';
import { fetchFavorites, changeFavorite } from '../thunks/favorites';

interface FavoritesState {
  favorites: Offer[];
  status: RequestStatus;
}

const initialState: FavoritesState = {
  favorites: [],
  status: RequestStatus.Idle,
};

export const favoritesSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchFavorites.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.favorites = action.payload;
      state.status = RequestStatus.Success;
    });
    builder.addCase(changeFavorite.fulfilled, (state, action) => {
      const changedOffer = action.payload;
      if (changedOffer.isFavorite) {
        state.favorites.push(action.payload);
      } else {
        const index = state.favorites.findIndex((offer) => offer.id === changedOffer.id);
        state.favorites.splice(index, 1);
      }
    });
  },
  initialState,
  name: 'favorites',
  reducers: {},
  selectors: {
    favorites: (state: FavoritesState) => state.favorites,
    status: (state: FavoritesState) => state.status,
    favoritesLength: (state: FavoritesState) => state.favorites.length,
  },
});

export const favoritesActions = {...favoritesSlice.actions, fetchFavorites, changeFavorite};
export const favoritesSelector = favoritesSlice.selectors;
