import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PropTypes from 'prop-types';

export function FormContainer({ children }) {
  return <KeyboardAwareScrollView>{children}</KeyboardAwareScrollView>;
}

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
