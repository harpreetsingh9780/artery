/**
 *
 * PersistProvider
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reactLocalStorage } from 'reactjs-localstorage';
import { createStructuredSelector } from 'reselect';
import { makeSelectAuth } from '../App/selectors';
import { setAccessToken, setAuthData } from '../App/actions';
import { initialUserState } from '../App/reducer';
import SplashScreen from '../SplashScreen/SplashScreen';

export function PersistProvider({
  children,
  dispatch,
  loading: Component = null,
}) {
  const [rehydrated, setRehydrated] = useState(false);
  useEffect(() => {
    const value = reactLocalStorage.get('auth.token', null, true);
    dispatch(setAccessToken(value));
    const user = JSON.parse(
      reactLocalStorage.get(
        'auth.user',
        JSON.stringify(initialUserState),
        true,
      ),
    );
    dispatch(setAuthData(user));
    setRehydrated(true);
  }, [dispatch, reactLocalStorage]);

  if (rehydrated) {
    return <>{children}</>;
  }

  if (Component == null) {
    return <SplashScreen />;
  }

  return <Component />;
}

PersistProvider.propTypes = {
  children: PropTypes.any,
  dispatch: PropTypes.func,
  loading: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PersistProvider);
