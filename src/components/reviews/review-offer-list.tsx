import ReviewOfferItem from './review-offer-item';
import { Reviews } from '../../types/review-type';

type ReviewProps = {
  reviews: Reviews;
}

function ReviewOfferList(props: ReviewProps): JSX.Element {
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
export default ReviewOfferList;
