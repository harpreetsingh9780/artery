import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTokenListAction } from '../containers/App/actions';

export function useTokens() {
  const dispatch = useDispatch();

  const { tokens, tokensLoading, tokensError } = useSelector(
    a => a?.app || { tokens: [] },
  );
  const { activeTokenId } = useSelector(a => a?.app?.auth || {});

  useEffect(() => {
    dispatch(getTokenListAction());
  }, [activeTokenId]);

  return { tokens, activeTokenId, loading: tokensLoading, error: tokensError };
}
