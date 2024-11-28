import {Helmet} from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useAppSelector } from '../../hooks/store';
import { favoritesSelector } from '../../store/slices/favorites';
import FavoritesEmpty from '../../components/favorites/favorites-empty';
import Favorites from '../../components/favorites/favorites';

function FavoritesPage(): JSX.Element {
  const offers = useAppSelector(favoritesSelector.favorites);
  const favoritesNotEmpty = offers.length > 0;

  return (
    <div className={favoritesNotEmpty ? 'page' : 'page page--favorites-empty'}>
      <Helmet>
        <title>Избранное</title>
      </Helmet>
      <Header />
      {favoritesNotEmpty ? (<Favorites offers={offers} />) : (<FavoritesEmpty />)}
      <Footer />
    </div>
  );
}
export default FavoritesPage;
