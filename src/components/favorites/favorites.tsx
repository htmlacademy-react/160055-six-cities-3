import { MouseEvent, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer-type';
import { CITIES_FULL, classOffers } from '../../const';
import OfferCard from '../offer-card/offer-card';
import { useActionCreators } from '../../hooks/store';
import { offersActions } from '../../store/slices/offers';

type FavoritesProps = {
  offers: Offer[];
}

function FavoritesComp({offers}: FavoritesProps): JSX.Element {
  const {setActiveId} = useActionCreators(offersActions);
  const handleOfferHover = useCallback((evt: MouseEvent<HTMLElement>) => {
    const target = evt.currentTarget as HTMLElement;
    const id = target.dataset.id;
    setActiveId(id);
  }, [setActiveId]);

  const handleOfferLeave = useCallback(() => {
    setActiveId(undefined);
  }, [setActiveId]);

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {CITIES_FULL.map((city) => {
              const offersByCity = offers.filter((offer) => offer.city.name === city.name);
              if (offersByCity.length) {
                return (
                  <li className="favorites__locations-items" key={city.slug}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to={`/${city.slug}`}>
                          <span>{city.name}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {offersByCity.map((offer) => (
                        <OfferCard {...offer} classAdd={classOffers.Favorites} onMouseEnter={handleOfferHover} onMouseLeave={handleOfferLeave} key={offer.id} />
                      ))}
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </section>
      </div>
    </main>
  );
}

const Favorites = memo(FavoritesComp);

export default Favorites;
