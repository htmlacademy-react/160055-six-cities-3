import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import {favoriteOffers} from './mocks/favorite-offers';
import { CITIES } from './const';
import { store } from './store';
import { getToken } from './services/token';
import { userActions } from './store/slices/user';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(
  getToken() ? userActions.checkAuth() : userActions.setNoAuth()
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App favoriteOffers={favoriteOffers} cities={CITIES} />
    </Provider>
  </React.StrictMode>
);
