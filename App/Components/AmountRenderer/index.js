import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from '../Text';
import { convertCents } from '../../Utils/Helpers';
import { Colors } from '../../Theme';

export function AmountRenderer({ amountCents, symbol }) {
  return (
    <View style={styles.container}>
      <Text style={styles.symbol}>{symbol}</Text>
      <Text style={styles.value}>{convertCents(amountCents)}</Text>
    </View>
  );
}

AmountRenderer.propTypes = {
  amountCents: PropTypes.number,
  symbol: PropTypes.string,
};

AmountRenderer.defaultProps = {
  symbol: '$',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: Colors.black,
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: 5,
  },
  symbol: {
    color: Colors.black,
    fontSize: 55,
    lineHeight: 60,
    letterSpacing: -0.5,
    marginRight: 5,
    alignContent: 'center',
  },
  value: {
    color: Colors.black,
    fontSize: 55,
    lineHeight: 60,
    letterSpacing: -0.5,
  },
});
