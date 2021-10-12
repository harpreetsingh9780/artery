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
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    paddingVertical: 15,
  },
  spaceAroundContainer: {
    justifyContent: 'space-between',
  },
  label: {
    lineHeight: 14,
    paddingRight: 15,
  },
  text: {
    lineHeight: 14,
  },
});

export function LineItem(props) {
  return (
    <View style={[styles.container, props.space ? styles.spaceAroundContainer : {}]}>
      {props.label && (
        <Text color={Colors.dark} style={styles.label} weight="medium" size={14}>
          {props.label}
        </Text>
      )}
      <Text style={styles.text} weight="medium" size={14}>
        {props.text}
      </Text>
    </View>
  );
}

LineItem.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
  space: PropTypes.bool,
};

LineItem.defaultProps = {
  space: false,
};
