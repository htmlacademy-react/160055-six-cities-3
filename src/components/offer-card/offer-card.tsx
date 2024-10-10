import {Offer} from '../../types/offer-type';
import {useState} from 'react';
import {MouseEvent} from 'react';
import {Nullable} from 'vitest';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

type OfferProp = {
  offer: Offer;
  onOfferHover: (listItemId: string | undefined) => void;
  onOfferLeave: () => void;
}

function OfferCard(props: OfferProp): JSX.Element {
  const {offer, onOfferHover, onOfferLeave} = props;
  const {id, type, title, price, isPremium, isFavorite, rating, images} = offer;

  const ratingInStar = `${rating / 5 * 100}%`;
  const firstImage = images[0];

  const [, setActiveOffer] = useState<Nullable<Offer>>(null);

  const handleOfferHover = (event: MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    setActiveOffer(offer || null);
    onOfferHover(event.currentTarget.dataset.id);
  };

  const handleOfferLeave = () => {
    setActiveOffer(null);
    onOfferLeave();
  };

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={handleOfferHover}
      onMouseLeave={handleOfferLeave}
      data-id={id}
    >
      {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ''}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={firstImage}
            width={260}
            height={200}
            alt={id + title + type}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratingInStar}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
export default OfferCard;
