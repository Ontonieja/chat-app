import { useState } from "react";

import axios from "axios";
const NODE_SERVER_URL = import.meta.env.VITE_NODE_SERVER_URL;

axios.defaults.baseURL = NODE_SERVER_URL;

export interface AxiosParamsProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  data?: object;
}

export const useAxios = <T,>() => {
  const [response, setResponse] = useState<T | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (params: AxiosParamsProps) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await axios.request({
        method: params.method,
        url: params.url,
        data: params.data,
        withCredentials: true,
      });

      setResponse(result.data);
      return result.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "An unexpected error occurred."
        );
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { response, error, isLoading, fetchData };
};
