/**
 *
 * AuthHeader
 *
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Header from '../Header';
import { Colors } from '../../Theme';
import { Text } from '../../Components/Text';
import { useBalance } from '../../Hooks/useBalance';
import { convertCents } from '../../Utils/Helpers';

const styles = StyleSheet.create({
  balanceWrapper: {
    borderRadius: 4,
    backgroundColor: Colors.blue,
    paddingHorizontal: 5,
    paddingTop: 3,
    width: '100%',
  },
  balanceText: {
    //
  },
});

export function AuthHeader({ onGoBack, ...rest }) {
  const { balance } = useBalance();
  return (
    <Header
      {...rest}
      // headerRight={
      //   <View style={styles.balanceWrapper}>
      //     <Text style={styles.balanceText} color={Colors.white} size={14}>
      //       ${convertCents(balance)}
      //     </Text>
      //   </View>
      // }
      onGoBack={onGoBack}
      hasHamburgerMenu={!onGoBack}
    />
  );
}

AuthHeader.propTypes = {
  title: PropTypes.string,
  goBackTo: PropTypes.string,
  onGoBack: PropTypes.func,
};
