import { createAppAsyncThunk } from '../../hooks/store';
import type { FullOffer, Offer } from '../../types/offer-type';
import { Endpoint } from '../../const';

export const fetchAllOffers = createAppAsyncThunk<FullOffer[], undefined>('fetchOffers/all', async(_arg, {extra: api}) => {
  const response = await api.get<FullOffer[]>(Endpoint.Offers);
  return response.data;
});

export const fetchOffer = createAppAsyncThunk<FullOffer, string>('fetchOffers/one', async (offerId, {extra: api}) => {
  const response = await api.get<FullOffer>(`${Endpoint.Offers}/${offerId}`);
  return response.data;
});

export const fetchNearBy = createAppAsyncThunk<Offer[], string>('fetchOffers/near', async (offerId, {extra: api}) => {
  const response = await api.get<Offer[]>(`${Endpoint.Offers}/${offerId}/nearby`);
  return response.data;
});
