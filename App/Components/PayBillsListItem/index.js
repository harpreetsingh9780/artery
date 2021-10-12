import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from '../Text';
import { Colors } from '../../Theme';
import Images from '../../Theme/Images';
import { convertCents, convertDate } from '../../Utils/Helpers';
import { ButtonArea } from '../Button/ButtonArea';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    paddingVertical: 20,
  },
  leftView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 36,
    height: 36,
    marginRight: 9,
  },
  rightView: {},
  textRight: {
    textAlign: 'right',
  },
});

export function PayBillsListItem({ item, onPress }) {
  return (
    <ButtonArea onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.leftView}>
          <Image source={Images.amountIcon} style={styles.image} />
          <View>
            <Text style={styles.text} weight="medium" size={14} color={Colors.blue}>
              {item.requestor?.firstName} {item.requestor?.lastName}
            </Text>
            <Text style={styles.text} size={14} color={Colors.dark}>
              {convertDate(item.createdAt)}
            </Text>
          </View>
        </View>
        <View style={styles.rightView}>
          <Text
            style={[styles.textRight, styles.text]}
            weight="medium"
            size={14}
            color={Colors.blue}
          >
            {convertCents(item.amount)}
          </Text>
          <Text style={[styles.textRight, styles.text]} size={14} color={Colors.dark}>
            {item.status}
          </Text>
        </View>
      </View>
    </ButtonArea>
  );
}

PayBillsListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onPress: PropTypes.func.isRequired,
};
