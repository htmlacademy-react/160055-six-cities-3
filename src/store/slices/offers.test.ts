import { RequestStatus } from '../../const';
import { makeFakeFullOfferCard } from '../../utils/mocks';
import { changeFavorite } from '../thunks/favorites';
import { fetchAllOffers } from '../thunks/offers';
import { offersSlice } from './offers';

describe('offersSlice', () => {

  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      status: RequestStatus.Idle,
      offers: [],
    };

    const result = offersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      status: RequestStatus.Idle,
      offers: [],
    };

    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "RequestStatus" to "Loading" with "fetchAllOffers.pending"', () => {
    const expectedState = {
      status: RequestStatus.Loading,
      offers: [],
    };

    const result = offersSlice.reducer(undefined, fetchAllOffers.pending('', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "RequestStatus" to "Failed" with "fetchAllOffers.rejected"', () => {
    const expectedState = {
      status: RequestStatus.Failed,
      offers: [],
    };

    const result = offersSlice.reducer(undefined, fetchAllOffers.rejected(null, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "RequestStatus" to "Success" add mockOffer allOffers with "fetchAllOffers.fulfilled"', () => {
    const mockOffer = makeFakeFullOfferCard();
    const inintialState = {
      status: RequestStatus.Idle,
      offers: [],
    };
    const expectedState = {
      status: RequestStatus.Success,
      offers: [mockOffer],
    };

    const result = offersSlice.reducer(
      inintialState,
      fetchAllOffers.fulfilled([mockOffer], '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "favotireOffer" change mockOffer with "changeFavorites.fulfilled"', () => {
    const mockOffer = makeFakeFullOfferCard();
    const inintialState = {
      offers: [mockOffer],
      status: RequestStatus.Success,
    };
    const expectedState = {
      offers: [mockOffer],
      status: RequestStatus.Success,
    };

    const result = offersSlice.reducer(
      inintialState,
      changeFavorite.fulfilled(mockOffer, '', {offerId: mockOffer.id, statusFavorite: !mockOffer.isFavorite}));

    expect(result).toEqual(expectedState);
  });
});
