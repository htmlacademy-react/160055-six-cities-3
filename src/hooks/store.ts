import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { State, AppDispatch } from '../types/store';

export const useAppDispatch = useDispatch<AppDispatch>;

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export const useActionCreators = <Actions extends ActionCreatorsMapObject>(actions: Actions) => {
  const dispatch = useAppDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo (() => bindActionCreators(actions, dispatch), []);
};
