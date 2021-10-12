import React, { useCallback, forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import { AsYouType } from 'libphonenumber-js';
import { Input } from '../Input';
import { PHONE_NUMBER_COUNTRY } from '../../Utils/Constants';

export const PhoneInput = forwardRef(function PhoneInput(props, ref) {
  const inputRef = useRef(null);

  const handleValueChange = useCallback(
    (text) => {
      const formattedValue = new AsYouType(props.countryCode).input(text);
      try {
        if (inputRef.current) {
          if (
            props.value &&
            props.value.endsWith(')') &&
            // props.value.length === inputRef.current._lastNativeSelection.end &&
            text &&
            text.length === props.value.length - 1
          ) {
            props.onValueChange(text);
          } else {
            props.onValueChange(formattedValue);
          }
        }
      } catch (e) {
        console.error(e);
        //
      }
    },
    [props.onValueChange, props.value]
  );

  return (
    <Input
      ref={(_ref) => {
        ref = _ref;
        inputRef.current = _ref;
      }}
      value={props.value}
      onValueChange={handleValueChange}
      title={props.title}
      placeholder={props.placeholder}
      right={props.right}
      left={props.left}
      type="phone"
      containerStyle={props.containerStyle}
    />
  );
});

PhoneInput.propTypes = {
  title: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onValueChange: PropTypes.func,
  right: PropTypes.node,
  left: PropTypes.node,
  containerStyle: PropTypes.object,
};

PhoneInput.defaultProps = {
  title: 'Mobile Phone',
  countryCode: PHONE_NUMBER_COUNTRY,
  placeholder: '(555) 555-5555',
  onValueChange: (value) => {},
  right: null,
  left: null,
  containerStyle: {},
};
