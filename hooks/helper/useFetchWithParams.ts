import { useState, useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch'; // Assuming you have the useFetch hook

type FetchParams = {
  url: string;
  queryParams?: Record<string, any>;
  headers?: Record<string, string>;
};

export const useFetchWithParams = <T>(fetchParams: FetchParams) => {
  const { get } = useFetch(); // Your existing fetch hook
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const { url, queryParams = {}, headers = {} } = fetchParams;
      const params = new URLSearchParams(queryParams);
      setLoading(true);
      let response;
      console.log('histories URL',`${url}?${params.toString()}`)
      try {
        response = await get(`${url}?${params.toString()}`, {
          headers: {
            accept: 'application/json',
            ...headers, // Merge additional headers
          },
        });
        setData(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchParams]); // Re-run if the fetchParams change

  return { data, error, loading };
};
