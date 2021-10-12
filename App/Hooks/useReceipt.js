import { useState, useEffect } from 'react';
import Axios from 'axios';
import { UserByHandleRequest } from '../utils/http';

export function useReceipt(transactionId) {
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = Axios.CancelToken.source();
    setLoading(true);

    const bootstrap = async () => {
      try {
        const response = await UserByHandleRequest(transactionId, {
          cancelToken: source.token,
        });
        setLoading(false);
        setReceipt(response);
        setError(null);
      } catch (e) {
        if (!Axios.isCancel(e)) {
          setError(e);
        }
        setReceipt(null);
        setLoading(false);
      }
    };

    bootstrap()
      .then()
      .catch();

    return () => {
      source.cancel();
    };
  }, [transactionId]);

  return { receipt, loading, error };
}
