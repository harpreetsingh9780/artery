import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from '../Text';
import { Colors } from '../../Theme';

export function ReceiverRenderer({ user }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text} weight="medium">
        {/* {[user.firstName, user.lastName].join(' ')} */}
        {user.handle}
      </Text>
    </View>
  );
}

ReceiverRenderer.propTypes = {
  user: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    borderTopWidth: 1,
    borderTopColor: Colors.gray,
    paddingVertical: 10,
    marginBottom: 15,
  },
  text: {
    color: Colors.black,
    letterSpacing: 0,
    lineHeight: 20,
  },
});
