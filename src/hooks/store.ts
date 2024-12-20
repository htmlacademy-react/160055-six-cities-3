import { ActionCreatorsMapObject, bindActionCreators, AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { AxiosInstance } from 'axios';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { State, AppDispatch } from '../types/store';

export const useAppDispatch = useDispatch<AppDispatch>;

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const useActionCreators = <Actions extends ActionCreatorsMapObject>(actions: Actions): BoundActions<Actions> => {
  const dispatch = useAppDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo (() => bindActionCreators(actions, dispatch), []);
};

type BoundActions<Actions extends ActionCreatorsMapObject> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any> ? BoundAsyncThunk<Actions[key]> : Actions[key];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BoundAsyncThunk<Thunk extends AsyncThunk<any, any, any>> = (...args: Parameters<Thunk>) => ReturnType<ReturnType<Thunk>>;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: State;
  dispatch: AppDispatch;
  extra: AxiosInstance;
}>();
