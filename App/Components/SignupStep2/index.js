/**
 *
 * SignupStep2
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  changePhoneCode,
  changeStep,
  startPhoneVerify,
  submitPhoneVerify,
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

const CodeLink = styled.a`
  text-decoration: none;
  color: #1c7ac3;
  font-family: 'SF Pro Rounded';
  font-size: 1.2rem;
  letter-spacing: 0;
  line-height: 1.5rem;
  margin-top: 1.8rem;
  display: inline-block;
`;

function SignupStep2({ dispatch, state }) {
  const handleFormSubmit = evt => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(submitPhoneVerify());
  };

  const handleResendPress = evt => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(startPhoneVerify());
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Header title="Create Account" onGoBack={() => dispatch(changeStep(1))} />
      <FormContainer>
        <H1 icon="icons/Contact_Icon">Verify Your Number</H1>
        <Lead>
          Check your messages and enter the 6-digit code we just sent you.
        </Lead>
        <BaseInput
          name="code"
          value={state.phoneVerificationCode}
          onChange={value => dispatch(changePhoneCode(value))}
          type="number"
          placeholder="6-digit code"
        />
        <CodeLink href="#" onClick={handleResendPress}>
          Send a new code
        </CodeLink>
        {state.error && <FormErrors error={state.error} />}
      </FormContainer>
      <FormFooter>
        <FormFooterButton
          disabled={!state.phoneVerificationCode || state.loading}
        >
          Continue
        </FormFooterButton>
      </FormFooter>
    </Form>
  );
}

SignupStep2.propTypes = {
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};

export default SignupStep2;
