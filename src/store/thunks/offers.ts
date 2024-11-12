import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { FullOffer } from '../../types/offer-type';
import { Endpoint } from '../../const';

export const fetchAllOffers = createAsyncThunk<FullOffer[], undefined, {extra: AxiosInstance}>('fetchOffers/all', async(_arg, {extra: api}) => {
  const response = await api.get<FullOffer[]>(Endpoint.Offers);
  return response.data;
});
