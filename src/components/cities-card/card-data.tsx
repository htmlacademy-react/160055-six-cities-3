export type CardProps = {
  id: string;
  title: string;
  type: string;
  price: number;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export const cardsMocks: CardProps[] = [
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
    title: '12345',
    type: 'apartment',
    price: 120,
    isFavorite: false,
    isPremium: true,
    rating: 4,
    previewImage: './../../../markup/img/apartment-01.jpg',
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f01',
    title: '23451',
    type: 'room',
    price: 80,
    isFavorite: false,
    isPremium: false,
    rating: 5,
    previewImage: './../../../markup/img/apartment-02.jpg',
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f02',
    title: '34512',
    type: 'apartment',
    price: 90,
    isFavorite: true,
    isPremium: false,
    rating: 3,
    previewImage: './../../../markup/img/apartment-03.jpg',
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f03',
    title: '45123',
    type: 'apartment',
    price: 100,
    isFavorite: true,
    isPremium: true,
    rating: 2,
    previewImage: './../../../markup/img/apartment-01.jpg',
  },
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f04',
    title: '51234',
    type: 'room',
    price: 50,
    isFavorite: true,
    isPremium: false,
    rating: 5,
    previewImage: './../../../markup/img/apartment-02.jpg',
  },
];
