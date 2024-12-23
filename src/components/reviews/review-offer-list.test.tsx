import ReviewOfferList from './review-offer-list.tsx';
import { render, screen } from '@testing-library/react';
import { Reviews } from '../../types/review-type';
import {makeFakeReview} from '../../utils/mocks.ts';

describe('Component: ReviewOfferItem', () => {
  const reviews: Reviews = [makeFakeReview()];

  it('should render correctly', () => {
    const preparedComponent = <ReviewOfferList reviews={reviews} />;

    render(preparedComponent);

    expect(screen.getByTestId('reviews__list')).toBeInTheDocument();
  });
});
