import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { State } from '../../types/store';
import { AppThunkDispatch, makeFakeOfferCard, extractActionsTypes, makeFakeFullOfferCard } from '../../utils/mocks';
import { Endpoint } from '../../const';
import { fetchAllOffers, fetchNearBy, fetchOffer } from './offers';

describe('Offers actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockOffer = makeFakeFullOfferCard();
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('fetchAllOffers', () => {
    it('should dispatch "fetchAllOffers.pending" and "fetchAllOffers.fulfilled" with thunk "fetchAllOffers" and server response 200', async () => {
      const mockOffers = [makeFakeOfferCard(true), makeFakeOfferCard(false)];
      mockAxiosAdapter.onGet(`${Endpoint.Offers}`).reply(200, mockOffers);
      await store.dispatch(fetchAllOffers());
      const actions = extractActionsTypes(store.getActions());
      const fetchAllOffersFullfilled = store.getActions().at(1) as ReturnType<typeof fetchAllOffers.fulfilled>;
      expect(actions).toEqual([
        fetchAllOffers.pending.type,
        fetchAllOffers.fulfilled.type,
      ]);
      expect(fetchAllOffersFullfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchAllOffers.pending" and "fetchAllOffers.rejected" with thunk "fetchAllOffers" and server response 400', async () => {
      mockAxiosAdapter.onGet(`${Endpoint.Offers}`).reply(400, []);
      await store.dispatch(fetchAllOffers());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchAllOffers.pending.type,
        fetchAllOffers.rejected.type,
      ]);
    });
  });

  describe('fetchOffer', () => {
    it('should dispatch "fetchOffer.pending", "fetchOffer.fulfilled" when server response 200', async() => {
      const offerId = mockOffer.id;
      const route = `${Endpoint.Offers}/${offerId}`;
      mockAxiosAdapter.onGet(route).reply(200, mockOffer);
      await store.dispatch(fetchOffer(offerId));
      const actions = extractActionsTypes(store.getActions());
      const fetchOfferFullfilled = store.getActions().at(1) as ReturnType<typeof fetchOffer.fulfilled>;

      expect(actions).toEqual([
        fetchOffer.pending.type,
        fetchOffer.fulfilled.type,
      ]);
      expect(fetchOfferFullfilled.payload).toEqual(mockOffer);
    });

    it('should dispatch "fetchOffer.pending", "fetchOffer.rejected" when server response 400', async() => {
      const offerId = mockOffer.id;
      const route = `${Endpoint.Offers}/${offerId}`;
      mockAxiosAdapter.onGet(route).reply(400, []);
      await store.dispatch(fetchOffer(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffer.pending.type,
        fetchOffer.rejected.type,
      ]);
    });
  });

  describe('fetchNearBy', () => {
    it('should dispatch "fetchNearBy.pending", "fetchNearBy.fulfilled" when server response 200', async() => {
      const offerId = mockOffer.id;
      const route = `${Endpoint.Offers}/${offerId}/nearby`;
      mockAxiosAdapter.onGet(route).reply(200, mockOffer);
      await store.dispatch(fetchNearBy(offerId));
      const actions = extractActionsTypes(store.getActions());
      const fetchNearByFullfilled = store.getActions().at(1) as ReturnType<typeof fetchNearBy.fulfilled>;

      expect(actions).toEqual([
        fetchNearBy.pending.type,
        fetchNearBy.fulfilled.type,
      ]);
      expect(fetchNearByFullfilled.payload).toEqual(mockOffer);
    });

    it('should dispatch "fetchNearBy.pending", "fetchNearBy.rejected" when server response 400', async() => {
      const offerId = mockOffer.id;
      const route = `${Endpoint.Offers}/${offerId}/nearby`;
      mockAxiosAdapter.onGet(route).reply(400, []);
      await store.dispatch(fetchNearBy(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearBy.pending.type,
        fetchNearBy.rejected.type,
      ]);
    });
  });
});
