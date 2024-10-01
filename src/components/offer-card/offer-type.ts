export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  images: string[];
  description: string;
  bedrooms: number;
  maxAdults: number;
  goods: string[];
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  // location: {
  //   latitude: number;
  //   longitude: number;
  //   zoom: number;
  // };
  // host: {
  //   name: string;
  //   avatarUrl: string;
  //   isPro: boolean;
  // };
}
export type Offers = Offer[];
