import ReviewOfferItem from './review-offer-item';
import { render, screen } from '@testing-library/react';
import { Review } from '../../types/review-type';
import {makeFakeReview} from '../../utils/mocks.ts';

describe('Component: ReviewOfferItem', () => {
  const review: Review = makeFakeReview();

  it('should render correctly', () => {
    const preparedComponent = <ReviewOfferItem review={review} />;

    render(preparedComponent);

    expect(screen.getByTestId('reviews__item')).toBeInTheDocument();
  });
});
