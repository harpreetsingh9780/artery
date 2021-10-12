import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../../Theme';
import { Text } from '../Text';
import { ButtonArea } from '../Button/ButtonArea';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 10,
    lineHeight: 10,
    color: Colors.blue,
  },
  image: {
    marginBottom: 7,
  },
});

export function HomeFooterItem({ title, image, onPress }) {
  return (
    <ButtonArea onPress={onPress}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <Text style={styles.title} weight="medium">{title}</Text>
      </View>
    </ButtonArea>
  );
}

HomeFooterItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
  onPress: PropTypes.func.isRequired,
};
HomeFooterItem.defaultProps = {};
