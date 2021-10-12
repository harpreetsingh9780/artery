import React, { useCallback, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from '../Text';
import { Colors } from '../../Theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: Colors.black,
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: 5,
  },
  symbol: {
    color: Colors.black,
    fontSize: 55,
    lineHeight: 60,
    height: 60,
    letterSpacing: -0.5,
    marginRight: 5,
    alignContent: 'center',
    flexGrow: 0,
    flexShrink: 0,
  },
  input: {
    color: Colors.black,
    fontSize: 55,
    lineHeight: 60,
    height: 60,
    letterSpacing: -0.5,
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    padding: 0,
  },
  containerActive: {
    borderBottomColor: Colors.blue,
  },
  textActive: {
    color: Colors.blue,
  },
});

export function AmountInput(props) {
  const [active, setActive] = useState(false);

  const handleValueChange = useCallback(
    (value) => {
      if (value === '.') {
        value = '0.';
      } else if (Number(value) < 0) {
        value = '0.00';
      } else if (isNaN(value) && !isNaN(props.value)) {
        value = props.value;
      } else if (isNaN(value)) {
        value = '0.00';
      }
      props.onValueChange(value);
    },
    [props.onValueChange, props.value]
  );

  return (
    <View style={[styles.container, active ? styles.containerActive : {}]}>
      <Text style={[styles.symbol, active ? styles.textActive : {}]}>{props.symbol || '$'}</Text>
      <TextInput
        style={[styles.input, active ? styles.textActive : {}]}
        value={props.value || undefined}
        placeholder="0.00"
        onChangeText={handleValueChange}
        keyboardType="number-pad"
        onBlur={() => setActive(false)}
        onFocus={() => setActive(true)}
      />
    </View>
  );
}

AmountInput.propTypes = {
  value: PropTypes.string,
  onValueChange: PropTypes.func,
  symbol: PropTypes.string,
};

AmountInput.defaultProps = {
  symbol: '$',
  onValueChange: (value) => {},
};
