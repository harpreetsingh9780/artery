import React, { useCallback, useState, useRef } from 'react';
import { View, Image, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../../Theme';
import Images from '../../Theme/Images';
import { AsYouType } from 'libphonenumber-js';
import { PHONE_NUMBER_COUNTRY } from '../../Utils/Constants';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    marginRight: 10,
  },
  input: {
    borderBottomWidth: 0,
    height: 20,
    padding: 0,
    lineHeight: 20,
    flex: 1,
  },
  inputActive: {
    color: Colors.blue,
  },
});

export function SearchRecipientInput(props) {
  const inputRef = useRef(null);

  const [active, setActive] = useState(false);

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

  const handleTouch = () => inputRef.current.focus();

  return (
    <TouchableWithoutFeedback onPress={() => handleTouch()}>
      <View style={styles.container}>
        {active && <Image source={Images.magnifyingGlassIcon} style={styles.image} />}
        {!active && <Image source={Images.magnifyingGlassInactiveIcon} style={styles.image} />}
        <TextInput
          ref={inputRef}
          style={[styles.input, active ? styles.inputActive : {}]}
          value={props.value}
          placeholder={props.placeholder}
          containerStyle={styles.input}
          onChangeText={handleValueChange}
          keyboardType={'phone-pad'}
          onBlur={() => setActive(false)}
          onFocus={() => setActive(true)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

SearchRecipientInput.propTypes = {
  value: PropTypes.string,
  onValueChange: PropTypes.func,
  loading: PropTypes.bool,
  countryCode: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

SearchRecipientInput.defaultProps = {
  countryCode: PHONE_NUMBER_COUNTRY,
  placeholder: 'Search by mobile phone',
  onValueChange: (value) => {},
};
