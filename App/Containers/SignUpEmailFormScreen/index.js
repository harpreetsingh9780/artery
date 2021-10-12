/**
 *
 * LoginScreen
 *
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from '../../Components/Input';
import H1 from '../../Components/H1';
import Images from '../../Theme/Images';
import { PageView } from '../../Components/PageView';
import { Button } from '../../Components/Button';
import { Footer } from '../../Components/Footer';
import Header from '../Header';
import NavigationService from '../../Services/NavigationService';
import { Lead } from '../../Components/Lead';
import { PhoneInput } from '../../Components/PhoneInput';
import { isEmailValid, isPhoneValid } from '../../Utils/Validators';
import FormErrors from '../../Components/FormErrors';
import { LoginService } from '../../Services/LoginService';

function SignUpEmailFormScreen({ next, back }) {
  const [values, setValues] = useState({
    email: '',
    phone: '',
  });
  const [state, setState] = useState({
    loading: false,
    valid: false,
    error: null,
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      ...{ valid: isEmailValid(values.email) && isPhoneValid(values.phone) },
    }));
  }, [values]);

  const handleFormSubmit = useCallback(() => {
    setState((prevState) => ({ ...prevState, loading: true, error: null }));
    LoginService.startPhoneVerify(values)
      .then(({ verificationId }) => {
        setState((prevState) => ({ ...prevState, loading: false, error: null }));
        next(verificationId, values);
      })
      .catch((error) => {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      });
  }, [values, setState]);

  return (
    <PageView
      header={<Header title="Create Account" onGoBack={() => back()} />}
      footer={
        <Footer>
          <Button
            text="Continue"
            onPress={() => handleFormSubmit()}
            intent="primary"
            loading={state.loading}
            disabled={state.loading || !state.valid}
          />
        </Footer>
      }
    >
      <H1 icon={Images.contactIcon} text="Let's Get To Know You" />
      <Lead text="To pay for goods/services and to send/receive money, we need your mobile number and email address." />

      <Input
        title="Email Address"
        type="email"
        value={values.email}
        onValueChange={(text) => setValues((prev) => ({ ...prev, ...{ email: text } }))}
      />
      <PhoneInput
        title="Phone Number"
        value={values.phone}
        onValueChange={(text) => setValues((prev) => ({ ...prev, ...{ phone: text } }))}
      />
      <FormErrors error={state.error} />
    </PageView>
  );
}

SignUpEmailFormScreen.propTypes = {
  next: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  next: (verificationId, values) =>
    NavigationService.navigate('SignUpVerifyPhoneFormScreen', { verificationId, values }),
  back: () => NavigationService.back(),
});

export default connect(
  null,
  mapDispatchToProps
)(SignUpEmailFormScreen);
