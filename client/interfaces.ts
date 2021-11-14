import { Dispatch, SetStateAction } from 'react';

export interface ResponseData {
  error: boolean;
  data: {
    token: string;
  };
}

export interface UpdateUser {
  id: string;
  username: string;
  email: string;
  phoneno: number;
  twitterId: string;
  instagramId: string;
  nationality: string;
  bangToken: number;
  referralCount: number;
}
export interface UpdateResponseData {
  error: boolean;
  data: UpdateUser;
}

export interface Product {
  tags: string[];
  _id: string;
  name: string;
  price: number;
  image: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductResponseData {
  error: boolean;
  data: Product[];
}

export interface Review {
  _id: string;
  productId: string;
  username: string;
  review: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export interface ReviewResponseData {
  error: boolean;
  data: {
    reviews: Review[];
  };
}

export interface Order {
  id: string;
  bangToken: number;
}

export interface OrderResponseData {
  error: boolean;
  data: Order;
}

export interface User {
  id: string;
  username: string;
  email: string;
  phoneno: number;
  bangToken: number;
  referralCount: number;
  twitterId: string;
  instagramId: string;
  nationality: string;
}
export interface UserDetails {
  error: boolean;
  data: User;
}
export interface ErrorData {
  error: boolean;
  data: {
    message: string[];
  };
}

export interface User {
  username: string;
  token: string;
}

export interface Store {
  usernameCookie: string | null;
  tokenCookie: string | null;
  login: (username: string, token: string) => void;
  logout: () => void;
  products: Product[] | null;
  setProducts: Dispatch<SetStateAction<Product[] | null>>;
  user: User | null;
  getDetails: () => void;
}
