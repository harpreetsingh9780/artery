import React from 'react';
import { View, TouchableHighlight, StyleSheet, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../../Theme';
import { Text } from '../Text';
import { ButtonArea } from './ButtonArea';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  button: {
    padding: 19,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.blue,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: Colors.blue,
  },
  buttonDanger: {},
  buttonDisabled: {
    backgroundColor: Colors.gray,
    borderColor: Colors.gray,
  },
  text: {
    fontSize: 14,
    lineHeight: 14,
    color: Colors.blue,
  },
  textPrimary: {
    color: Colors.white,
  },
  textDanger: {},
  textDisabled: {
    color: Colors.dark,
  },
  indicator: {
    marginLeft: 15,
    width: 16,
    height: 16,
  },
});

export function Button({ text, intent, disabled, loading, onPress }) {
  const getStyles = () => {
    const btn = [styles.button];
    const txt = [styles.text];
    switch (intent) {
      case 'primary':
        btn.push(styles.buttonPrimary);
        txt.push(styles.textPrimary);
        break;
      case 'danger':
        btn.push(styles.buttonDanger);
        txt.push(styles.textDanger);
        break;
    }

    if (disabled) {
      btn.push(styles.buttonDisabled);
      txt.push(styles.textDisabled);
    }

    return { btn, txt };
  };

  return (
    <View style={styles.container}>
      <ButtonArea onPress={onPress} disabled={disabled}>
        <View style={getStyles().btn}>
          <Text style={getStyles().txt} weight="medium">
            {text}
          </Text>
          {loading && <ActivityIndicator size={16} style={styles.indicator} color={Colors.white} />}
        </View>
      </ButtonArea>
    </View>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  intent: PropTypes.oneOf(['default', 'primary', 'danger']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onPress: PropTypes.func,
};

Button.defaultProps = {
  intent: 'default',
  disabled: false,
  loading: false,
};
