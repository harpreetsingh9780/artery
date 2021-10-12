import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from '../Text';
import { Colors } from '../../Theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    paddingVertical: 15,
  },
});

export function ReceiptProductItem({ item }) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.quantity}>{item.quantity}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </View>
  );
}

ReceiptProductItem.propTypes = {
  item: PropTypes.object.isRequired,
};
