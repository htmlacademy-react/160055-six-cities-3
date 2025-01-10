import { createSlice, createSelector } from '@reduxjs/toolkit';

import { RequestStatus } from '../../const';
import { fetchComments, postComment, commentsThunk } from '../thunks/comments';
import { Review } from '../../types/review-type';

interface ReviewState {
  items: Review[];
  status: RequestStatus;
}

const initialState: ReviewState = {
  items: [],
  status: RequestStatus.Idle,
};

export const reviewSlice = createSlice({
  extraReducers(builder) {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.items = action.payload.sort((a,b)=> new Date(b.date).getTime() - new Date(a.date).getTime());
        state.status = RequestStatus.Success;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(fetchComments.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(postComment.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(postComment.pending, (state) => {
        state.status = RequestStatus.Loading;
      });
  },
  initialState,
  name: 'reviews',
  reducers: {},
  selectors: {
    reviews: (state: ReviewState) => state.items,
    reviewStatus: (state: ReviewState) => state.status,
  },
});

export const reviewsSelectors = {
  ...reviewSlice.selectors,
  lastReview: createSelector(reviewSlice.selectors.reviews, (reviews) => reviews)
};

export const reviewsActions = {...reviewSlice.actions, ...commentsThunk};
