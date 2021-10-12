import React from 'react';
import { View, Button } from 'react-native';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Container, { FluidContainer } from '../Container';

export const Form = KeyboardAwareScrollView;

export const FormPage = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

export const FormContainer = styled(Container)`
  flex: 1;
  padding-bottom: 2rem;
`;

export const FluidFormContainer = styled(FluidContainer)`
  flex: 1;
  padding-bottom: 2rem;
`;

export const Line = styled(View)`
  border-top: 1px solid #e8e8eb;
`;

export const FormFooterButton = styled(Button)`
  padding: 1.9rem;
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 2rem;
  font-family: 'SF Pro Rounded';
  text-align: center;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
  will-change: background-color, color;
  border: 0;
  background-color: #1c7ac3;
  color: #ffffff;
  cursor: pointer;
  outline: 0;
  margin-bottom: 1rem;

  ${props =>
    props.disabled &&
    css`
      color: #636466;
      background-color: #e8e8eb;
      cursor: not-allowed;
    `}

  ${props =>
    props.secondary &&
    css`
      border: 1px solid #1c7ac3;
      background-color: #ffffff;
      color: #1c7ac3;
    `}

  ${props =>
    props.primary &&
    css`
      color: #ffffff;
      background-color: #1c7ac3;
    `}
`;

const FooterDiv = styled(View)`
  background-color: #ffffff;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.1);
  padding: 2rem 0 2.4rem;
`;

const FooterContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`;

export const FormFooter = ({ children }) => (
  <FooterDiv>
    <FooterContainer>{children}</FooterContainer>
  </FooterDiv>
);
FormFooter.propTypes = { children: PropTypes.any.isRequired };

export const FooterLink = styled(Button)`
  padding: 1.9rem;
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 2rem;
  font-family: 'SF Pro Rounded';
  text-align: center;
  border-radius: 4px;
  border: 1px solid #1c7ac3;
  background-color: #ffffff;
  color: #1c7ac3;
  text-decoration: none;
  margin-bottom: 1rem;
  ${props =>
    props.primary &&
    css`
      color: #ffffff;
      background-color: #1c7ac3;
    `}
`;
