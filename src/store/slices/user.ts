import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RequestStatus, AuthorizationStatus } from '../../const';
import { checkAuth, login, logout } from '../thunks/auth';
import { User } from '../../types/user-type';

interface UserState {
  info: User | null;
  requestStatus: RequestStatus;
  status: AuthorizationStatus;
}

const initialState: UserState = {
  info: null,
  requestStatus: RequestStatus.Idle,
  status: AuthorizationStatus.Unknown,
};

function processSuccess(state: UserState, action: PayloadAction<User>) {
  state.info = action.payload;
  state.status = AuthorizationStatus.Auth;
  state.requestStatus = RequestStatus.Success;
}

function processFailed(state: UserState) {
  state.status = AuthorizationStatus.NoAuth;
  state.requestStatus = RequestStatus.Failed;
}

function processLoading(state: UserState) {
  state.requestStatus = RequestStatus.Loading;
}

export const userSlice = createSlice({
  extraReducers(builder) {
    builder.addCase(checkAuth.fulfilled, processSuccess);
    builder.addCase(checkAuth.rejected, processFailed);
    builder.addCase(checkAuth.pending, processLoading);
    builder.addCase(login.fulfilled, processSuccess);
    builder.addCase(login.rejected, processFailed);
    builder.addCase(login.pending, processLoading);
    builder.addCase(logout.fulfilled, (state) => {
      state.info = null;
      state.status = AuthorizationStatus.NoAuth;
    });
  },
  initialState,
  name: 'user',
  reducers: {
    setAuthorization(state, action: PayloadAction<AuthorizationStatus>) {
      state.status = action.payload;
    },
    setNoAuth(state) {
      state.status = AuthorizationStatus.NoAuth;
    }
  },
  selectors: {
    userRequestStatus: (state: UserState) => state.requestStatus,
    userStatus: (state: UserState) => state.status,
    user: (state: UserState) => state.info,
  },
});

export const userActions = {...userSlice.actions, checkAuth, login, logout};
export const userSelectors = userSlice.selectors;
