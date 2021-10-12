import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BanksActions } from '../Stores/Banks/Actions';
import { getLinkedBanksSelector } from '../Stores/Banks/Selectors';
import { getSelectedTokenId } from '../Stores/Config/Selectors';

export function useMyBankAccounts() {
  const dispatch = useDispatch();
  const tokenId = useSelector(getSelectedTokenId);
  const { items, loading, error } = useSelector(getLinkedBanksSelector);

  useEffect(() => {
    dispatch(BanksActions.linkedBanks());
  }, [tokenId]);

  return { bankAccounts: items, loading, error };
}
