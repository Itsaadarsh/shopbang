export interface ResponseData {
  error: boolean;
  data: {
    token: string;
  };
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
}
