import { memo } from 'react';
import ReviewOfferItem from './review-offer-item';
import { Reviews } from '../../types/review-type';

type ReviewProps = {
  reviews: Reviews;
}

function ReviewOfferListComp(props: ReviewProps): JSX.Element {
  const {reviews} = props;
  return (
    <>
      {
        reviews.map((review) => (
          <ReviewOfferItem key={review.id} review={review} />
        ))
      }
    </>
  );
}

const ReviewOfferList = memo(ReviewOfferListComp);

export default ReviewOfferList;
