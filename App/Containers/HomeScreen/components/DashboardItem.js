import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Image } from 'react-native';
import { Colors } from '../../../Theme';
import NavigationService from '../../../Services/NavigationService';
import { Text } from '../../../Components/Text';
import { ButtonArea } from '../../../Components/Button/ButtonArea';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '50%',
  },
  button: {
    height: 141,
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 4,
    backgroundColor: Colors.white,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  imageWrapper: {
    marginBottom: 10,
  },
  image: {
    width: 36,
    height: 36,
  },
  title: {
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 7,
  },
  description: {
    lineHeight: 12,
    textAlign: 'center',
  },
});

function DashboardItem({ image, title, description, to }) {
  const onButtonPress = () => {
    NavigationService.navigate(to);
  };

  return (
    <View style={styles.container}>
      <ButtonArea onPress={onButtonPress}>
        <View style={styles.button}>
          <View style={styles.imageWrapper}>
            <Image source={image} style={styles.image} />
          </View>
          <Text style={styles.title} color={Colors.blue} size={14} weight="medium">
            {title}
          </Text>
          <Text style={styles.description} color={Colors.dark} size={12}>
            {description}
          </Text>
        </View>
      </ButtonArea>
    </View>
  );
}

DashboardItem.propTypes = {
  image: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default DashboardItem;
