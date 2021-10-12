import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 270px;
  margin: 2rem;
  background-color: #f8f8f8;
  border-radius: 5px;
`;

export const Content = styled.div`
  padding: 2rem;
  text-align: center;
  color: #000000;
  font-family: 'Helvetica Neue';
  text-align: center;
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 1.7rem;
  letter-spacing: -0.041rem;
  line-height: 2.2rem;
  margin-bottom: 0.5rem;
`;

export const Text = styled.div`
  font-weight: 400;
  color: #636466;
  letter-spacing: -0.008rem;
  line-height: 1.6rem;
  font-size: 1.3rem;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(63, 63, 63, 0.4);
`;

export const Button = styled.button.attrs(() => ({ type: 'button' }))`
  background-color: transparent;
  outline: 0;
  border: none;
  padding: 1rem;
  flex-grow: 1;
  flex-shrink: 1;
  cursor: pointer;
  color: #007aff;
  font-family: 'SF Pro Text';
  font-size: 1.7rem;
  font-weight: 500;
  letter-spacing: -0.041rem;
  line-height: 2.2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-left: 1px solid rgba(63, 63, 63, 0.4);
  &:first-of-type {
    border: none;
  }
`;
