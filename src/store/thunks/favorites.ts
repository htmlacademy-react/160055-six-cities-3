import { createAppAsyncThunk } from '../../hooks/store';
import type { Offer } from '../../types/offer-type';
import { Endpoint } from '../../const';
import { FavoriteStatus } from '../../types/favorite';

export const fetchFavorites = createAppAsyncThunk<Offer[], undefined>('fetchFavorites/all', async(_arg, {extra: api}) => {
  const response = await api.get<Offer[]>(Endpoint.Favorite);
  return response.data;
});

export const changeFavorite = createAppAsyncThunk<Offer, FavoriteStatus>('fetchFavorite/change', async ({offerId, status}, {extra: api}) => {
  const response = await api.post<Offer>(`${Endpoint.Favorite}/${offerId}/${Number(status)}`);
  return response.data;
});
