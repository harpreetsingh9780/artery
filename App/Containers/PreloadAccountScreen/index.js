/*
 * HomeScreen
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { PageView } from '../../Components/PageView';
import H1 from '../../Components/H1';
import { AuthHeader } from '../AuthHeader';
import NavigationService from '../../Services/NavigationService';
import Images from '../../Theme/Images';
import { Lead } from '../../Components/Lead';
import { Select } from '../../Components/Select';
import { Footer } from '../../Components/Footer';
import { Button } from '../../Components/Button';
import { Alert } from '../../Utils/Alert';
import { getSelectedTokenId, getTokenListSelector } from '../../Stores/Config/Selectors';
import { AmountInput } from '../../Components/AmountInput';
import {
  getPreloadAccountErrorSelector,
  getPreloadAccountLoadingSelector,
  getSelectedBankSelector,
} from '../../Stores/Banks/Selectors';
import { createStructuredSelector } from 'reselect';
import { BanksActions } from '../../Stores/Banks/Actions';
import FormErrors from '../../Components/FormErrors';
import { BanksService } from '../../Services/BanksService';
import { convertCents } from '../../Utils/Helpers';
import BankAccountSelector from '../BankAccountSelector';

function PreloadAccountScreen(props) {
  const [to, setTo] = useState(props.defaultToken);
  const [amount, setAmount] = useState('');

  const [tokenList, setTokenList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setTokenList(props.tokenList.map((item) => ({ value: item.id, label: item.name })));
  }, [props.tokenList]);

  const handleSubmit = () => {
    setLoading(true);
    Alert.confirm({
      onConfirm: () => {
        handleRequest();
        // props.submit(to, account, amount);
      },
      onDismiss: () => {
        setLoading(false);
      },
    });
  };

  const handleRequest = useCallback(() => {
    setLoading(true);
    BanksService.purchaseTokens({
      amount,
      tokenId: to,
      sourceId: props.bankAccount.referenceId,
      paymentProcessorId: props.bankAccount.paymentProcessorId,
    })
      .then(() => {
        setLoading(false);
        setError(null);
        NavigationService.navigateToSuccess({
          header: 'Preload Account',
          description: "Your money is on it's way!",
          items: [`$${convertCents(amount * 100)}`],
        });
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, [amount, to, props.bankAccount]);

  return (
    <PageView
      header={<AuthHeader title="Preload Account" onGoBack={props.onGoBack} />}
      footer={
        <Footer>
          <Button
            text="Preload Account"
            intent="primary"
            onPress={handleSubmit}
            disabled={amount <= 0 || loading || !to || !props.bankAccount}
            loading={loading}
          />
        </Footer>
      }
    >
      <H1 text="Preload Account" icon={Images.sendMoneyNavIcon} />
      <Lead text="Load $100 and get another $5 on us." />
      <Select
        title="To to preload"
        options={tokenList}
        value={to}
        onValueChange={(value) => setTo(value)}
      />
      <AmountInput value={amount} onValueChange={(value) => setAmount(value)} />
      <BankAccountSelector />
      <FormErrors error={error} />
    </PageView>
  );
}

PreloadAccountScreen.propTypes = {
  onGoBack: PropTypes.func,
  submit: PropTypes.func,
  tokenList: PropTypes.array,
  defaultToken: PropTypes.number,
  bankAccount: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  tokenList: getTokenListSelector,
  defaultToken: getSelectedTokenId,
  bankAccount: getSelectedBankSelector,
  loading: getPreloadAccountLoadingSelector,
  error: getPreloadAccountErrorSelector,
});

const mapDispatchToProps = (dispatch) => ({
  onGoBack: () => NavigationService.navigate('HomeScreen'),
  submit: (tokenId, account, amount) =>
    dispatch(
      BanksActions.preloadAccount(tokenId, account.referenceId, account.paymentProcessorId, amount)
    ),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(PreloadAccountScreen);
