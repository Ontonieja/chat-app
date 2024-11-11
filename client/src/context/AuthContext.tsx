import React, { useEffect, useState } from "react";
import { USER_INFO } from "../utils/constants";
import axios from "axios";
import { UserProps } from "../utils/types";
import { useChatContext } from "../hooks/useChatContext";

interface JWTPayload {
  message?: string;
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

const AuthContext = React.createContext<{
  login: (data: JWTPayload) => void;
  logout: () => void;
  user: UserProps | undefined;
  loading: boolean;
}>({
  login: () => {},
  logout: () => {},
  user: undefined,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps | undefined>();
  const [loading, setIsLoading] = useState(true);
  const { clearChatContext } = useChatContext();
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(USER_INFO, {
          withCredentials: true,
        });
        if (response.status === 200 && response.data) {
          setUser(response.data);
        } else {
          setUser(undefined);
        }
      } catch (err) {
        console.log(err);
        setUser(undefined);
      } finally {
        setIsLoading(false);
      }
    };

    getUserInfo();
  }, []);

  const login = (data: JWTPayload) => {
    setUser(data.user);
  };

  const logout = () => {
    setUser(undefined);
    clearChatContext();
    document.cookie =
      "jwt=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=lax";
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
