/**
 *
 * AuthorizedRoute
 *
 */

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAuth } from '../../containers/App/selectors';

function AuthorizedRoute({ component: Component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ props }) =>
        auth.accessToken ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
});

AuthorizedRoute.propTypes = {
  path: PropTypes.string,
  component: PropTypes.any.isRequired,
  auth: PropTypes.object,
};

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(AuthorizedRoute);
