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
import NavigationService from '../../Services/NavigationService';
import { createStructuredSelector } from 'reselect';
import { getActivitySelector } from '../../Stores/Activity/Selectors';
import { ActivityListItem } from '../../Components/ActivityListItem';

function ActivityScreen({ activity, onGoBack, goToReceipt }) {
  return (
    <PageView header={<AuthHeader title="Activity" onGoBack={onGoBack} />}>
      {activity.activity.map((item) => (
        <ActivityListItem key={item.id} item={item} onPress={() => goToReceipt(item)} />
      ))}
    </PageView>
  );
}

ActivityScreen.propTypes = {
  onGoBack: PropTypes.func,
  activity: PropTypes.object,
  goToReceipt: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  activity: getActivitySelector,
});

const mapDispatchToProps = (dispatch) => ({
  onGoBack: () => NavigationService.navigateToHome(),
  goToReceipt: (item) => NavigationService.navigate('ActivityReceiptScreen', { item }),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(ActivityScreen);
