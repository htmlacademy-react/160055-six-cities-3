import { Fragment } from 'react';

const STARS = [
  { value: 5, title: 'perfect' },
  { value: 4, title: 'good' },
  { value: 3, title: 'not bad' },
  { value: 2, title: 'badly' },
  { value: 1, title: 'terribly' },
];

type FormRatingProps = {
  isDisabled?: boolean;
};

function FormRating({ isDisabled = false }: FormRatingProps) {
  return (
    <div className="reviews__rating-form form__rating">
      {STARS.map(({ value, title }) => (
        <Fragment key={`star-${title}`}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            defaultValue={value}
            id={`${value}-stars`}
            type="radio"
            disabled={isDisabled}
          />
          <label
            htmlFor={`${value}-stars`}
            className="reviews__rating-label form__rating-label"
            title={title}
          >
            <svg className="form__star-image" width={37} height={33}>
              <use xlinkHref="#icon-star" />
            </svg>
          </label>
        </Fragment>
      ))}
    </div>
  );
}

export default FormRating;
