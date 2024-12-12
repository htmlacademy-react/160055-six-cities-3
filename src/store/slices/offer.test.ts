import { RequestStatus } from '../../const';
import { fetchNearBy, fetchOffer } from '../thunks/offers';
import { offerSlice } from './offer';
import { makeFakeFullOfferCard, makeFakeOfferCard } from '../../utils/mocks';

describe('offerSlice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      info: null,
      nearby: [],
      status: RequestStatus.Idle,
    };

    const result = offerSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      info: null,
      nearby: [],
      status: RequestStatus.Idle,
    };

    const result = offerSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "RequestStatus" to "Loading" with "fetchOffer.pending"', () => {
    const expectedState = {
      info: null,
      nearby: [],
      status: RequestStatus.Loading,
    };

    const result = offerSlice.reducer(undefined, fetchOffer.pending('',''));

    expect(result).toEqual(expectedState);
  });

  it('should set "RequestStatus" to "Failed" with "fetchOffer.rejected"', () => {
    const expectedState = {
      info: null,
      nearby: [],
      status: RequestStatus.Failed,
    };

    const result = offerSlice.reducer(undefined, fetchOffer.rejected(null,'', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "RequestStatus" to "Success" fetch mockOffer with "fetchOffer.fulfilled"', () => {
    const mockOffer = makeFakeFullOfferCard();
    const inintialState = {
      info: null,
      nearby: [],
      status: RequestStatus.Idle,
    };
    const expectedState = {
      info: mockOffer,
      nearby: [],
      status: RequestStatus.Success,
    };

    const result = offerSlice.reducer(
      inintialState,
      fetchOffer.fulfilled(mockOffer, '', '')
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "RequestStatus" to "Success" fetch mockNearbyOffer with "fetchNearby.fulfilled"', () => {
    const mockNearbyOffer = makeFakeOfferCard();
    const inintialState = {
      info: null,
      nearby: [],
      status: RequestStatus.Success,
    };
    const expectedState = {
      info: null,
      nearby: [mockNearbyOffer],
      status: RequestStatus.Success,
    };

    const result = offerSlice.reducer(
      inintialState,
      fetchNearBy.fulfilled([mockNearbyOffer], '', '')
    );

    expect(result).toEqual(expectedState);
  });
});
