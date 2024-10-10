import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import {Link} from 'react-router-dom';
import {Offers} from '../../types/offer-type';

type FavoriteProps = {
  favoriteOffers: Offers;
}

function FavoritesPage(props: FavoriteProps): JSX.Element {
  const {favoriteOffers} = props;
  const favoriteCities: string[] = [];

  favoriteOffers.forEach((item)=>{
    favoriteCities.push(item.city.name);
  });

  return (
    <div className="page">
      <Helmet>
        <title>Избранное</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favoriteCities.map((city)=>(
                <li key={city} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to="#">
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    { favoriteOffers.map((item)=> (
                      item.city.name === city ?
                        <article key={item.id} className="favorites__card place-card">
                          {item.isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ''}
                          <div className="favorites__image-wrapper place-card__image-wrapper">
                            <Link to="#">
                              <img
                                className="place-card__image"
                                src={item.images[0]}
                                width={150}
                                height={110}
                                alt={item.type + item.description + item.id}
                              />
                            </Link>
                          </div>
                          <div className="favorites__card-info place-card__info">
                            <div className="place-card__price-wrapper">
                              <div className="place-card__price">
                                <b className="place-card__price-value">€{item.price}</b>
                                <span className="place-card__price-text">
                            /&nbsp;night
                                </span>
                              </div>
                              <button
                                className="place-card__bookmark-button place-card__bookmark-button--active button"
                                type="button"
                              >
                                <svg
                                  className="place-card__bookmark-icon"
                                  width={18}
                                  height={19}
                                >
                                  <use xlinkHref="#icon-bookmark" />
                                </svg>
                                <span className="visually-hidden">In bookmarks</span>
                              </button>
                            </div>
                            <div className="place-card__rating rating">
                              <div className="place-card__stars rating__stars">
                                <span style={{ width: `${item.rating / 5 * 100}%` }} />
                                <span className="visually-hidden">Rating</span>
                              </div>
                            </div>
                            <h2 className="place-card__name">
                              <Link to="#"> {item.title}</Link>
                            </h2>
                            <p className="place-card__type">{item.type}</p>
                          </div>
                        </article>
                        : null
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default FavoritesPage;
