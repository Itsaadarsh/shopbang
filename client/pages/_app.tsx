import "styles/globals.css";

import { useEffect } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useCookie } from "react-use";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const [usernameCookie, updateUsernameCookie, deleteUsernameCookie] = useCookie("username");
  const [tokenCookie, updateTokenCookie, deleteTokenCookie] = useCookie("token");

  // On start
  useEffect(() => {
    if (usernameCookie && tokenCookie) login(usernameCookie, tokenCookie)
    else logout();
  }, []);

  const login = (username: string, token: string) => {
    updateTokenCookie(token);
    updateUsernameCookie(username);
    router.push("/");
  }

  const logout = () => {
    deleteUsernameCookie();
    deleteTokenCookie();
    router.push("/account/login");
  }

  return <Component {...pageProps} store={{ usernameCookie, tokenCookie, login, logout }} />;
};

export default App;
