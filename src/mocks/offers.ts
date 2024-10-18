import {Offer} from '../types/offer-type';

export const offers: Offer[] = [
  {
    id: '1',
    title: '12345',
    type: 'apartment',
    price: 120,
    isFavorite: false,
    isPremium: true,
    rating: 4,
    images: ['./../../../markup/img/apartment-01.jpg',
      './../../../markup/img/apartment-02.jpg',
      './../../../markup/img/apartment-03.jpg'],
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    bedrooms: 3,
    maxAdults: 2,
    goods: ['Wi-Fi', 'Heating', 'Dishwasher', 'Cabel TV'],
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.374,
        longitude: 4.88969,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
  },
  {
    id: '2',
    title: '23451',
    type: 'room',
    price: 80,
    isFavorite: false,
    isPremium: false,
    rating: 5,
    images: ['./../../../markup/img/apartment-03.jpg',
      './../../../markup/img/apartment-02.jpg',
      './../../../markup/img/apartment-01.jpg'],
    description: 'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    bedrooms: 1,
    maxAdults: 1,
    goods: ['Coffee machine', 'Heating', 'Kitchen', 'Cabel TV'],
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.374,
        longitude: 4.88969,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 8,
    },
  },
  {
    id: '3',
    title: '34512',
    type: 'apartment',
    price: 90,
    isFavorite: true,
    isPremium: false,
    rating: 3,
    images: ['./../../../markup/img/apartment-02.jpg',
      './../../../markup/img/apartment-01.jpg',
      './../../../markup/img/apartment-03.jpg'],
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century',
    bedrooms: 3,
    maxAdults: 5,
    goods: ['Coffee machine', 'Fridge', 'Towels', 'Cabel TV'],
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.374,
        longitude: 4.88969,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 8,
    },
  },
  {
    id: '4',
    title: '45123',
    type: 'apartment',
    price: 100,
    isFavorite: true,
    isPremium: true,
    rating: 2,
    images: ['./../../../markup/img/apartment-01.jpg',
      './../../../markup/img/apartment-03.jpg',
      './../../../markup/img/apartment-02.jpg'],
    description: 'Canal View Prinsengracht',
    bedrooms: 2,
    maxAdults: 3,
    goods: ['Coffee machine', 'Fridge', 'Towels', 'Heating', 'Baby seat'],
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.374,
        longitude: 4.88969,
        zoom: 10,
      },
    },
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 8,
    },
  },
  {
    id: '5',
    title: '2342134213421',
    type: 'room',
    price: 1400,
    description: 'Canal View Prinsengracht',
    isFavorite: false,
    isPremium: true,
    rating: 2,
    bedrooms: 1,
    maxAdults: 2,
    images: ['./../../../markup/img/apartment-03.jpg',
      './../../../markup/img/apartment-02.jpg'],
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13
      }
    },
    location: {
      latitude: 48.868610000000004,
      longitude: 2.342499,
      zoom: 16
    },
    goods: ['Coffee machine', 'Fridge', 'Towels', 'Heating', 'Baby seat'],
  },
  {
    id: '6',
    title: '123412341234',
    type: 'room',
    price: 10,
    description: 'Canal View Prinsengracht',
    isFavorite: true,
    isPremium: true,
    rating: 1.3,
    bedrooms: 3,
    maxAdults: 4,
    images: ['./../../../markup/img/apartment-02.jpg',
      './../../../markup/img/apartment-03.jpg',
      './../../../markup/img/apartment-02.jpg'],
    city: {
      name: 'Cologne',
      location: {
        latitude: 50.938361,
        longitude: 6.959974,
        zoom: 13
      }
    },
    location: {
      latitude: 50.932361,
      longitude: 6.937974,
      zoom: 16
    },
    goods: ['Coffee machine', 'Fridge', 'Towels', 'Heating', 'Baby seat'],
  },
  {
    id: '7',
    title: '52324',
    type: 'room',
    price: 250,
    description: 'Canal View Prinsengracht',
    isFavorite: false,
    isPremium: false,
    rating: 2.3,
    bedrooms: 2,
    maxAdults: 4,
    images: ['./../../../markup/img/apartment-01.jpg',
      './../../../markup/img/apartment-03.jpg'],
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 13
      }
    },
    location: {
      latitude: 50.854557,
      longitude: 4.364697,
      zoom: 16
    },
    goods: ['Coffee machine', 'Fridge', 'Towels', 'Heating', 'Baby seat'],
  },
  {
    id: '8',
    title: '5234234',
    type: 'room',
    price: 50,
    description: 'Canal View Prinsengracht',
    isFavorite: true,
    isPremium: false,
    rating: 4.3,
    bedrooms: 1,
    maxAdults: 1,
    images: ['./../../../markup/img/apartment-01.jpg'],
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.550341,
        longitude: 10.000654,
        zoom: 13
      }
    },
    location: {
      latitude: 53.565341,
      longitude: 9.980654000000001,
      zoom: 16
    },
    goods: ['Coffee machine', 'Fridge', 'Towels', 'Heating', 'Baby seat'],
  },
  {
    id: '9',
    title: '1231234',
    type: 'room',
    price: 60,
    description: 'Canal View Prinsengracht',
    isFavorite: false,
    isPremium: true,
    rating: 5,
    bedrooms: 5,
    maxAdults: 10,
    images: ['./../../../markup/img/apartment-03.jpg'],
    city: {
      name: 'Dusseldorf',
      location: {
        latitude: 51.225402,
        longitude: 6.776314,
        zoom: 13
      }
    },
    location: {
      latitude: 51.236402000000005,
      longitude: 6.784314,
      zoom: 16
    },
    goods: ['Coffee machine', 'Fridge', 'Towels', 'Heating', 'Baby seat'],
  },
];
