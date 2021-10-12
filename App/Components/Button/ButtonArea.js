import React from 'react';
import { TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../../Theme';

export function ButtonArea({ onPress, children, disabled, underlayColor, activeOpacity, style }) {
  return (
    <TouchableHighlight
      activeOpacity={activeOpacity}
      underlayColor={underlayColor}
      onPress={onPress}
      disabled={disabled}
      style={style}
    >
      {children}
    </TouchableHighlight>
  );
}

ButtonArea.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  activeOpacity: PropTypes.number,
  underlayColor: PropTypes.string,
  style: PropTypes.object,
};

ButtonArea.defaultProps = {
  disabled: false,
  underlayColor: Colors.transparent,
  activeOpacity: 0.95,
};
