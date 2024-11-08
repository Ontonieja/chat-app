import { useState } from "react";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000/";

interface axiosParamsProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  data?: object;
}

export const useAxios = <T,>() => {
  const [response, setResponse] = useState<T | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (params: axiosParamsProps) => {
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
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "An unexpected error occurred."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { response, error, isLoading, fetchData };
};
