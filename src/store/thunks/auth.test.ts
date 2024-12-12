import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import { State } from '../../types/store';
import { AppThunkDispatch, extractActionsTypes } from '../../utils/mocks';
import { AppRoute, CITIES } from '../../const';
import { checkAuth } from './auth';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({App: {cities: CITIES[0]}});
  });

  describe('checkAuth', () => {
    it('should dispatch "checkAuth.pending" and "checkAuth.fulfilled" with thunk "checkAuth', async () => {
      mockAxiosAdapter.onGet(AppRoute.Login).reply(200);
      await store.dispatch(checkAuth());
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        checkAuth.pending.type,
        checkAuth.fulfilled.type,
      ]);
    });
    it('should dispatch "checkAuth.pending" and "checkAuth.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(AppRoute.Login).reply(400);

      await store.dispatch(checkAuth());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuth.pending.type,
        checkAuth.rejected.type,
      ]);
    });
  });
});
