import {database, name, datatype, address, image} from 'faker';
import { Offer } from '../types/offer-type';

export const makeFakeOfferCard = (isFavorite = false): Offer =>({
  id: database.column(),
  title:  name.title(),
  type: name.title(),
  price: datatype.number(),
  city: {
    name: address.city(),
    location: {
      latitude: datatype.number(),
      longitude: datatype.number(),
      zoom: datatype.number()
    }
  },
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number()
  },
  isFavorite: isFavorite,
  isPremium: datatype.boolean(),
  rating: datatype.number(),
  previewImage: image.imageUrl(),
});
