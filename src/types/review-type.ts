export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  token: string;
  email: string;
}

export type Review = {
    id: string;
    date: string;
    user: User;
    comment: string;
    rating: number;
};

export type Reviews = Review[];
