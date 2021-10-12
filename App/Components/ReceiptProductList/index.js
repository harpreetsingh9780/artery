import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { LineItem } from '../LineItem';
import { ReceiptProductItem } from '../ReceiptProductItem';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export function ReceiptProductList({ items }) {
  return (
    <View style={styles.container}>
      <LineItem label="Products:" text="" />
      {items.map((item, index) => (
        <ReceiptProductItem item={item} key={index} />
      ))}
    </View>
  );
}

ReceiptProductList.propTypes = {
  items: PropTypes.array.isRequired,
};
