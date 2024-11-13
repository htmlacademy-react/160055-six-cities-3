import {Route, BrowserRouter, Routes} from 'react-router-dom';
import { useEffect } from 'react';
import {HelmetProvider} from 'react-helmet-async';
import IndexPage from '../../pages/index-page/index-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import {AppRoute} from '../../const';
import {FullOffer} from '../../types/offer-type';
import { Reviews } from '../../types/review-type';
import { useActionCreators, useAppSelector } from '../../hooks/store';
import { offersSelectors } from '../../store/slices/offers';
import { getToken } from '../../services/token';
import { userActions } from '../../store/slices/user';
import ProtectedRoute from '../private-route/private-route';

type Props = {
  favoriteOffers: FullOffer[];
  reviews: Reviews;
  cities: string[];
}

function App({favoriteOffers, reviews, cities}: Props): JSX.Element {
  const currentCity = useAppSelector(offersSelectors.city);
  const {checkAuth} = useActionCreators(userActions);
  const token = getToken();
  useEffect(() => {
    if (token) {
      checkAuth();
    }
  }, [token, checkAuth]);

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
            element={<OfferPage reviews={reviews} currentCity={currentCity} />}
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
