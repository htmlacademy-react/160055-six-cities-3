import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import OffersCardIndex from '../../components/offer-card/offers-card-index';
import {CITIES} from '../../mocks/offers';
import {Offers, City} from '../../components/offer-card/offer-type';
import Map from '../../components/map/map';

type Props = {
  city: City;
  offers: Offers;
}

function IndexPage({offers, city}: Props): JSX.Element {
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
            <ul className="locations__list tabs__list">
              {CITIES.map((cityName) => (
                <li className="locations__item" key={cityName}>
                  <a className="locations__item-link tabs__item" href="#">
                    <span>{cityName}</span>
                  </a>
                </li>))}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
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
                <OffersCardIndex offers={offers} />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={city} offers={offers} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default IndexPage;
