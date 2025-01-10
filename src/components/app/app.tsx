import {Route, Routes, Navigate} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import IndexPage from '../../pages/index-page/index-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import {AppRoute, CITIES_FULL} from '../../const';
import ProtectedRoute from '../protected-route/protected-route';


function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Navigate to={`/${CITIES_FULL[0].slug}`} />}
        />
        {CITIES_FULL.map((city) => (
          <Route
            key={city.name}
            path={`/${city.slug}`}
            element={
              <IndexPage currentCity={city.name} />
            }
          />
        ))}
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
              <FavoritesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={<OfferPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </HelmetProvider>
  );
}
export default App;
