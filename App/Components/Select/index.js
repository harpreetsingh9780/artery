import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-community/picker';
import PropTypes from 'prop-types';
import { Text } from '../Text';
import { Colors } from '../../Theme';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: Colors.inputBorder,
  },
  label: {
    fontSize: 16,
    color: Colors.inputText,
    opacity: 1,
    lineHeight: 20,
    // position: 'absolute',
    // transform: [{ translateY: 7 }],
  },
  picker: {},
  item: {},
});

export function Select({ value, title, options, onValueChange }) {
  return (
    <View style={[styles.container]}>
      <Text weight="medium" style={[styles.label]}>
        {title}
      </Text>
      <Picker
        selectedValue={value}
        onValueChange={onValueChange}
        style={styles.picker}
        itemStyle={styles.item}
      >
        {options.map((option) => (
          <Picker.Item key={option.value} value={option.value} label={option.label} />
        ))}
      </Picker>
    </View>
  );
}

Select.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array.isRequired,
  title: PropTypes.string,
  onValueChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
  title: 'Select',
};
