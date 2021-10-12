import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../../Theme';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  },
});

export function Footer({ children }) {
  return <View style={styles.container}>{children}</View>;
}

Footer.propTypes = {
  children: PropTypes.node.isRequired,
};
Footer.defaultProps = {};
