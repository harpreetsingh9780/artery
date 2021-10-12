/*
 * HomeScreen
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { PageView } from '../../Components/PageView';
import H1 from '../../Components/H1';
import { AuthHeader } from '../AuthHeader';
import NavigationService from '../../Services/NavigationService';
import Images from '../../Theme/Images';
import { Lead } from '../../Components/Lead';
import { Footer } from '../../Components/Footer';
import { Button } from '../../Components/Button';
import { AmountInput } from '../../Components/AmountInput';
import { Input } from '../../Components/Input';
import FormErrors from '../../Components/FormErrors';
import { BanksService } from '../../Services/BanksService';
import { convertCents } from '../../Utils/Helpers';

function RequestMoneyAmountScreen({ onGoBack, navigation }) {
  const recipient = navigation.getParam('recipient');
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRequest = useCallback(() => {
    setLoading(true);

    BanksService.requestMoney(recipient.id, amount, reference)
      .then(() => {
        setLoading(false);
        setError(null);
        NavigationService.navigateToSuccess({
          header: 'Request Money',
          title: 'Request Sent',
          description: 'Payment request was successfully sent.',
          items: [
            [recipient.firstName, recipient.lastName].join(' '),
            `$${convertCents(amount * 100)}`,
            reference || null,
          ],
        });
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        console.error(error);
      });
  }, [recipient, amount, reference]);

  return (
    <PageView
      header={<AuthHeader title="Request Money" onGoBack={onGoBack} />}
      footer={
        <Footer>
          <Button
            text="Request"
            intent="primary"
            onPress={() => handleRequest()}
            disabled={!recipient?.id || amount <= 0 || loading}
            loading={loading}
          />
        </Footer>
      }
    >
      <H1 text="Request Payment" icon={Images.requestMoneyNavIcon} />
      <Lead text="Provide amount and invoice reference if needed." />
      <AmountInput title="Amount" value={amount} onValueChange={(value) => setAmount(value)} />
      <Input
        title="Invoice reference"
        value={reference}
        onValueChange={(value) => setReference(value)}
      />
      <FormErrors error={error} />
    </PageView>
  );
}

RequestMoneyAmountScreen.propTypes = {
  onGoBack: PropTypes.func,
  navigation: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
  onGoBack: () => NavigationService.back(),
  next: (recipient) => {},
});

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default compose(withConnect)(RequestMoneyAmountScreen);
