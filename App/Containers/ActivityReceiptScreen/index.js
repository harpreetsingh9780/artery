/*
 * HomeScreen
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { PageView } from '../../Components/PageView';
import { AuthHeader } from '../AuthHeader';
import NavigationService from '../../Services/NavigationService';
import { createStructuredSelector } from 'reselect';
import { getActivitySelector } from '../../Stores/Activity/Selectors';
import { LineItem } from '../../Components/LineItem';
import { convertCents, convertDateLong, nameOrHandle } from '../../Utils/Helpers';
import { ReceiptProductList } from '../../Components/ReceiptProductList';

function ActivityReceiptScreen({ navigation, onGoBack }) {
  const item = navigation.getParam('item');

  return (
    <PageView header={<AuthHeader title="Receipt" onGoBack={onGoBack} />}>
      <LineItem label="Date" text={convertDateLong(item.createdAt)} space />
      {item.user && <LineItem label="To" text={nameOrHandle(item.user)} space />}
      <LineItem label="Type" text={item.typeDisplay} space />
      <LineItem label="Amount" text={`$${convertCents(item.amount)}`} space />
      <LineItem label="Status" text={item.statusDisplay} space />
      {item.receiptItems && <ReceiptProductList items={item.receiptItems} />}
    </PageView>
  );
}

ActivityReceiptScreen.propTypes = {
  onGoBack: PropTypes.func,
  navigation: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  activity: getActivitySelector,
});

const mapDispatchToProps = (dispatch) => ({
  onGoBack: () => NavigationService.back(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(ActivityReceiptScreen);
