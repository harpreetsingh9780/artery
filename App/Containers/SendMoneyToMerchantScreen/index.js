import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { PageView } from '../../Components/PageView';
import H1 from '../../Components/H1';
import { AuthHeader } from '../AuthHeader';
import Images from '../../Theme/Images';
import { Lead } from '../../Components/Lead';
import { createStructuredSelector } from 'reselect';
import { Footer } from '../../Components/Footer';
import { Button } from '../../Components/Button';
import NavigationService from '../../Services/NavigationService';
import { LineItem } from '../../Components/LineItem';
import { getSelectedBankSelector } from '../../Stores/Banks/Selectors';
import { Alert } from '../../Utils/Alert';
import { BanksService } from '../../Services/BanksService';
import { getSelectedTokenId } from '../../Stores/Config/Selectors';
import { convertCents } from '../../Utils/Helpers';
import { BalanceActions } from '../../Stores/Balance/Actions';
import { UserService } from '../../Services/UserService';
import { ReceiptProductList } from '../../Components/ReceiptProductList';
import {
  ListItemSkeletonPlaceholder,
  UserItemSkeletonPlaceholder,
} from '../../Components/Skeleton';
import { AmountRenderer } from '../../Components/AmountRenderer';
import { ReceiverRenderer } from '../../Components/ReceiverRenderer';
import BankAccountSelector from '../BankAccountSelector';
import FormErrors from '../../Components/FormErrors';
import { Tip } from '../../Components/Tip';

function SendMoneyToMerchantScreen({ navigation, back, bankAccount, tokenId, updateBalances, activityScreen }) {
  const [recipient, setRecipient] = useState(null);
  const [data, setData] = useState(null);
  const [tip, setTip] = useState(0);

  const [state, setState] = useState({
    prepareLoading: true,
    prepareError: null,
    loading: false,
    error: null,
  });

  const preparePayment = useCallback(
    (data) => {
      setState((prevState) => ({ ...prevState, prepareLoading: true }));
      UserService.getUserUsingHandle(data.properties.merchantHandle)
        .then((response) => {
          setRecipient(response);
          setState((prevState) => ({ ...prevState, prepareLoading: false, prepareError: null }));
        })
        .catch((error) => {
          setState((prevState) => ({ ...prevState, prepareLoading: false, prepareError: error }));
          NavigationService.back();
        });
    },
    [recipient]
  );

  useEffect(() => {
    preparePayment(navigation.getParam('qrCodeData'));
    setData(navigation.getParam('qrCodeData').properties);
  }, [navigation.state.params]);

  const doPayment = useCallback(() => {
    setState((prevState) => ({ ...prevState, loading: true }));
    BanksService.purchase({
      receiverUserId: recipient?.id,
      amount: data?.totalCents, 
      clientPurchaseId: data?.clientPurchaseId,
      fundingSourceId: bankAccount?.referenceId,
      fundingPaymentProcessorId: bankAccount?.paymentProcessorId,
      // tokenId,   //  Will uncomment in future
      tipAmount: tip,
      receiptItems: data.receipt ? 
      data.receipt
        .filter((item) => item.type === 'product')
        .map((item) => ({
          name: item.item,
          type: item.type,
          quantity: item.quantity,
          perItemCents: item.per_item_cents,
          extendedCents: item.extendedCents,
        })) : null,
    })
      .then(() => {
        setState((prevState) => ({ ...prevState, loading: false, error: null }));
        activityScreen();
        // NavigationService.navigateToSuccess({
        //   header: 'Money Sent',
        //   title: "You'are all set",
        //   description:
        //     "You're ready to make purchases and start earning rewards at your favorite dispensaries.",
        //   items: [
        //     [recipient.firstName, recipient.lastName].join(' '),
        //     `$${convertCents(data?.totalCents)}`,
        //     bankAccount.displayName,
        //   ],
        // });
        updateBalances();
      })
      .catch((error) => {
        setState((prevState) => ({ ...prevState, loading: false, error: error }));
      }); 
  }, [setState, recipient, bankAccount, data, tip]);

  const handleSubmit = useCallback(() => {
    setState((prevState) => ({ ...prevState, loading: true, error: null }));
    Alert.confirm({
      title: 'Are you sure?',
      message: "Once you send money, your payment can't be cancelled.",
      onConfirm: () => {
        doPayment();
      },
      onDismiss: () => {
        setState((prevState) => ({ ...prevState, loading: false }));
      },
    });
  }, [setState, recipient, bankAccount, data, tip]);

  const _goBack = () => {
    navigation.getParam('setPreviousScanning')(true);
    back()
  }

  return (
    <PageView
      header={<AuthHeader title="Send Money" onGoBack={_goBack} />}
      footer={
        <Footer>
          <Button
            text="Make Purchase"
            intent="primary"
            onPress={() => handleSubmit()}
            loading={state.loading}
            disabled={state.loading || !recipient?.id || data?.totalCents <= 0}
          />
        </Footer>
      }
    >
      <H1 text="Review Your Purchase" icon={Images.amountIcon} />
      <Lead text="Confirm the amount you are spending and tap the Make Purchase button. It's that easy." />
      {(state.prepareLoading || !recipient || !data) && (
        <>
          <UserItemSkeletonPlaceholder />
          <ListItemSkeletonPlaceholder />
          <ListItemSkeletonPlaceholder />
        </>
      )}
      {!(state.prepareLoading || !recipient || !data) && (
        <>
          <ReceiverRenderer user={recipient} />
          <AmountRenderer amountCents={data.totalCents} />
          <BankAccountSelector />
          {state.error && <FormErrors error={state.error} />}
          {data?.receipt && (
            <ReceiptProductList
              items={data.receipt.map((item) => ({
                name: item.item,
                quantity: item.quantity,
                price: `$${convertCents(item.extendedCents)}`,
              }))}
            />
          )}
          <LineItem label="Tip: " text={`$${convertCents(tip)}`} space />
          <LineItem label="Total: " text={`$${convertCents(data.totalCents + tip)}`} space />
          <Tip changeTip={(tip)=> setTip(tip)} />
        </>
      )}
    </PageView>
  );
}

SendMoneyToMerchantScreen.propTypes = {
  tokenId: PropTypes.string,
  bankAccount: PropTypes.object,
  navigation: PropTypes.object,
  back: PropTypes.func,
  updateBalances: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  tokenId: getSelectedTokenId,
  bankAccount: getSelectedBankSelector,
});

const mapDispatchToProps = (dispatch) => ({
  back: () => NavigationService.back(),
  next: (params) => NavigationService.navigate('SendMoneyAmountScreen', { params }),
  updateBalances: () => dispatch(BalanceActions.balance()),
  activityScreen: () => NavigationService.navigate('ActivityScreen')
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(SendMoneyToMerchantScreen);
