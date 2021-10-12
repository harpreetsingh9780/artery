import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from '../Text';
import { Colors, Images } from '../../Theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    paddingVertical: 15,
  },
  text: {
    lineHeight: 16,
  },
  image: {
    width: 16,
    height: 16,
  },
});

export function StateLineItem(props) {
  return (
    <View style={[styles.container]}>
      <Text style={styles.text} weight="medium" size={14}>
        {props.text}
      </Text>
      {props.status === 'success' && <Image source={Images.checkmarkIcon} style={styles.image} />}
    </View>
  );
}

StateLineItem.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  status: PropTypes.oneOf(['success', 'failed', 'none']),
};

StateLineItem.defaultProps = {
  status: 'success',
};
