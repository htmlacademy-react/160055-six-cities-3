import { createAppAsyncThunk } from '../../hooks/store';
import type { FullOffer } from '../../types/offer-type';
import { Endpoint } from '../../const';
import { Review } from '../../types/review-type';

export const fetchComments = createAppAsyncThunk<Review[], FullOffer['id']>('comments/fetch', async(offerId, {extra: api}) => {
  const response = await api.get<Review[]>(`${Endpoint.Comments}/${offerId}`);
  return response.data;
});

interface PostCommentProps {
  body: {
    comment: string;
    rating: number;
  };
  offerId: FullOffer['id'];
}

export const postComment = createAppAsyncThunk<Review, PostCommentProps>('comments/post', async ({body, offerId}, {extra: api}) => {
  const response = await api.post<Review>(`${Endpoint.Comments}/${offerId}`, body);
  return response.data;
});

export const commentsThunk = {fetchComments, postComment};
