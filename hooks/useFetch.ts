import { useEffect, useState } from 'react';

interface IUseFetch<T> {
  loading: boolean;
  error: null | string;
  data: T | undefined;
}

const useFetch = <T>(
  callback: () => Promise<object> | Promise<Array<object>>,
  initialState: T | undefined
): IUseFetch<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<T | undefined>(initialState);

  useEffect(() => {
    setLoading(true);
    callback()
      .then((res) => {
        setData(res as T);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [callback]);

  return { loading, error, data };
};

export { useFetch };
