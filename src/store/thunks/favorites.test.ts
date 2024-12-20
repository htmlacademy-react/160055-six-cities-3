import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { State } from '../../types/store';
import { AppThunkDispatch, makeFakeOfferCard, extractActionsTypes } from '../../utils/mocks';
import { Endpoint } from '../../const';
import { changeFavorite, fetchFavorites } from './favorites';

describe('Favorites actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockOffer = makeFakeOfferCard(false);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('fetchFavorites', () => {
    it('should dispatch "fetchFavorites.pending" and "fetchFavorites.fulfilled" with thunk "fetchFavorites" and server response 200', async () => {
      mockAxiosAdapter.onGet(`${Endpoint.Favorite}`).reply(200, [mockOffer]);
      await store.dispatch(fetchFavorites());
      const actions = extractActionsTypes(store.getActions());
      const fetchFavoritesFullfilled = store.getActions().at(1) as ReturnType<typeof fetchFavorites.fulfilled>;
      expect(actions).toEqual([
        fetchFavorites.pending.type,
        fetchFavorites.fulfilled.type,
      ]);
      expect(fetchFavoritesFullfilled.payload).toEqual([mockOffer]);
    });

    it('should dispatch "fetchFavorites.pending" and "fetchFavorites.rejected" with server response 400', async () => {
      mockAxiosAdapter.onGet(`${Endpoint.Favorite}`).reply(400, []);
      await store.dispatch(fetchFavorites());
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchFavorites.pending.type,
        fetchFavorites.rejected.type,
      ]);
    });
  });

  describe('changeFavorite', () => {
    it('should dispatch "changeFavorite.pending", "changeFavorite.fulfilled" when server response 200', async() => {
      const status = true;
      const offerId = mockOffer.id;
      const route = `${Endpoint.Favorite}/${offerId}/${Number(status)}`;
      mockAxiosAdapter.onPost(route).reply(200, mockOffer);
      await store.dispatch(changeFavorite({offerId: offerId, statusFavorite: status}));
      const actions = extractActionsTypes(store.getActions());
      const changeFavoriteFullfilled = store.getActions().at(1) as ReturnType<typeof changeFavorite.fulfilled>;

      expect(actions).toEqual([
        changeFavorite.pending.type,
        changeFavorite.fulfilled.type,
      ]);
      expect(changeFavoriteFullfilled.payload).toEqual(mockOffer);
    });

    it('should dispatch "changeFavorite.pending", "changeFavorite.rejected" when server response 400', async() => {
      const status = true;
      const offerId = mockOffer.id;
      const route = `${Endpoint.Favorite}/${offerId}/${Number(status)}`;
      mockAxiosAdapter.onPost(route).reply(400, []);
      await store.dispatch(changeFavorite({offerId: offerId, statusFavorite: status}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavorite.pending.type,
        changeFavorite.rejected.type,
      ]);
    });

    it('should equal to answer "changeFavorite" to remove mockOffer from favorites', async() => {
      const status = false;
      const offerId = mockOffer.id;
      const route = `${Endpoint.Favorite}/${offerId}/${Number(status)}`;
      mockAxiosAdapter.onPost(route).reply(200, mockOffer);
      await store.dispatch(changeFavorite({offerId: offerId, statusFavorite: status}));
      const changeFavoriteFullfilled = store.getActions().at(1) as ReturnType<typeof changeFavorite.fulfilled>;

      expect(changeFavoriteFullfilled.payload).toEqual(mockOffer);
    });
  });
});
