import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import IndexPage from '../../pages/index-page/index-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import {AppRoute} from '../../const';
import {FullOffer} from '../../types/offer-type';
import { useAppSelector } from '../../hooks/store';
import { offersSelectors } from '../../store/slices/offers';
import ProtectedRoute from '../protected-route/protected-route';

type Props = {
  favoriteOffers: FullOffer[];
  cities: string[];
}

function App({favoriteOffers, cities}: Props): JSX.Element {
  const currentCity = useAppSelector(offersSelectors.city);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<IndexPage cities={cities} />}
          />
          <Route
            path={AppRoute.Login}
            element={
              <ProtectedRoute onlyUnAuth>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <ProtectedRoute>
                <FavoritesPage favoriteOffers={favoriteOffers} />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${AppRoute.Offer}/:id`}
            element={<OfferPage currentCity={currentCity} />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
export default App;