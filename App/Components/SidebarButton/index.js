import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { ButtonArea } from '../Button/ButtonArea';
import { Text } from '../Text';
import { Colors } from '../../Theme';
import NavigationService from '../../Services/NavigationService';

const styles = StyleSheet.create({
  button: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
  },
  image: {
    width: 33,
    height: 33,
    marginRight: 15,
  },
  text: {
    lineHeight: 20,
  },
});

export function SidebarButton({ onPress, text, color, icon }) {
  return (
    <ButtonArea onPress={onPress}>
      <View style={styles.button}>
        {icon && <Image source={icon} style={styles.image} />}
        <Text style={styles.text} color={color} size={!icon ? 14 : 18} weight={'medium'}>
          {text}
        </Text>
      </View>
    </ButtonArea>
  );
}

SidebarButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  icon: PropTypes.any,
};

SidebarButton.defaultProps = {
  color: Colors.blue,
  icon: null,
};
