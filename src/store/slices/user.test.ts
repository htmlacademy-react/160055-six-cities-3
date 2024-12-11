import { RequestStatus } from '../../const';
import { AuthorizationStatus } from '../../const';
import { makeFakeUser } from '../../utils/mocks';
import { checkAuth, login, logout } from '../thunks/auth';
import { userSlice } from './user';

describe('userSlice', () => {

  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      info: null,
      requestStatus: RequestStatus.Idle,
      status: AuthorizationStatus.Unknown,
    };

    const result = userSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      info: null,
      requestStatus: RequestStatus.Idle,
      status: AuthorizationStatus.Unknown,
    };

    const result = userSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Success" to user with "checkAuth.fulfilled"', () => {
    const mockUser = makeFakeUser();
    const initialState = {
      info: null,
      requestStatus: RequestStatus.Idle,
      status: AuthorizationStatus.Unknown,
    };
    const expectedState = {
      info: mockUser,
      requestStatus: RequestStatus.Success,
      status: AuthorizationStatus.Auth,
    };

    const result = userSlice.reducer(
      initialState,
      checkAuth.fulfilled(mockUser, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "Loading" to user with "checkAuth.pending"', () => {
    const initialState = {
      info: null,
      requestStatus: RequestStatus.Idle,
      status: AuthorizationStatus.Unknown,
    };
    const expectedState = {
      info: null,
      requestStatus: RequestStatus.Loading,
      status: AuthorizationStatus.Unknown,
    };

    const result = userSlice.reducer(
      initialState,
      checkAuth.pending('', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "Failed" to user with "checkAuth.rejected"', () => {
    const initialState = {
      info: null,
      requestStatus: RequestStatus.Idle,
      status: AuthorizationStatus.Unknown,
    };
    const expectedState = {
      info: null,
      requestStatus: RequestStatus.Failed,
      status: AuthorizationStatus.NoAuth,
    };

    const result = userSlice.reducer(
      initialState,
      checkAuth.rejected(null,'', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "Success" to user with "login.fulfilled"', () => {
    const mockUser = makeFakeUser();
    const initialState = {
      info: null,
      requestStatus: RequestStatus.Idle,
      status: AuthorizationStatus.Unknown,
    };
    const expectedState = {
      info: mockUser,
      requestStatus: RequestStatus.Success,
      status: AuthorizationStatus.Auth,
    };

    const result = userSlice.reducer(
      initialState,
      login.fulfilled(mockUser, '', {email: mockUser.email, password: mockUser.token}));

    expect(result).toEqual(expectedState);
  });

  it('should set "Success" to user with "login.pending"', () => {
    const mockUser = makeFakeUser();
    const initialState = {
      info: null,
      requestStatus: RequestStatus.Idle,
      status: AuthorizationStatus.Unknown,
    };
    const expectedState = {
      info: null,
      requestStatus: RequestStatus.Loading,
      status: AuthorizationStatus.Unknown,
    };

    const result = userSlice.reducer(
      initialState,
      login.pending('', {email: mockUser.email, password: mockUser.token}));

    expect(result).toEqual(expectedState);
  });

  it('should set "Success" to user with "login.rejected"', () => {
    const mockUser = makeFakeUser();
    const initialState = {
      info: null,
      requestStatus: RequestStatus.Idle,
      status: AuthorizationStatus.Unknown,
    };
    const expectedState = {
      info: null,
      requestStatus: RequestStatus.Failed,
      status: AuthorizationStatus.NoAuth,
    };

    const result = userSlice.reducer(
      initialState,
      login.rejected(null,'', {email: mockUser.email, password: mockUser.token}));

    expect(result).toEqual(expectedState);
  });

  it('should set "Success" to user logout with "logout.fulfilled"', () => {
    const mockUser = makeFakeUser();
    const initialState = {
      info: mockUser,
      requestStatus: RequestStatus.Success,
      status: AuthorizationStatus.Auth,
    };
    const expectedState = {
      info: null,
      requestStatus: RequestStatus.Success,
      status: AuthorizationStatus.NoAuth,
    };

    const result = userSlice.reducer(
      initialState,
      logout.fulfilled(mockUser, '', undefined));

    expect(result).toEqual(expectedState);
  });
});
