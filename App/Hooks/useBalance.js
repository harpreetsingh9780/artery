import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedTokenId } from '../Stores/Config/Selectors';
import { getBalanceSelector } from '../Stores/Balance/Selectors';
import { BalanceActions } from '../Stores/Balance/Actions';

export function useBalance() {
  const dispatch = useDispatch();

  const tokenId = useSelector(getSelectedTokenId);
  const { balance, pendingBalance, loading, error } = useSelector(getBalanceSelector);

  useEffect(() => {
    dispatch(BalanceActions.balance(tokenId));
  }, [tokenId]);

  return { balance, pendingBalance, loading, error };
}
