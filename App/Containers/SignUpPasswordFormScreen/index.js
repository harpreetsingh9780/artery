import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet } from 'react-native';
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
import FormErrors from '../../Components/FormErrors';
import { LoginService } from '../../Services/LoginService';
import { Text } from '../../Components/Text';
import { Colors } from '../../Theme';
import { BulletListItem } from '../../Components/BulltetListItem';
import { LoginActions } from '../../Stores/Login/Actions';

const styles = StyleSheet.create({
  passwordMatch: {
    marginTop: 19,
    bottom: 5,
  },
  rule: {
    color: Colors.dark,
  },
  ruleValid: {
    color: Colors.success,
  },
});

function SignUpPasswordFormScreen({ next, back, navigation }) {
  const [values, setValues] = useState({
    password: '',
    passwordConfirmation: '',
  });
  const [state, setState] = useState({
    loading: false,
    length: false,
    uppercase: false,
    lowercase: false,
    special: false,
    number: false,
    match: false,
    valid: false,
    error: null,
  });

  useEffect(() => {
    const length = values.password && values.password.length >= 8;
    const uppercase = values.password && new RegExp('(.*[A-Z].*)').test(values.password);
    const lowercase = values.password && new RegExp('(.*[a-z].*)').test(values.password);
    const special = values.password && new RegExp('(?=.*\\W)').test(values.password);
    const number = values.password && new RegExp('(?=.*\\d)').test(values.password);
    const match = values.password && values.password === values.passwordConfirmation;
    setState((prevState) => ({
      ...prevState,
      length,
      uppercase,
      lowercase,
      special,
      number,
      match,
      valid: length && uppercase && lowercase && special && number && match,
    }));
  }, [values]);

  const handleFormSubmit = useCallback(() => {
    setState((prevState) => ({ ...prevState, loading: true, error: null }));

    const payload = {
      ...navigation.getParam('payload'),
      ...{
        password: values.password,
        merchant: false,
        merchantLegalName: null,
        merchantDba: null,
      },
    };
    
    LoginService.createAccount(payload)
      .then((response) => {
        setState((prevState) => ({ ...prevState, loading: false, error: null }));
        next(payload, response);
      })
      .catch((error) => {
        setState((prevState) => ({ ...prevState, loading: false, error }));
      });
  }, [values, setState]);

  const useStyle = (rule) => (rule ? styles.ruleValid : styles.rule);

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
      <H1 icon={Images.recipientIcon} text="Create a Password" />
      <Lead text="To mitigate the potential of fraud, we recommend that you create a strong password." />

      <Input
        title="Password"
        type="password"
        value={values.password}
        onValueChange={(text) => setValues((prev) => ({ ...prev, ...{ password: text } }))}
      />

      <Input
        title="Confirm Password"
        type="password"
        value={values.passwordConfirmation}
        onValueChange={(text) =>
          setValues((prev) => ({ ...prev, ...{ passwordConfirmation: text } }))
        }
      />

      {state.error && <FormErrors error={state.error} />}

      <Text weight="bold" color={Colors.dark} style={styles.passwordMatch}>
        Password must contain
      </Text>

      <BulletListItem text="At least 8 characters" style={useStyle(state.length)} />
      <BulletListItem text="At least 1 uppercase letter (A-Z)" style={useStyle(state.uppercase)} />
      <BulletListItem text="At least 1 lowercase letter (a-z)" style={useStyle(state.lowercase)} />
      <BulletListItem text="At least 1 special character" style={useStyle(state.special)} />
      <BulletListItem text="At least 1 number (0-9)" style={useStyle(state.number)} />
      <BulletListItem text="Password match" style={useStyle(state.match)} />
    </PageView>
  );
}

SignUpPasswordFormScreen.propTypes = {
  next: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  next: (payload, response) => {
    dispatch(LoginActions.loginSuccess(response));
    NavigationService.navigateAndReset('SignUpWelcomeScreen', { payload, response });
  },
  back: () => NavigationService.back(),
});

export default connect(
  null,
  mapDispatchToProps
)(SignUpPasswordFormScreen);
