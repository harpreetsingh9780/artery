import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../../Theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 24,
    backgroundColor: Colors.white,
    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export function HomeFooter({ children }) {
  return <View style={styles.container}>{children}</View>;
}

HomeFooter.propTypes = {
  children: PropTypes.node.isRequired,
};
HomeFooter.defaultProps = {};
