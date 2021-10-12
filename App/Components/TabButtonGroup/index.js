import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 35,
  },
});

export function TabButtonGroup({ children, style }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

TabButtonGroup.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

TabButtonGroup.defaultProps = {
  style: {},
};
