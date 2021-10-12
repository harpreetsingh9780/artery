import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import DashboardItem from './DashboardItem';
import Images from '../../../Theme/Images';

const styles = StyleSheet.create({
  container: {
    marginLeft: -10,
    marginRight: -10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export function DashboardItems({ bankAccounts }) {
  return (
    <View style={styles.container}>
      {!bankAccounts && (
        <>
          <DashboardItem
            image={Images.linkBankAccountIcon}
            title="Link Bank Account"
            description="Get 10% off your next purchase."
            to="LinkBankAccountScreen"
          />
          <DashboardItem
            image={Images.sendMoneyNavIcon}
            title="Preload Account"
            description="Load $100 and get another $5 on us."
            to="PreloadAccountScreen"
          />
        </>
      )}
      {bankAccounts && (
        <>
          <DashboardItem
            image={Images.sendMoneyNavIcon}
            title="Preload Account"
            description="Load $100 and get another $5 on us."
            to="PreloadAccountScreen"
          />
          <DashboardItem
            image={Images.amountIcon}
            title="Purchase"
            description="Scan a QR code to make a purchase"
            to="SendMoneyScreen"
          />
        </>
      )}
      <DashboardItem
        image={Images.recipientIcon}
        title="Invite a Friend"
        description="Spread the word via email, phone or social."
        to="InviteAFriendScreen"
      />
      <DashboardItem
        image={Images.linkBankAccountIcon}
        title="Send a Gift"
        description="Send a unique gift with a few simple taps."
        to="SendAGiftScreen"
      />
    </View>
  );
}

DashboardItems.propTypes = {
  bankAccounts: PropTypes.array.isRequired,
};

DashboardItems.defaultProps = {
  bankAccounts: [],
};
