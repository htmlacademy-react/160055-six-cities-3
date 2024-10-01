import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/main/app';
import {offers} from './mocks/offers';
import {favoriteOffers} from './mocks/favorite-offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={offers} favoriteOffers={favoriteOffers} />
  </React.StrictMode>
);
