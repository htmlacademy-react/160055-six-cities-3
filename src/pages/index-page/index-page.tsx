import { useState } from 'react';
import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import OffersCardsList from '../../components/offer-card/offers-cards-list';
import {Offer} from '../../types/offer-type';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities/cities';
import { useAppSelector } from '../../hooks/store';
import { offersSelectors } from '../../store/slices/offers';
import { RequestStatus, SortOption } from '../../const';
import { Sort } from '../../components/sort/sort';

type Props = {
  cities: string[];
}

function IndexPage({cities}: Props): JSX.Element {
  const offers = useAppSelector(offersSelectors.offers);
  const currentCity = useAppSelector(offersSelectors.city);
  const status = useAppSelector(offersSelectors.offersStatus);
  const currentOffers = offers.filter((offer) => offer.city.name === currentCity);

  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(
    undefined
  );

  const handleOfferHover = (listItemId: string | undefined) => {
    const currentOffer = currentOffers.find((offer) => offer.id === listItemId);

    setSelectedOffer(currentOffer);
  };

  const handleOfferLeave = () => {
    setSelectedOffer(undefined);
  };

  const [activeSort, setActiveSort] = useState(SortOption.Popular);

  let sortedOffers = currentOffers;

  if(status === RequestStatus.Loading) {
    return <div>Loading...</div>;
  }

  switch(activeSort) {
    case SortOption.TopRatedFirst:
      sortedOffers = currentOffers.toSorted((a,b) => b.rating - a.rating);
      break;
    case SortOption.PriceHighToLow:
      sortedOffers = currentOffers.toSorted((a,b) => b.price - a.price);
      break;
    case SortOption.PriceLowToHigh:
      sortedOffers = currentOffers.toSorted((a,b) => a.price - b.price);
      break;
    default:
      sortedOffers = currentOffers;
      break;
  }

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
              <b className="places__found">{currentOffers.length} place{currentOffers.length > 1 && 's'} to stay in {currentCity}</b>
              <Sort current={activeSort} setter={setActiveSort} />
              <div className="cities__places-list places__list tabs__content">
                <OffersCardsList offers={sortedOffers} onOfferHover={handleOfferHover} onOfferLeave={handleOfferLeave} />
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
