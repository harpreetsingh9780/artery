/**
 *
 * Lead
 *
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from '../Text';
import { Colors } from '../../Theme';

const styles = StyleSheet.create({
  text: {
    marginBottom: 25,
    lineHeight: 20,
  },
});

export function Lead({ text }) {
  return (
    <Text color={Colors.dark} size={14} style={styles.text}>
      {text}
    </Text>
  );
}

Lead.propTypes = {
  text: PropTypes.string.isRequired,
};
