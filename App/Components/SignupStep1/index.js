/**
 *
 * SignupStep1
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
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
import {
  changeEmail,
  changePhone,
  startPhoneVerify,
} from '../../containers/SignUpPage/actions';
import FormErrors from '../FormErrors';
import PhoneInput from '../BaseInput/phone';
import { PHONE_NUMBER_COUNTRY } from '../../utils/constants';

function SignupStep1({ dispatch, state }) {
  const handleFormSubmit = evt => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(startPhoneVerify());
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Header title="Create Account" goBackTo="/register" />
      <FormContainer>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <H1 icon="icons/Contact_Icon">Let's Get To Know You</H1>
        <Lead>
          To pay for goods/services and to send/receive money, we need your
          mobile number and email address.
        </Lead>
        <BaseInput
          name="email"
          value={state.email}
          onChange={value => dispatch(changeEmail(value))}
          type="email"
          placeholder="Email Address"
        />
        <PhoneInput
          name="phone"
          value={state.phone}
          country={PHONE_NUMBER_COUNTRY}
          onChange={value => dispatch(changePhone(value))}
          placeholder="Phone Number"
        />
        {state.error && <FormErrors error={state.error} />}
      </FormContainer>
      <FormFooter>
        <FormFooterButton
          disabled={!(state.email && state.phone) || state.loading}
        >
          Continue
        </FormFooterButton>
      </FormFooter>
    </Form>
  );
}

SignupStep1.propTypes = {
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};

export default SignupStep1;
