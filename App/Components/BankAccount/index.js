import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from '../Text';
import { Colors } from '../../Theme';
import { ButtonArea } from '../Button/ButtonArea';
import Images from '../../Theme/Images';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    paddingVertical: 15,
  },
  text: {
    lineHeight: 16,
  },
  activeText: {
    color: Colors.blue,
  },
  image: {
    marginLeft: 10,
    height: 16,
    width: 16,
  },
});

export function BankAccount({ item, active, onPress }) {
  return (
    <ButtonArea onPress={() => onPress(item)}>
      <View style={[styles.container]}>
        <Text
          style={[styles.text, active ? styles.activeText : {}]}
          weight="medium"
          size={14}
          numberOfLines={1}
        >
          {item.displayName}
        </Text>
        {active && <Image source={Images.checkmarkIcon} style={styles.image} />}
      </View>
    </ButtonArea>
  );
}

BankAccount.propTypes = {
  item: PropTypes.object,
  active: PropTypes.bool,
  onPress: PropTypes.func,
};
