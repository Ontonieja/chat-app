import { createContext, useContext, useLayoutEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState();

  useEffect(() => {
    try{
        const response = 
    }
  })

  useLayoutEffect(() => {
    const authInterceptor = axios.interceptors.request.use((config) => {
        config.headers.Authorization = !config._retry && token ? `Bearer ${token}` : config.headers.Authorization;
        return config
    })
  }) 
};
