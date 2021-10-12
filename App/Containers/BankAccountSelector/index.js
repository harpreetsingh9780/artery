import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import NavigationService from '../../Services/NavigationService';
import Images from '../../Theme/Images';
import {
  getLinkedBanksSelector,
  getPreloadAccountErrorSelector,
  getPreloadAccountLoadingSelector,
  getSelectedBankIdSelector,
} from '../../Stores/Banks/Selectors';
import { createStructuredSelector } from 'reselect';
import { ListItemSkeletonPlaceholder } from '../../Components/Skeleton';
import { ButtonArea } from '../../Components/Button/ButtonArea';
import { Text } from '../../Components/Text';
import { Colors } from '../../Theme';

function BankAccountSelector(props) {
  const [accountName, setAccountName] = useState('Choose bank account');

  useEffect(() => {
    const find = props.bankAccountList.find(
      (item) => item.referenceId === props.selectedBankAccount
    );

    if (!find?.displayName) {
      setAccountName('Choose bank account');
    } else {
      setAccountName(find.displayName);
    }
  }, [props.bankAccountList, props.selectedBankAccount]);

  return (
    <>
      {props.loading && <ListItemSkeletonPlaceholder />}
      {!props.loading && !props.bankAccountList && (
        <ButtonArea onPress={() => props.onOpenLinkBankAccount()}>
          <View style={styles.container}>
            <Text style={styles.text} weight="medium" color={Colors.blue}>
              Link your bank account
            </Text>
            <Image source={Images.linkBankAccountIcon} style={styles.icon} />
          </View>
        </ButtonArea>
      )}
      {!props.loading && props.bankAccountList && (
        <ButtonArea onPress={() => props.onOpenSelector()}>
          <View style={styles.container}>
            <Text style={styles.text} weight="medium" color={Colors.blue} numberOfLines={1}>
              {accountName}
            </Text>
            <Image source={Images.forwardArrowIcon} style={styles.icon} />
          </View>
        </ButtonArea>
      )}
    </>
  );
}

BankAccountSelector.propTypes = {
  bankAccountList: PropTypes.array,
  selectedBankAccount: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.any,
  onOpenLinkBankAccount: PropTypes.func,
  onOpenSelector: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  bankAccountList: getLinkedBanksSelector,
  selectedBankAccount: getSelectedBankIdSelector,
  loading: getPreloadAccountLoadingSelector,
  error: getPreloadAccountErrorSelector,
});

const mapDispatchToProps = () => ({
  onOpenSelector: () => NavigationService.navigate('BankAccountSelectorScreen'),
  onOpenLinkBankAccount: () => NavigationService.navigate('LinkBankAccountScreen'),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(BankAccountSelector);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: Colors.lightBlue,
    borderTopColor: Colors.lightBlue,
    alignItems: 'center',
  },
  text: {
    flexShrink: 1,
    flexGrow: 1,
    flex: 1,
    lineHeight: 28,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
    flexGrow: 0,
    flexShrink: 0,
  },
});
