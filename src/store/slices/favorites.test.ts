import { RequestStatus } from '../../const';
import { makeFakeOfferCard } from '../../utils/mocks';
import { changeFavorite, fetchFavorites } from '../thunks/favorites';
import { favoritesSlice } from './favorites';

const IS_FAVORITE = true;

describe('favoriteSlice', () => {

  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      favorites: [],
      status: RequestStatus.Idle,
    };

    const result = favoritesSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      favorites: [],
      status: RequestStatus.Idle,
    };

    const result = favoritesSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "favoriteOffer" to array with offerCard, with "fetchFavorites.fulfilled"', () => {
    const mockOffer = makeFakeOfferCard();
    const expectedState = {
      favorites: [mockOffer],
      status: RequestStatus.Success,
    };

    const result = favoritesSlice.reducer(
      undefined,
      fetchFavorites.fulfilled([mockOffer], '', undefined),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "RequestStatus" to "Loading" with "fetchFavorites.pending"', () => {
    const expectedState = {
      favorites: [],
      status: RequestStatus.Loading,
    };

    const result = favoritesSlice.reducer(undefined, fetchFavorites.pending('', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "RequestStatus" to "Success" add mockOffer in favorites with "changeFavorites.fulfilled"', () => {
    const mockOffer = makeFakeOfferCard(IS_FAVORITE);
    const inintialState = {
      favorites: [],
      status: RequestStatus.Success,
    };
    const expectedState = {
      favorites: [mockOffer],
      status: RequestStatus.Success,
    };

    const result = favoritesSlice.reducer(
      inintialState,
      changeFavorite.fulfilled(mockOffer, '', {offerId: mockOffer.id, statusFavorite: mockOffer.isFavorite}));

    expect(result).toEqual(expectedState);
  });

  it('should set "RequestStatus" to "Success" remove mockOffer from favorites with "changeFavorites.fulfilled"', () => {
    const mockOffer = makeFakeOfferCard(!IS_FAVORITE);
    const inintialState = {
      favorites: [mockOffer],
      status: RequestStatus.Success,
    };
    const expectedState = {
      favorites: [],
      status: RequestStatus.Success,
    };

    const result = favoritesSlice.reducer(
      inintialState,
      changeFavorite.fulfilled(mockOffer, '', {offerId: mockOffer.id, statusFavorite: mockOffer.isFavorite}));

    expect(result).toEqual(expectedState);
  });
});
