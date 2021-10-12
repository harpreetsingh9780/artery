/**
 *
 * SignupStep3
 *
 */

import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  changeFirstName,
  changeIdNumber,
  changeLastName,
  changeStep,
  openScannerAction,
  parseLicenseAction,
} from '../../containers/SignUpPage/actions';
import {
  Form,
  FormContainer,
  FormFooter,
  FormFooterButton,
  FormPage,
} from '../styled/Form';
import Header from '../../containers/Header';
import H1 from '../H1';
import Lead from '../Lead';
import BaseInput from '../BaseInput';
import FormErrors from '../FormErrors';
import Img from '../Img';
import QrScanner from '../QrScanner';
import QrFileReaderButton from '../QrFileReaderButton';
import { showModal } from '../../containers/Modal/actions';

const CodeLink = styled(Link)`
  text-decoration: none;
  color: #1c7ac3;
  font-family: 'SF Pro Rounded';
  font-size: 1.2rem;
  letter-spacing: 0;
  line-height: 1.5rem;
  margin-top: 1.8rem;
  display: inline-block;
`;

const ScanIdButton = styled.button.attrs(() => ({ type: 'button' }))`
  border: 1px solid #1c7ac3;
  padding: 1.4rem;
  color: #1c7ac3;
  font-family: 'SF Pro Rounded';
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  width: 100%;
  margin-bottom: 2.1rem;
  border-radius: 0.4rem;
  & img {
    margin-right: 0.5rem;
  }
`;

function SignupStep3({ dispatch, state }) {
  const [scanDisabled, setScanDisabled] = useState(false);

  const handleFormSubmit = evt => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(changeStep(4));
  };

  const handleIDExample = evt => {
    if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    dispatch(changeStep(5));
  };

  const handleQrSuccess = useCallback(
    data => {
      dispatch(parseLicenseAction(data));
    },
    [state],
  );

  const handleQrError = () => {
    setScanDisabled(true);
    dispatch(
      showModal({
        title: 'Scan Failed',
        text: 'Unable to parse QR code, please try again.',
        onClose: () => {
          setScanDisabled(false);
        },
      }),
    );
  };

  if (state.openScanner) {
    return (
      <FormPage>
        <Header
          title="Create Account"
          onGoBack={() => dispatch(openScannerAction(false))}
        />
        <QrScanner
          acceptEverything
          mode="pdf417"
          onSuccess={handleQrSuccess}
          onFail={handleQrError}
          disabled={scanDisabled}
        />
        <FormFooter>
          <QrFileReaderButton
            mode="pdf417"
            acceptEverything
            onSuccess={handleQrSuccess}
            onFail={handleQrError}
          />
        </FormFooter>
      </FormPage>
    );
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <Header title="Create Account" onGoBack={() => dispatch(changeStep(2))} />
      <FormContainer>
        <H1>Add Personal Details</H1>
        <Lead>
          To help protect your accounts and confirm your identity, we need a
          little more information.
        </Lead>
        <ScanIdButton onClick={() => dispatch(openScannerAction(true))}>
          <Img
            name="icons/Photo_Icon"
            width={24}
            height={24}
            alt="Scan photo icon"
            srcSet={[2, 3, 4]}
          />
          Scan your ID
        </ScanIdButton>
        <BaseInput
          name="firstName"
          value={state.firstName}
          onChange={value => dispatch(changeFirstName(value))}
          placeholder="First Name"
        />
        <BaseInput
          name="lastName"
          value={state.lastName}
          onChange={value => dispatch(changeLastName(value))}
          placeholder="Last Name"
        />
        <BaseInput
          name="idNumber"
          value={state.idNumber}
          onChange={value => dispatch(changeIdNumber(value))}
          placeholder="ID Number"
        />
        <CodeLink to="/register/form" onClick={handleIDExample}>
          What ID can I use?
        </CodeLink>
        {state.error && <FormErrors error={state.error} />}
      </FormContainer>
      <FormFooter>
        <FormFooterButton
          disabled={
            !(state.firstName && state.lastName && state.idNumber) ||
            state.loading
          }
        >
          Continue
        </FormFooterButton>
      </FormFooter>
    </Form>
  );
}

SignupStep3.propTypes = {
  dispatch: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};

export default SignupStep3;
