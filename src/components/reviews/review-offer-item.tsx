import { memo } from 'react';
import { Review } from '../../types/review-type';

type ReviewItemProps = {
  review: Review;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {month: 'long', year: 'numeric'});
}

function ReviewOfferItemComp(props: ReviewItemProps): JSX.Element {
  const {review} = props;
  const {comment, date, rating, user} = review;

  const ratingInStar = `${Math.round(rating) / 5 * 100}%`;

  return (
    <li className="reviews__item" data-testid="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatarUrl} width={54} height={54} alt={user.name} />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: ratingInStar}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>{formatDate(date)}</time>
      </div>
    </li>
  );
}

const ReviewOfferItem = memo(ReviewOfferItemComp);

export default ReviewOfferItem;
