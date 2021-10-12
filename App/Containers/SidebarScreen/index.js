import React, { memo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { SidebarButton } from '../../Components/SidebarButton';
import { LoginActions } from '../../Stores/Login/Actions';
import NavigationService from '../../Services/NavigationService';
import { Colors } from '../../Theme';
import Images from '../../Theme/Images';
import { SidebarUserInfo } from '../../Components/SidebarUserInfo';
import { getUserSelector } from '../../Stores/User/Selectors';

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
});

/**
 * @return {null}
 */
function SidebarScreen({ navigateTo, onLogout, user }) {
  return (
    <SafeAreaView>
      <ScrollView style={styles.wrapper}>
        <SidebarUserInfo
          name={[user.firstName, user.lastName].join(' ')}
          onPress={() => navigateTo('AccountScreen')}
        />

        <SidebarButton
          text="Account Home"
          icon={Images.dashboardNavIcon}
          onPress={() => navigateTo('HomeScreen')}
        />
        <SidebarButton
          text="Send Money"
          icon={Images.sendMoneyNavIcon}
          onPress={() => navigateTo('SendMoneyScreen')}
        />
        <SidebarButton
          text="Request Money"
          icon={Images.requestMoneyNavIcon}
          onPress={() => navigateTo('RequestMoneyScreen')}
        />
        <SidebarButton
          text="View Activity"
          icon={Images.activityNavIcon}
          onPress={() => navigateTo('ActivityScreen')}
        />
        <SidebarButton
          text="Scan Me"
          icon={Images.scanMeNavIcon}
          onPress={() => navigateTo('ScanMeScreen')}
        />

        <SidebarButton
          onPress={() => navigateTo('LinkBankAccountScreen')}
          text="Link Bank Account"
        />
        <SidebarButton onPress={() => navigateTo('PreloadAccountScreen')} text="Preload Account" />
        <SidebarButton onPress={() => navigateTo('InviteAFriendScreen')} text="Invite a Friend" />
        <SidebarButton onPress={() => navigateTo('SendAGiftScreen')} text="Send a Gift" />
        <SidebarButton onPress={() => navigateTo('PayBillsScreen')} text="My Bank Accounts" />
        <SidebarButton onPress={onLogout} text="Sign Out" color={Colors.error} />
        {/*</Container>*/}
      </ScrollView>
    </SafeAreaView>
  );
}

SidebarScreen.propTypes = {
  user: PropTypes.object.isRequired,
  navigateTo: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: getUserSelector,
  // open: makeSelectSidebarOpen(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onLogout: () => {
      NavigationService.closeDrawer();
      dispatch(LoginActions.logout());
    },
    navigateTo: (routeName, options) => {
      NavigationService.closeDrawer();
      NavigationService.navigate(routeName, options);
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default memo(compose(withConnect)(SidebarScreen));
