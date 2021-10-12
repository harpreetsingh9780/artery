import React, { useCallback, forwardRef, useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../../Theme';
import { Text } from '../Text';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: Colors.inputBorder,
  },
  containerActive: {
    marginTop: 20,
    borderBottomColor: Colors.blue,
  },
  label: {
    fontSize: 16,
    color: Colors.inputText,
    opacity: 1,
    lineHeight: 20,
    position: 'absolute',
    transform: [{ translateY: 7 }],
  },
  labelActive: {
    color: Colors.blue,
    transform: [{ translateY: -15 }],
  },
  labelFilled: {
    opacity: 0,
    transform: [{ translateY: -15 }],
  },
  input: {
    borderWidth: 0,
    backgroundColor: Colors.transparent,
    lineHeight: 20,
    height: 35,
    fontSize: 16,
    padding: 0,
    color: Colors.inputText,
    fontFamily: 'SFRounded-Ultralight_1',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column: {
    flexGrow: 0,
    flexShrink: 0,
  },
  inputColumn: {
    flexGrow: 1,
    flexShrink: 0,
  },
});

export const Input = forwardRef(function Input(props, ref) {
  const [active, setActive] = useState(false);
  const [filled, setFilled] = useState(false);
  const [keyboardType, setKeyboardType] = useState('default');

  useEffect(() => {
    setFilled(!!String(props.value).length);
  }, [props.value, setFilled]);

  useEffect(() => {
    switch (props.type) {
      case 'number':
        setKeyboardType('number-pad');
        break;
      case 'email':
        setKeyboardType('email-address');
        break;
      case 'phone':
        setKeyboardType('phone-pad');
        break;
      default:
        setKeyboardType('default');
        break;
    }
  }, [props.type]);

  const handleValueChange = useCallback(
    (text) => {
      props.onValueChange(text);
    },
    [props.onValueChange]
  );

  return (
    <View style={[styles.container, props.containerStyle, active ? styles.containerActive : {}]}>
      <View style={styles.row}>
        {props.left && <View style={styles.column}>{props.left}</View>}
        <View style={styles.inputColumn}>
          <Text
            weight="medium"
            style={[
              styles.label,
              active ? styles.labelActive : {},
              !active && filled ? styles.labelFilled : {},
            ]}
          >
            {props.title}
          </Text>
          <TextInput
            style={styles.input}
            value={props.value || undefined}
            ref={ref}
            onChangeText={handleValueChange}
            secureTextEntry={props.type === 'password'}
            keyboardType={keyboardType}
            onBlur={() => setActive(false)}
            onFocus={() => setActive(true)}
          />
        </View>
        {props.right && <View style={styles.column}>{props.right}</View>}
      </View>
    </View>
  );
});

Input.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'phone']),
  onValueChange: PropTypes.func,
  right: PropTypes.node,
  left: PropTypes.node,
  containerStyle: PropTypes.object,
};

Input.defaultProps = {
  title: 'Enter',
  placeholder: null,
  type: 'text',
  onValueChange: (value) => {},
  right: null,
  left: null,
  containerStyle: {},
};
