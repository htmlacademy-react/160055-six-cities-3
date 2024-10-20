import { useState } from 'react';
import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import OffersCardsList from '../../components/offer-card/offers-cards-list';
import {Offer, Offers} from '../../types/offer-type';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities/cities';

type Props = {
  offers: Offers;
  currentCity: string;
  cities: string[];
}

function IndexPage({cities, offers, currentCity}: Props): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(
    undefined
  );

  const handleOfferHover = (listItemId: string | undefined) => {
    const currentOffer = offers.find((offer) => offer.id === listItemId);

    setSelectedOffer(currentOffer);
  };

  const handleOfferLeave = () => {
    setSelectedOffer(undefined);
  };

  const currentOffers = offers.filter((offer) => offer.city.name === currentCity);

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Главная страница</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={cities} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentOffers.length} places to stay in {currentCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <OffersCardsList offers={currentOffers} onOfferHover={handleOfferHover} onOfferLeave={handleOfferLeave} />
              </div>
            </section>
            <div className="cities__right-section">
              <Map offers={offers} selectedOffer={selectedOffer} currentCity = {currentCity} className='cities__map' />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default IndexPage;
