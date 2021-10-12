import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { ButtonArea } from '../Button/ButtonArea';
import { Text } from '../Text';
import { Colors } from '../../Theme';

const styles = StyleSheet.create({
  button: {
    flex: 1,
  },
  container: {
    borderWidth: 1,
    borderColor: Colors.blue,
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexGrow: 1,
    width: '100%',
    alignSelf: 'stretch',
  },
  activeContainer: {
    backgroundColor: Colors.blue,
  },
  text: {
    color: Colors.blue,
    lineHeight: 16,
    textAlign: 'center',
  },
  activeText: {
    color: Colors.white,
  },
});

export function TabButton({ text, active, onPress }) {
  return (
    <ButtonArea onPress={onPress} style={styles.button}>
      <View style={[styles.container, active ? styles.activeContainer : {}]}>
        <Text style={[styles.text, active ? styles.activeText : {}]} weight="medium">
          {text}
        </Text>
      </View>
    </ButtonArea>
  );
}

TabButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  active: PropTypes.bool,
};
