/**
 *
 * H1
 *
 */

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from '../Text';
import { Colors } from '../../Theme';

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginBottom: 15,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageWrapper: {
    marginRight: 15,
  },
  image: {
    width: 36,
    height: 36,
  },
  text: {
    flex: 1,
    margin: 0,
    lineHeight: 31,
    letterSpacing: 0,
  },
});

function H1({ icon, text }) {
  return (
    <View style={styles.container}>
      {icon && (
        <View style={styles.imageWrapper}>
          <Image source={icon} style={styles.image} />
        </View>
      )}
      <Text size={26} color={Colors.blue} style={styles.text}>
        {text}
      </Text>
    </View>
  );
}

H1.propTypes = {
  icon: PropTypes.any,
  text: PropTypes.node.isRequired,
};

export default H1;
