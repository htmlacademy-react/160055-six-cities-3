export const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const SORT_OPTIONS = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first'
] satisfies Record<SortOption, string>;

export const Endpoint = {
  Comments: '/comments',
  Favorite: '/favorite',
  Login: '/login',
  Logout: '/logout',
  Offers: '/offers',
};

export const enum SortOption {
	Popular,
	PriceLowToHigh,
	PriceHighToLow,
	TopRatedFirst
}

export const enum RequestStatus {
	Idle,
	Loading,
	Success,
	Failed
}

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
