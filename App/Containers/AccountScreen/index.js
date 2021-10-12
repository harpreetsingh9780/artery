/*
 * HomeScreen
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { PageView } from '../../Components/PageView';
import { AuthHeader } from '../AuthHeader';
import { createStructuredSelector } from 'reselect';
import NavigationService from '../../Services/NavigationService';
import { LineItem } from '../../Components/LineItem';
import { getUserSelector } from '../../Stores/User/Selectors';
import { stringifyPhoneNumber } from '../../Utils/Helpers';

function AccountScreen({ user, goBack }) {
  return (
    <PageView header={<AuthHeader title="Account" onGoBack={goBack} />}>
      <LineItem label="Handle" text={user.handle} />
      <LineItem text={user.email} />
      <LineItem text={stringifyPhoneNumber(user.phone)} />
    </PageView>
  );
}

AccountScreen.propTypes = {
  user: PropTypes.object.isRequired,
  goBack: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: getUserSelector,
});

const mapDispatchToProps = (dispatch) => ({
  goBack: () => NavigationService.navigateToHome(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(AccountScreen);
