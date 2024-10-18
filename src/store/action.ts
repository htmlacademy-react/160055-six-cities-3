import { createAction } from '@reduxjs/toolkit';

const Action = {
  SET_CITY:'offers/setCity',
};

export const setCity = createAction(Action.SET_CITY, (value:string) => ({
  payload:value
}));
