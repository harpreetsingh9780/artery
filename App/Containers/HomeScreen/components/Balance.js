import React from 'react';
import styled from 'styled-components';
import { useBalance } from '../../../hooks/useBalance';
import { convertCents } from '../../../utils/helpers';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.8rem;
  border: 1px solid #e8e8eb;
  border-radius: 4px;
  background-color: #1c7ac3;
  margin-top: 3.5rem;
  margin-bottom: 2rem;
`;
const Title = styled.div`
  color: #ffffff;
  font-family: 'SF Pro Rounded';
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 2rem;
`;
const Amount = styled.div`
  color: #ffffff;
  font-family: 'SF Compact Rounded';
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 2rem;
  text-align: right;
`;

function Balance() {
  const { balance } = useBalance();
  return (
    <Wrapper>
      <Title>Account Balance:</Title>
      <Amount>${convertCents(balance)}</Amount>
    </Wrapper>
  );
}

Balance.propTypes = {};

export default Balance;
