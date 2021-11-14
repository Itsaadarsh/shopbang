import 'styles/globals.css';

import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useCookie } from 'react-use';
import { ErrorData, Product, User, UserDetails } from 'interfaces';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { config } from '../constants';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [usernameCookie, updateUsernameCookie, deleteUsernameCookie] = useCookie('username');
  const [tokenCookie, updateTokenCookie, deleteTokenCookie] = useCookie('token');
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[] | null>(null);

  const getDetails = () => {
    axios
      .get(config.api + '/user/', { headers: { Authorization: `Bearer ${tokenCookie}` } })
      .then((response: AxiosResponse) => {
        const data: UserDetails = response.data;
        setUser(data.data);
      })
      .catch((error: AxiosError) => {
        const data: ErrorData = error?.response?.data;
      });
  };

  // axios user details
  useEffect(() => {
    if (tokenCookie) {
      getDetails();
    }
  }, [tokenCookie]);

  // On start
  useEffect(() => {
    if (usernameCookie && tokenCookie) login(usernameCookie, tokenCookie);
  }, []);

  const login = (username: string, token: string) => {
    updateTokenCookie(token);
    updateUsernameCookie(username);
    router.push('/');
  };

  const logout = () => {
    deleteUsernameCookie();
    deleteTokenCookie();
    router.push('/account/login');
  };

  return (
    <Component
      {...pageProps}
      store={{ usernameCookie, tokenCookie, login, logout, products, setProducts, user, getDetails }}
    />
  );
};

export default App;
