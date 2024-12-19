import { createAPI } from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import { State } from '../../types/store';
import { AppThunkDispatch, makeFakeComment, makeFakeOfferCard, makeFakeReview, extractActionsTypes } from '../../utils/mocks';
import { AppRoute } from '../../const';
import { fetchComments, postComment } from './comments';

describe('Comments actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockOffer = makeFakeOfferCard();
  const mockComment = makeFakeComment();
  const mockReview = makeFakeReview();
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('fetchComments', () => {
    it('should dispatch "fetchComments.pending" and "fetchComments.fulfilled" with thunk "fetchComments" and server response 200', async () => {
      const offerId = mockOffer.id;
      const route = `${AppRoute.Comments}/${offerId}`;
      mockAxiosAdapter.onGet(route).reply(200, [mockOffer]);
      await store.dispatch(fetchComments(offerId));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchComments.pending.type,
        fetchComments.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchComments.pending" and "fetchComments.rejected" with server response 400', async () => {
      const offerId = mockOffer.id;
      const route = `${AppRoute.Comments}/${offerId}`;
      mockAxiosAdapter.onGet(route).reply(400, []);
      await store.dispatch(fetchComments(offerId));
      const actions = extractActionsTypes(store.getActions());
      expect(actions).toEqual([
        fetchComments.pending.type,
        fetchComments.rejected.type,
      ]);
    });
  });

  describe('postComment', () => {
    it('should dispatch "postComment.pending", "postComment.fulfilled" when server response 200', async() => {
      const offerId = mockComment.offerId;
      const route = `${AppRoute.Comments}/${offerId}`;
      mockAxiosAdapter.onPost(route).reply(200, mockReview);
      await store.dispatch(postComment(mockComment));
      const actions = extractActionsTypes(store.getActions());
      const postCommmentFullfilled = store.getActions().at(1) as ReturnType<typeof postComment.fulfilled>;

      expect(actions).toEqual([
        postComment.pending.type,
        postComment.fulfilled.type,
      ]);

      expect(postCommmentFullfilled.payload).toEqual(mockReview);
    });

    it('should dispatch "postComment.pending", "postComment.rejected" when server response 400', async() => {
      const offerId = mockComment.offerId;
      const route = `${AppRoute.Comments}/${offerId}`;
      mockAxiosAdapter.onPost(route).reply(400, []);
      await store.dispatch(postComment(mockComment));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postComment.pending.type,
        postComment.rejected.type,
      ]);
    });
  });
});
