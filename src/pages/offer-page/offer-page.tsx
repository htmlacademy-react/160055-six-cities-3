import {Helmet} from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import NotFoundPage from '../not-found-page/not-found-page';
import Header from '../../components/header/header';
import ReviewOfferForm from '../../components/reviews/review-offer-form';
import {Offer} from '../../types/offer-type';
import {offers} from '../../mocks/offers';
import ReviewOfferList from '../../components/reviews/review-offer-list';
import { Reviews } from '../../types/review-type';
import Map from '../../components/map/map';
import {City} from '../../types/offer-type';
import OffersCardsIndex from '../../components/offer-card/offers-card-index';

type Props = {
  reviews: Reviews;
  city: City;
}

function OfferPage({reviews, city}: Props): JSX.Element {
  const {id} = useParams();
  const currentOffer: Offer | undefined = offers.find((offer: Offer) => offer.id === id);
  const nearOffers = offers.slice(0,3);
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(
    undefined
  );

  const handleOfferHover = (listItemId: string | undefined) => {
    const currentOtherOffer = offers.find((offer) => offer.id === listItemId);

    setSelectedOffer(currentOtherOffer);
  };

  const handleOfferLeave = () => {
    setSelectedOffer(undefined);
  };

  if (!currentOffer) {
    return <NotFoundPage />;
  }
  const ratingInStar = `${currentOffer.rating / 5 * 100}%`;

  return (
    <div className="page">
      <Helmet>
        <title>Страница предложения {id}</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {
                currentOffer?.images.map((url, index) => (
                  <div key={url} className="offer__image-wrapper">
                    <img className="offer__image" src={url} alt={url + index}/>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium ? <div className="offer__mark"><span>Premium</span></div> : ''}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {currentOffer.title}
                </h1>
                <button className={currentOffer.isFavorite ? 'offer__bookmark-button button--active button' : 'offer__bookmark-button button'} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: ratingInStar}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {
                    currentOffer.goods.map((good) => (
                      <li key={good} className="offer__inside-item">
                        {good}
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="offer__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    Angelina
                  </span>
                  <span className="offer__user-status">
                    Pro
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.
                  </p>
                  <p className="offer__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ul className="reviews__list">
                  <ReviewOfferList reviews={reviews} />
                </ul>
                <ReviewOfferForm />
              </section>
            </div>
          </div>
          <Map city={city} offers={nearOffers} selectedOffer={selectedOffer} className='offer__map' />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <OffersCardsIndex offers={nearOffers} onOfferHover={handleOfferHover} onOfferLeave={handleOfferLeave} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
export default OfferPage;
