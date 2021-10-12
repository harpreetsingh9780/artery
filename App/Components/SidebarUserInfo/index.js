import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { ButtonArea } from '../Button/ButtonArea';
import Images from '../../Theme/Images';
import { Text } from '../Text';
import { Colors } from '../../Theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    paddingTop: 10,
    paddingBottom: 20,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexGrow: 0,
    flexShrink: 0,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  nameText: {
    lineHeight: 18,
  },
  // descriptionText: {
  //   lineHeight: 15,
  //   letterSpacing: 0.5,
  // },
});

export function SidebarUserInfo({ name, description, onPress }) {
  return (
    <ButtonArea onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={Images.recipientIcon} />
          <View style={styles.textContainer}>
            <Text style={styles.nameText} color={Colors.blue} weight={'medium'}>
              {name}
            </Text>
            {/*<Text style={styles.descriptionText} color={Colors.dark}>{description}</Text>*/}
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Image source={Images.settingsIcon} />
        </View>
      </View>
    </ButtonArea>
  );
}

SidebarUserInfo.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  description: PropTypes.string,
};
