import { RequestStatus } from '../../const';
import { makeFakeComment, makeFakeReview } from '../../utils/mocks';
import { fetchComments, postComment } from '../thunks/comments';
import { reviewSlice } from './reviews';

describe('reviewsSlice', () => {

  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      items: [],
      status: RequestStatus.Idle,
    };

    const result = reviewSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      items: [],
      status: RequestStatus.Idle,
    };

    const result = reviewSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "favoriteOffer" to array with offerCard, with "fetchFavorites.fulfilled"', () => {
    const mockReview = makeFakeReview();
    const expectedState = {
      items: [mockReview],
      status: RequestStatus.Success,
    };

    const result = reviewSlice.reducer(
      undefined,
      fetchComments.fulfilled([mockReview], '', ''),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "RequestStatus" to "Loading" with "fetchCommnets.pending"', () => {
    const expectedState = {
      items: [],
      status: RequestStatus.Loading,
    };

    const result = reviewSlice.reducer(
      undefined,
      fetchComments.pending('', ''),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "RequestStatus" to "Failed" with "fetchCommnets.rejecting"', () => {
    const expectedState = {
      items: [],
      status: RequestStatus.Failed,
    };

    const result = reviewSlice.reducer(
      undefined,
      fetchComments.rejected(null, '', ''),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "RequestStatus" to "Success" with "postComment.fulfilled"', () => {
    const mockComment = makeFakeComment();
    const mockReview = makeFakeReview();
    const inintialState = {
      items: [],
      status: RequestStatus.Success,
    };
    const expectedState = {
      items: [mockReview],
      status: RequestStatus.Success,
    };

    const result = reviewSlice.reducer(
      inintialState,
      postComment.fulfilled(mockReview, '', mockComment),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "RequestStatus" to "Loading" with "postComment.pending"', () => {
    const mockComment = makeFakeComment();
    const expectedState = {
      items: [],
      status: RequestStatus.Loading,
    };

    const result = reviewSlice.reducer(
      undefined,
      postComment.pending('', mockComment),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "RequestStatus" to "Failed" with "postComment.rejecting"', () => {
    const mockComment = makeFakeComment();
    const expectedState = {
      items: [],
      status: RequestStatus.Failed,
    };

    const result = reviewSlice.reducer(
      undefined,
      postComment.rejected(null, '', mockComment),
    );

    expect(result).toEqual(expectedState);
  });
});
