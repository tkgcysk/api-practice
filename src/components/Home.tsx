import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthForm } from "../components/auth/AuthForm";
import { Header } from "./pages/header/Header";
import { Main } from "./pages/main/Main";

export const Home: React.FC = () => {
  interface User {
    id: number | null;
    email?: string;
  }

  const [user, setUser] = useState<User>({
    id: null,
    email: "",
  });
  console.log(user);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const handleOnChangeStatus = (): void => {
    setIsLoggedIn(!isLogin);
  };

  const handleOnLogout = (): void => {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then((response) => {
        if (!response.data.logged_in) {
          setIsLoggedIn(!isLoggedIn);
        }
      })
      .catch((response) => {
        alert("通信に失敗しました。");
      });
  };

  const checkLoginStatus = () => {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in && isLoggedIn === false) {
          setIsLoggedIn(!isLoggedIn);
          setUser(response.data.user);
        } else if (response.data.status === 401) {
          setIsLoggedIn(isLoggedIn);
          setUser({
            id: null,
            email: "",
          });
        }
      })
      .catch((error) => {
        alert(`${error}`);
      });
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <Header handleOnLogout={handleOnLogout} isLoggedIn={isLoggedIn} />
          <Main />
        </>
      ) : (
        <AuthForm
          isLoggedIn={isLoggedIn}
          handleOnChangeStatus={handleOnChangeStatus}
        />
      )}
    </>
  );
};
