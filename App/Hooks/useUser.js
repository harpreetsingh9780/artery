import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDataAction } from '../containers/App/actions';

export function useUserData() {
  const dispatch = useDispatch();

  const { firstName, lastName, handle } = useSelector(a =>
    a && a.app ? a.app.user : {},
  );

  const { accessToken } = useSelector(a => (a && a.app ? a.app.auth : {}));

  useEffect(() => {
    dispatch(getUserDataAction());
  }, [accessToken, handle]);

  return { firstName, lastName, handle };
}
