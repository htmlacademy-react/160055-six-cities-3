import {HTMLAttributes, memo} from 'react';
import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer-type';
import {AppRoute} from '../../const';
import BookmarkButton from '../bookmark-button/bookmark-button';


type HTMLProps = Pick<HTMLAttributes<HTMLElement>, 'onMouseEnter' | 'onMouseLeave'>;
type OfferProps = Offer & HTMLProps;

function OfferCardComp(props: OfferProps): JSX.Element {
  const {classAdd, id, type, title, price, isPremium, isFavorite, rating, previewImage, onMouseEnter, onMouseLeave} = props;

  const ratingInStar = `${rating / 5 * 100}%`;

  return (
    <article
      className={`${classAdd}__card place-card`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-id={id}
    >
      {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ''}
      <div className={`${classAdd}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={classAdd === 'cities' || classAdd === 'near-places' ? 260 : 150}
            height={classAdd === 'cities' || classAdd === 'near-places' ? 200 : 110}
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
          <BookmarkButton offerId={id} isFavorite={isFavorite} />
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

const OfferCard = memo(OfferCardComp);

export default OfferCard;
