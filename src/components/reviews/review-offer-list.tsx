import { memo } from 'react';
import ReviewOfferItem from './review-offer-item';
import { Reviews } from '../../types/review-type';

const REVIEWS_LIMIT = 10;

type ReviewProps = {
  reviews: Reviews;
}

function ReviewOfferListComp(props: ReviewProps): JSX.Element {
  const {reviews} = props;
  return (
    <ul className="reviews__list" data-testid="reviews__list">
      {
        reviews.slice(0, REVIEWS_LIMIT).map((review) => (
          <ReviewOfferItem key={review.id} review={review} />
        ))
      }
    </ul>
  );
}

const ReviewOfferList = memo(ReviewOfferListComp);

export default ReviewOfferList;
