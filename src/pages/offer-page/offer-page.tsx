import {Helmet} from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import NotFoundPage from '../not-found-page/not-found-page';
import Header from '../../components/header/header';
import ReviewOfferForm from '../../components/reviews/review-offer-form';
import ReviewOfferList from '../../components/reviews/review-offer-list';
import Map from '../../components/map/map';
import OfferCard from '../../components/offer-card/offer-card';
import { useAppSelector, useActionCreators} from '../../hooks/store';
import { offersActions } from '../../store/slices/offers';
import { RequestStatus, classOffers } from '../../const';
import { offerActions, offerSelector } from '../../store/slices/offer';
import { reviewsActions, reviewsSelectors } from '../../store/slices/reviews';
import { useAuth } from '../../hooks/use-auth';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';
import classNames from 'classnames';

const IMAGES_LIMIT = 6;

const allActions = {
  ...offerActions,
  ...reviewsActions,
  ...offersActions
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function OfferPage(): JSX.Element {

  const offerPage = useAppSelector(offerSelector.offer);
  const status = useAppSelector(offerSelector.offerStatus);
  const nearbyOffers = useAppSelector(offerSelector.nearbyOffers).slice(0,3);
  const reviews = useAppSelector(reviewsSelectors.reviews);
  const {fetchNearBy, fetchOffer, fetchComments, setActiveId} = useActionCreators(allActions);

  const {id} = useParams() as {id: string};
  const isAuthorized = useAuth();

  useEffect(() => {
    setActiveId(id);
    if(id) {
      fetchOffer(id);
      fetchNearBy(id);
      fetchComments(id);
    }
  }, [fetchOffer, fetchNearBy, fetchComments, id, setActiveId]);

  if (status === RequestStatus.Loading) {
    return <div>Loading...</div>;
  }

  if (status === RequestStatus.Failed || !offerPage) {
    return <NotFoundPage />;
  }

  const {bedrooms, description, goods, host, images, isFavorite, isPremium, maxAdults, price, rating, title, type} = offerPage;

  const {avatarUrl, isPro, name} = host;

  const nearOffersPlusCurrent = [offerPage, ...nearbyOffers];

  const ratingInStar = `${(Math.round(rating) * 100 / 5).toString()}%`;

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
              {images.slice(0, IMAGES_LIMIT).map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img
                    className="offer__image"
                    src={image}
                    alt={image}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium ? <div className="offer__mark"><span>Premium</span></div> : ''}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <BookmarkButton offerId={id} isFavorite={isFavorite} width={31} height={33} classPath={'offer'} />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: ratingInStar}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {capitalizeFirstLetter(type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms > 1 ? `${bedrooms} Bedrooms` : `${bedrooms} Bedroom`}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {maxAdults > 1 ? `${maxAdults} adults` : `${maxAdults} adult`}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((item) => (
                    <li className="offer__inside-item" key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={classNames('offer__avatar-wrapper', 'user__avatar-wrapper', {
                    'offer__avatar-wrapper--pro' : isPro
                  })}
                  >
                    <img className="offer__avatar user__avatar" src={avatarUrl} width={74} height={74} alt={name} />
                  </div>
                  <span className="offer__user-name">
                    {name}
                  </span>
                  {isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewOfferList reviews={reviews} />
                {isAuthorized ? <ReviewOfferForm offerId={id} /> : <div />}
              </section>
            </div>
          </div>
          <Map offers={nearOffersPlusCurrent} currentCity={offerPage.city.name} className='offer__map' />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearbyOffers.map((offer) => (<OfferCard {...offer} classAdd={classOffers.NearPlaces} key={offer.id} />))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
export default OfferPage;
