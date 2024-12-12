import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../../services/api';
import { State } from '../../types/store';
import { AppThunkDispatch, extractActionsTypes } from '../../utils/mocks';
import { AppRoute } from '../../const';
import { LoginData, checkAuth, login, logout } from './auth';
import * as tokenStorage from '../../services/token';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
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

  describe('login', () => {
    it('should dispatch "login.pending", "redirectToRoute", "login.fulfilled" when server response 200', async() => {
      const fakeUser: LoginData = { email: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(AppRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(login(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        login.pending.type,
        login.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: LoginData = { email: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(AppRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(login(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });

  });

  describe('logout', () => {
    it('should dispatch "logout.pending", "logout.fulfilled" when server response 204', async() => {
      mockAxiosAdapter.onDelete(AppRoute.Logout).reply(204);

      await store.dispatch(logout());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logout.pending.type,
        logout.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logout"', async () => {
      mockAxiosAdapter.onDelete(AppRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logout());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });
});
