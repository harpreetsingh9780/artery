import { useState, useEffect } from 'react';
import Axios from 'axios';
import { UserService } from '../Services/UserService';

export function useUserSearch(query) {
  const [foundUsers, setFoundUsers] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingRecent, setLoadingRecent] = useState(false);

  useEffect(() => {
    const source = Axios.CancelToken.source();
    setLoadingRecent(true);

    const bootstrap = async () => {
      try {
        const response = await UserService.getRecent({
          cancelToken: source.token,
        });
        setLoadingRecent(false);
        setRecentUsers(response.users);
        setError(null);
      } catch (e) {
        if (!Axios.isCancel(e)) {
          setError(e);
        }
        setLoadingRecent(false);
      }
    };

    bootstrap()
      .then()
      .catch();
    return () => {
      if (source) {
        source.cancel();
      }
    };
  }, []);

  useEffect(() => {
    const source = Axios.CancelToken.source();
    if (query) {
      setLoading(true);

      const bootstrap = async () => {
        try {
          const response = await UserService.searchUsers(
            { query },
            {
              cancelToken: source.token,
            }
          );
          setLoading(false);
          setFoundUsers(response.users);
          setError(null);
        } catch (e) {
          if (!Axios.isCancel(e)) {
            setError(e);
          }
          setLoading(false);
        }
      };

      bootstrap()
        .then()
        .catch();
    }
    return () => {
      if (source) {
        source.cancel();
      }
    };
  }, [query]);

  // If nothing was found by query or query is empty and we have recent users then show recent.
  const users = !foundUsers.length || (!query && recentUsers.length) ? recentUsers : foundUsers;

  return { users, loading: loading || loadingRecent, error };
}
