/**
 *
 * Tabs
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const TabWrapper = styled.div`
  margin-bottom: 3.5rem;
  display: flex;
  justify-content: space-between;
`;

export const TabLink = styled(Link)`
  border: 1px solid red;
  flex: 1;
  color: #1c7ac3;
  font-family: 'SF Pro Rounded';
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 2rem;
  text-align: center;
  text-decoration: none;
  border: 1px solid #1c7ac3;
  border-radius: 0;
  background-color: #ffffff;
  padding: 0.5rem;
  cursor: pointer;
  border-right-width: 0;
  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-right-width: 1px;
  }
  ${props =>
    props.active === 1 &&
    css`
      background-color: #1c7ac3;
      color: #ffffff;
    `}
`;

export const TabButton = styled.button.attrs(() => ({ type: 'button' }))`
  border: 1px solid red;
  flex: 1;
  color: #1c7ac3;
  font-family: 'SF Pro Rounded';
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 2rem;
  text-align: center;
  text-decoration: none;
  border: 1px solid #1c7ac3;
  border-radius: 0;
  background-color: #ffffff;
  padding: 0.5rem;
  cursor: pointer;
  border-right-width: 0;
  outline: 0;
  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-right-width: 1px;
  }
  ${props =>
    props.active &&
    css`
      background-color: #1c7ac3;
      color: #ffffff;
    `}
`;

// eslint-disable-next-line react/prop-types
function Tabs({ children }) {
  return <TabWrapper>{children}</TabWrapper>;
}

Tabs.propTypes = {};

export default Tabs;

export function Tab({ title, active, onClick, ...rest }) {
  return (
    <TabButton active={active} onClick={onClick} {...rest}>
      {title}
    </TabButton>
  );
}

Tab.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};
