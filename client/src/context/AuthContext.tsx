import React, { useEffect, useState } from "react";
import { USER_INFO } from "../utils/constants";
import axios from "axios";

interface JWTPayload {
  user: {
    id: number;
    email: string;
    userName: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    profileSetup: boolean;
  };
}

interface UserProps {
  id: number;
  email: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  profileSetup: boolean;
}

const AuthContext = React.createContext<{
  isLoggedIn: boolean;
  login: (data: JWTPayload) => void;
  logout: () => void;
  user: UserProps | undefined;
  loading: boolean;
}>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  user: undefined,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(USER_INFO, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data) {
          setUser(response.data);
          setIsLoggedIn(true);
        } else {
          setUser(undefined);
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.log(err);
        setUser(undefined);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    getUserInfo();
  }, []);

  const login = (data: JWTPayload) => {
    setIsLoggedIn(true);
    setUser(data.user);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
