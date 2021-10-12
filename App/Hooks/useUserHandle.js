import { useState, useEffect } from 'react';
import Axios from 'axios';
import { UserByHandleRequest } from '../utils/http';

const initialState = {
  firstName: null,
  lastName: null,
  id: null,
  handle: null,
};

export function useUserHandle(handle) {
  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = Axios.CancelToken.source();
    setLoading(true);

    const bootstrap = async () => {
      try {
        const response = await UserByHandleRequest(handle, {
          cancelToken: source.token,
        });
        setLoading(false);
        setUser(response);
        setError(null);
      } catch (e) {
        if (!Axios.isCancel(e)) {
          setError(e);
        }
        setUser(initialState);
        setLoading(false);
      }
    };

    bootstrap()
      .then()
      .catch();

    return () => {
      source.cancel();
    };
  }, [handle]);

  return { user, loading, error };
}
