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
import { AmountInput } from '../../Components/AmountInput';
import { getSelectedBankSelector } from '../../Stores/Banks/Selectors';
import { Alert } from '../../Utils/Alert';
import { BanksService } from '../../Services/BanksService';
import { getSelectedTokenId } from '../../Stores/Config/Selectors';
import FormErrors from '../../Components/FormErrors';
import { convertCents } from '../../Utils/Helpers';
import { BalanceActions } from '../../Stores/Balance/Actions';
import BankAccountSelector from '../BankAccountSelector';
import { ReceiverRenderer } from '../../Components/ReceiverRenderer';
import {
  ListItemSkeletonPlaceholder,
  UserItemSkeletonPlaceholder,
} from '../../Components/Skeleton';
import { UserService } from '../../Services/UserService';
import { AmountRenderer } from '../../Components/AmountRenderer';

function SendMoneyAmountScreen({ navigation, back, bankAccount, tokenId, updateBalances }) {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState(null);
  const [requestId, setRequestId] = useState(null);

  const [state, setState] = useState({
    lockAmount: false,
    preparing: false,
    loading: false,
    error: null,
  });

  const preparePayment = useCallback((data) => {
    setState((prevState) => ({ ...prevState, preparing: true }));
    UserService.getUserUsingHandle(data.properties.merchantHandle)
      .then((response) => {
        setRecipient(response);
        setState((prevState) => ({ ...prevState, preparing: false, error: null }));
      })
      .catch((error) => {
        setState((prevState) => ({ ...prevState, preparing: false, error }));
      });
  }, []);

  useEffect(() => {
    const _qrData = navigation.getParam('qrCodeData');
    const _recipient = navigation.getParam('recipient');
    const _amount = navigation.getParam('amount');
    const _requestId = navigation.getParam('requestId');
    if (_recipient) {
      setRecipient(_recipient);
    }

    if (_amount) {
      setAmount((Number(_amount) / 100).toString());
      setState((prevState) => ({ ...prevState, lockAmount: true }));
    }

    if (_requestId) {
      setRequestId(_requestId);
    }

    if (_qrData) {
      setRequestId(_qrData.properties.clientPurchaseId);
      preparePayment(_qrData);
    }
  }, [navigation.state.params]);

  const doPayment = useCallback(() => {
    setState((prevState) => ({ ...prevState, loading: true }));
    BanksService.sendMoney({
      receiverUserId: recipient?.id,
      amount,
      // requestId,
      fundingSourceId: bankAccount?.referenceId,
      fundingPaymentProcessorId: bankAccount?.paymentProcessorId,
      tokenId,
    })
      .then(() => {
        setState((prevState) => ({ ...prevState, loading: false, error: null }));
        NavigationService.navigateToSuccess({
          header: 'Money Sent',
          title: "You'are all set",
          description:
            "You're ready to make purchases and start earning rewards at your favorite dispensaries.",
          items: [
            [recipient.firstName, recipient.lastName].join(' '),
            `$${convertCents(Number(amount) * 100)}`,
            bankAccount.displayName,
          ],
        });
        updateBalances();
      })
      .catch((error) => {
        setState((prevState) => ({ ...prevState, loading: false, error: error }));
      });
  }, [setState, recipient, amount, requestId, bankAccount]);

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
  }, [setState, recipient, amount, requestId, bankAccount]);

  return (
    <PageView
      header={<AuthHeader title="Send Money" onGoBack={() => back()} />}
      footer={
        <Footer>
          <Button
            text="Send Money"
            intent="primary"
            onPress={() => handleSubmit()}
            loading={state.loading}
            disabled={state.loading || !recipient?.id || amount <= 0}
          />
        </Footer>
      }
    >
      <H1 text="Enter an Amount" icon={Images.amountIcon} />
      <Lead text="Confirm the amount you want to send and tap the Send Money button. It's that easy." />
      {(state.preparing || !recipient) && (
        <>
          <UserItemSkeletonPlaceholder />
          <ListItemSkeletonPlaceholder />
          <ListItemSkeletonPlaceholder />
        </>
      )}
      {!state.preparing && recipient && (
        <>
          <ReceiverRenderer user={recipient} />
          {state.lockAmount ? (
            <AmountRenderer amountCents={amount * 100} />
          ) : (
            <AmountInput title="Amount" value={amount} onValueChange={(text) => setAmount(text)} />
          )}
          <BankAccountSelector />
        </>
      )}
      {state.error && <FormErrors error={state.error} />}
    </PageView>
  );
}

SendMoneyAmountScreen.propTypes = {
  tokenId: PropTypes.number,
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
  updateBalances: () => dispatch(BalanceActions.balance()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(SendMoneyAmountScreen);
