import { CityName } from '../const';
import { User } from './review-type';
export type Offer = {
  classAdd?: string;
  id: string;
  title: string;
  type: string;
  price: number;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
  city: City;
  location: Location;
}
export type Offers = Offer[];

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type FullOffer = Offer & {
  goods: string[];
  bedrooms: number;
  maxAdults: number;
  description: string;
  images: string[];
  host: User;
};

export type City = {
  name: CityName;
  location: Location;
};

export type Cities = City[];
