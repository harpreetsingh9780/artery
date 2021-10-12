import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from '../Text';
import { Colors } from '../../Theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bullet: {
    flexGrow: 0,
    marginRight: 10,
    fontSize: 6,
    lineHeight: 20,
    color: Colors.dark,
  },
  text: {
    fontSize: 12,
    lineHeight: 12,
    color: Colors.dark,
  },
});

export function BulletListItem({ text, style, containerStyle }) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.bullet, style]}>{'\u2B24'}</Text>
      <Text style={[styles.text, style]}>{text}</Text>
    </View>
  );
}

BulletListItem.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.object,
  containerStyle: PropTypes.object,
};

BulletListItem.defaultValues = {
  style: {},
  containerStyle: {},
};
