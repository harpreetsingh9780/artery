/*
 * HomeScreen
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useCallback, useEffect } from 'react';
import { RefreshControl, View } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { PageView } from '../../Components/PageView';
import { AuthHeader } from '../AuthHeader';
import NavigationService from '../../Services/NavigationService';
import { createStructuredSelector } from 'reselect';
import { usePendingBills } from '../../Hooks/usePendingBills';
import { Lead } from '../../Components/Lead';
import H1 from '../../Components/H1';
import { UserItemSkeletonPlaceholder } from '../../Components/Skeleton';
import { Text } from '../../Components/Text';
import Images from '../../Theme/Images';
import { PayBillsListItem } from '../../Components/PayBillsListItem';
import { BanksService } from '../../Services/BanksService';
import { getSelectedTokenId } from '../../Stores/Config/Selectors';
import style from './style';
import { LineItem } from '../../Components/LineItem';

function PayBillsScreen({ onItemPress, onGoBack, tokenId }) {
  // const { items, loading, fetch } = usePendingBills();

  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(()=>{
    onRefresh()
  },[])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    BanksService.getLinkedBanks(tokenId)
    .then((response) => {
      setItems(response)
      setRefreshing(false);
    })
    .catch((error) => {
      console.log("ERROR ::", error)
      setRefreshing(false);
    });
    // fetch(() => {
    //   setRefreshing(false);
    // });
  }, []);

  return (
    <PageView
      header={<AuthHeader title="My Bank Accounts" onGoBack={onGoBack} />}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={style.header} >
        <Text>My Bank Accounts</Text>
      </View>
      {/* {refreshing && (
        <>
          <UserItemSkeletonPlaceholder />
          <UserItemSkeletonPlaceholder />
          <UserItemSkeletonPlaceholder />
        </>
      )} */}
      {items.map((item) => (
        <LineItem label={item.displayName}  />
      ))}
      {/* <H1 icon={Images.amountIcon} text="Pay Bills" />
      <Lead text="Bills other users requested you to pay." />
      {!items.length && loading && (
        <>
          <UserItemSkeletonPlaceholder />
          <UserItemSkeletonPlaceholder />
          <UserItemSkeletonPlaceholder />
        </>
      )}
      {!items.length && !loading && <Text>Nice job! All bills are paid!</Text>}
      {items.map((item) => (
        <PayBillsListItem key={item.id} item={item} onPress={() => onItemPress(item)} />
      ))} */}
    </PageView>
  );
}

PayBillsScreen.propTypes = {
  onGoBack: PropTypes.func,
  activity: PropTypes.object,
  onItemPress: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  tokenId: getSelectedTokenId,
  // items: getActivitySelector, // todo move requests to global state so pending item count would be accessable?
});

const mapDispatchToProps = () => ({
  onItemPress: (item) =>
    NavigationService.navigate('SendMoneyAmountScreen', {
      recipient: item.requestor,
      amount: item.amount,
      requestId: item.id,
    }),
    onGoBack: () => NavigationService.navigateToHome(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(PayBillsScreen);
