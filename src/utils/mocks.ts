import { Action } from '@reduxjs/toolkit';
import { ThunkDispatch } from '@reduxjs/toolkit';
import {database, name, datatype, image, internet} from 'faker';
import { Offer, FullOffer } from '../types/offer-type';
import { Review, User } from '../types/review-type';
import { PostCommentProps } from '../store/thunks/comments';
import { State } from '../types/store';
import { createAPI } from '../services/api';
import { offersSlice } from '../store/slices/offers';
import { offerSlice } from '../store/slices/offer';
import { reviewSlice } from '../store/slices/reviews';
import { favoritesSlice } from '../store/slices/favorites';
import { userSlice } from '../store/slices/user';
import { RequestStatus } from '../const';
import { AuthorizationStatus } from '../const';

export const makeFakeOfferCard = (isFavorite = false): Offer =>({
  id: database.column(),
  title:  name.title(),
  type: name.title(),
  price: datatype.number(),
  city: {
    name: 'Hamburg',
    location: {
      latitude: datatype.number(),
      longitude: datatype.number(),
      zoom: datatype.number()
    }
  },
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number()
  },
  isFavorite: isFavorite,
  isPremium: datatype.boolean(),
  rating: datatype.number(),
  previewImage: image.imageUrl(),
});

export const makeFakeFullOfferCard = (isFavorite = false): FullOffer =>({
  id: database.column(),
  title:  name.title(),
  type: name.title(),
  price: datatype.number(),
  city: {
    name: 'Hamburg',
    location: {
      latitude: datatype.number(),
      longitude: datatype.number(),
      zoom: datatype.number()
    }
  },
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number()
  },
  isFavorite: isFavorite,
  isPremium: datatype.boolean(),
  rating: datatype.number(),
  previewImage: image.imageUrl(),
  goods: [datatype.string()],
  bedrooms: datatype.number(),
  maxAdults: datatype.number(),
  description: datatype.string(),
  images: [image.imageUrl()],
  host: {
    name: name.title(),
    avatarUrl: image.imageUrl(),
    isPro: datatype.boolean(),
    token: datatype.string(),
    email: internet.email(),
  },
});

export const makeFakeReview = (): Review =>({
  id: datatype.string(),
  date: datatype.string(),
  user: {
    name: name.title(),
    avatarUrl: image.imageUrl(),
    isPro: datatype.boolean(),
    token: datatype.string(),
    email: internet.email(),
  },
  comment: datatype.string(),
  rating: datatype.number(),
});

export const makeFakeComment = (): PostCommentProps =>({
  body: {
    comment: datatype.string(),
    rating: datatype.number(),
  },
  offerId: datatype.string(),
});

export const makeFakeUser = (): User =>({
  name: name.title(),
  avatarUrl: image.imageUrl(),
  isPro: datatype.boolean(),
  token: datatype.string(),
  email: internet.email(),
});

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  [offersSlice.name]: { offers:[], status: RequestStatus.Idle, activeId: '' },
  [offerSlice.name]: {info: makeFakeFullOfferCard(false), status: RequestStatus.Idle, nearby:[]},
  [reviewSlice.name]: {items:[], status: RequestStatus.Idle},
  [favoritesSlice.name]: {favorites:[], status: RequestStatus.Idle},
  [userSlice.name]: {info:{
    'name' : '',
    'email' : '',
    'avatarUrl' : '',
    'isPro' : false,
    'token' : '',
  }, status:AuthorizationStatus.Unknown, requestStatus:RequestStatus.Idle},

  ...initialState ?? {},
});
