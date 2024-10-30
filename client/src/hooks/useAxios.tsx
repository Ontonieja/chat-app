import { useState } from "react";

import axios, { AxiosError } from "axios";

axios.defaults.baseURL = "http://localhost:4000/";

interface axiosParamsProps {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  data?: object;
}

export const useAxios = () => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState<AxiosError | null>(null);
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
      if (axios.isAxiosError(err) && err.response) {
        setError(err);
      } else {
        return err;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { response, error, isLoading, fetchData };
};
