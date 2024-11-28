import { useState, MouseEvent, useEffect, useCallback } from 'react';
import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities/cities';
import { useActionCreators, useAppSelector } from '../../hooks/store';
import { offersActions, offersSelectors } from '../../store/slices/offers';
import { RequestStatus, SortOption, classOffers } from '../../const';
import Sort from '../../components/sort/sort';
import OfferCard from '../../components/offer-card/offer-card';
import MainPageEmpty from '../../components/main-page-empty/main-page-empty';

type Props = {
  cities: string[];
}

function IndexPage({cities}: Props): JSX.Element {
  const offers = useAppSelector(offersSelectors.offers);
  const currentCity = useAppSelector(offersSelectors.city);
  const status = useAppSelector(offersSelectors.offersStatus);
  const {setActiveId, fetchAllOffers} = useActionCreators(offersActions);

  const isEmpty = offers.length === 0;

  useEffect(() => {
    if (status === RequestStatus.Idle) {
      fetchAllOffers();
    }
  }, [fetchAllOffers, status]);

  const currentOffers = offers.filter((offer) => offer.city.name === currentCity);

  const handleOfferHover = useCallback((evt: MouseEvent<HTMLElement>) => {
    const target = evt.currentTarget as HTMLElement;
    const id = target.dataset.id;
    setActiveId(id);
  }, [setActiveId]);

  const handleOfferLeave = useCallback(() => {
    setActiveId(undefined);
  }, [setActiveId]);

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
      <main className={isEmpty ? 'page__main page__main--index page__main--index-empty' : 'page__main page__main--index'}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList cities={cities} />
          </section>
        </div>
        <div className="cities">
          {isEmpty ?
            <MainPageEmpty currentCity = {currentCity} />
            :
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{currentOffers.length} place{currentOffers.length > 1 && 's'} to stay in {currentCity}</b>
                <Sort current={activeSort} setter={setActiveSort} />
                <div className="cities__places-list places__list tabs__content">
                  {sortedOffers.map((offer) => (<OfferCard {...offer} classAdd={classOffers.Cities} onMouseEnter={handleOfferHover} onMouseLeave={handleOfferLeave} key={offer.id} />))}
                </div>
              </section>
              <div className="cities__right-section">
                <Map offers={offers} currentCity = {currentCity} className='cities__map' />
              </div>
            </div>}
        </div>
      </main>
    </div>
  );
}
export default IndexPage;
