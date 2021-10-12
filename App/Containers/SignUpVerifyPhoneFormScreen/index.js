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
import { stringifyPhoneNumber } from '../../Utils/Helpers';
import { LoginService } from '../../Services/LoginService';
import { ButtonArea } from '../../Components/Button/ButtonArea';
import { Text } from '../../Components/Text';
import { Colors } from '../../Theme';
import { Alert } from '../../Utils/Alert';

function SignUpVerifyPhoneFormScreen({ next, back, navigation }) {
  const [payload, setPayload] = useState({
    email: '',
    phone: '',
  });
  const [values, setValues] = useState({
    verificationId: navigation.getParam('verificationId').toString(),
    verificationCode: '',
  });
  const [state, setState] = useState({
    loading: false,
    valid: false,
    error: null,
  });

  useEffect(() => {
    setValues((prevState) => ({
      ...prevState,
      verificationId: navigation.getParam('verificationId').toString(),
    }));
    const { email, phone } = navigation.getParam('values');
    setPayload((prevState) => ({ ...prevState, ...{ email, phone } }));
  }, [navigation]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      ...{ valid: values.verificationId.length > 0 && values.verificationCode.length >= 6 },
    }));
  }, [values]);

  const handleFormSubmit = useCallback(() => {
    setState((prevState) => ({ ...prevState, loading: true, error: null }));
    LoginService.finishPhoneVerify({
      verificationId: Number(values.verificationId),
      verificationCode: values.verificationCode,
    })
      .then(({ verified }) => {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: !verified ? 'Verification code is invalid.' : null,
        }));
        if (verified) {
          next({ ...payload, ...values });
        }
      })
      .catch((error) => {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      });
  }, [values, setState]);

  const handleCodeResend = useCallback(() => {
    setState((prevState) => ({ ...prevState, error: null }));
    LoginService.startPhoneVerify(payload)
      .then(({ verificationId }) => {
        setState((prevState) => ({ ...prevState, error: null }));
        setValues((prevState) => ({ ...prevState, verificationId: verificationId.toString() }));
        Alert.success({ message: 'New code was sent.' });
      })
      .catch((error) => {
        setState((prevState) => ({ ...prevState, error }));
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
      <H1 icon={Images.contactIcon} text="Verify Your Number" />
      <Lead text="Check your messages and enter the 6-digit code we just sent you." />

      <Input
        title="6-digit code"
        type="number"
        value={values.verificationCode}
        onValueChange={(text) => setValues((prev) => ({ ...prev, ...{ verificationCode: text } }))}
      />

      <FormErrors error={state.error} />

      <ButtonArea onPress={() => handleCodeResend()}>
        <Text color={Colors.blue}>Send a new code</Text>
      </ButtonArea>
    </PageView>
  );
}

SignUpVerifyPhoneFormScreen.propTypes = {
  next: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  next: (payload) => NavigationService.navigate('SignUpDetailsFormScreen', { payload }),
  back: () => NavigationService.back(),
});

export default connect(
  null,
  mapDispatchToProps
)(SignUpVerifyPhoneFormScreen);
