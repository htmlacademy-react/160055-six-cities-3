import ReviewOfferItem from './review-offer-item';
import { Review } from './review-type';

type ReviewProps = {
  reviews: Review[];
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
