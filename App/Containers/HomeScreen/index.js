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
import H1 from '../../Components/H1';
import { getFirstNameSelector } from '../../Stores/User/Selectors';
import { ucFirst } from '../../Utils/Helpers';
import { DashboardItems } from './components/DashboardItems';
import { AuthHeader } from '../AuthHeader';
import { createStructuredSelector } from 'reselect';
import { getLinkedBanksSelector } from '../../Stores/Banks/Selectors';
import { HomeFooter } from '../../Components/HomeFooter';
import { HomeFooterItem } from '../../Components/HomeFooterItem';
import NavigationService from '../../Services/NavigationService';
import Images from '../../Theme/Images';

function HomeScreen({ firstName, bankAccounts }) {
  const onFooterItemPress = (screenName) => NavigationService.navigate(screenName);

  return (
    <PageView
      header={<AuthHeader title="Home" />}
      footer={
        <HomeFooter>
          <HomeFooterItem
            title="Dashboard"
            onPress={() => onFooterItemPress('HomeScreen')}
            image={Images.dashboardNavIcon}
          />
          <HomeFooterItem
            title="Send"
            onPress={() => onFooterItemPress('SendMoneyScreen')}
            image={Images.sendMoneyNavIcon}
          />
          <HomeFooterItem
            title="Request"
            onPress={() => onFooterItemPress('RequestMoneyScreen')}
            image={Images.requestMoneyNavIcon}
          />
          <HomeFooterItem
            title="ActivityScreen"
            onPress={() => onFooterItemPress('ActivityScreen')}
            image={Images.activityNavIcon}
          />
          <HomeFooterItem
            title="Scan Me"
            onPress={() => onFooterItemPress('ScanMeScreen')}
            image={Images.scanMeNavIcon}
          />
        </HomeFooter>
      }
    >
      <H1 text={`Hello ${ucFirst(firstName)}`} />
      <DashboardItems bankAccounts={bankAccounts} />
    </PageView>
  );
}

HomeScreen.propTypes = {
  firstName: PropTypes.string.isRequired,
  bankAccounts: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  firstName: getFirstNameSelector,
  bankAccounts: getLinkedBanksSelector,
});

const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(withConnect)(HomeScreen);
