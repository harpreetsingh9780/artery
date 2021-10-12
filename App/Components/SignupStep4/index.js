/**
 *
 * SignupStep4
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import {
  changePassword,
  changePasswordConfirmation,
  changeStep,
  createAccount,
} from '../../containers/SignUpPage/actions';
import {
  Form,
  FormContainer,
  FormFooter,
  FormFooterButton,
} from '../styled/Form';
import Header from '../../containers/Header';
import H1 from '../H1';
import Lead from '../Lead';
import BaseInput from '../BaseInput';
import FormErrors from '../FormErrors';

const RuleHeader = styled.h3`
  font-family: 'SF Pro Rounded';
  font-size: 1.2rem;
  letter-spacing: 0;
  line-height: 1.5rem;
  font-weight: 700;
  color: #65677b;
  margin-top: 1.9rem;
  margin-bottom: 0.5rem;
`;

const RuleList = styled.ul`
  padding-left: 1.5rem;
`;
const Rule = styled.li`
  color: ${props => (props.valid ? '#00DD50' : '#65677b')};
  font-family: 'SF Pro Rounded';
  font-size: 1.2rem;
  letter-spacing: 0;
  line-height: 2rem;
`;

function SignupStep4({ dispatch, state, auth }) {
  const [validate, setValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    special: false,
    number: false,
    match: false,
    valid: false,
  });

  useEffect(() => {
    const length = state.password && state.password.length >= 8;
    const uppercase =
      state.password && new RegExp('(.*[A-Z].*)').test(state.password);
    const lowercase =
      state.password && new RegExp('(.*[a-z].*)').test(state.password);
    const special =
      state.password && new RegExp('(?=.*\\W)').test(state.password);
    const number =
      state.password && new RegExp('(?=.*\\d)').test(state.password);
    const match = state.password && state.password === state.confirmPassword;
    setValidation({
      length,
      uppercase,
      lowercase,
      special,
      number,
      match,
      valid: length && uppercase && lowercase && special && number && match,
    });
  }, [state]);

  const handleFormSubmit = evt => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(createAccount());
  };

  if (auth.accessToken) {
    return <Redirect to="/welcome" />;
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <Header title="Create Account" onGoBack={() => dispatch(changeStep(3))} />
      <FormContainer>
        <H1 icon="icons/Recipient_Icon">Create a Password</H1>
        <Lead>
          To mitigate the potential of fraud, we recommend that you create a
          strong password.
        </Lead>
        <BaseInput
          type="password"
          name="password"
          value={state.password}
          onChange={value => dispatch(changePassword(value))}
          placeholder="Password"
        />
        <BaseInput
          type="password"
          name="passwordConfirmation"
          value={state.confirmPassword}
          onChange={value => dispatch(changePasswordConfirmation(value))}
          placeholder="Confirm Password"
        />
        {state.error && <FormErrors error={state.error} />}
        <RuleHeader>Password must contain</RuleHeader>
        <RuleList>
          <Rule valid={validate.length}>At least 8 characters</Rule>
          <Rule valid={validate.uppercase}>
            At least 1 uppercase letter (A-Z)
          </Rule>
          <Rule valid={validate.lowercase}>
            At least 1 lowercase letter (a-z)
          </Rule>
          <Rule valid={validate.special}>At least 1 special character</Rule>
          <Rule valid={validate.number}>At least 1 number (0-9)</Rule>
          <Rule valid={validate.match}>Password match</Rule>
        </RuleList>
      </FormContainer>
      <FormFooter>
        <FormFooterButton disabled={!validate.valid || state.loading}>
          Create Account
        </FormFooterButton>
      </FormFooter>
    </Form>
  );
}

SignupStep4.propTypes = {
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

export default SignupStep4;
