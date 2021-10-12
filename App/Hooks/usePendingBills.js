import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { BalanceService } from '../Services/BalanceService';

export function usePendingBills() {
  const authToken = useSelector((state) => state.login.authToken);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch();
  }, [authToken]);

  const fetch = useCallback(
    (callback = () => {}) => {
      BalanceService.transactionRequests()
        .then((response) => {
          setLoading(false);
          setItems(response);
          setError(null);
          callback(true);
        })
        .catch((error) => {
          setError(e);
          setLoading(false);
          callback(false);
        });
    },
    [authToken]
  );

  return { items, loading, error, fetch };
}
