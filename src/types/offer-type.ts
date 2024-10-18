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
  city: City;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}
export type Offers = Offer[];

export type City = {
  name: string;
  location: Location;
};

export type Cities = City[];

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}
