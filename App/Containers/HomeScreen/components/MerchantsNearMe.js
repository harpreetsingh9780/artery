import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Card from '../../../components/styled/Card';
import MerchantItem from './MerchantItem';

const ViewAll = styled.div`
  display: block;
  width: 100%;
  padding: 1.7rem 2rem;
  text-align: center;
  & a {
    color: #1c7ac3;
    font-family: 'SF Pro Rounded';
    font-size: 1.4rem;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 2rem;
    text-align: center;
    text-decoration: none;
  }
`;

function MerchantsNearMe() {
  return (
    <Card title="Merchants Near Me:" iconName="icons/Location_Icon">
      <MerchantItem
        id="ponder"
        title="Ponder"
        description="Open Now - 1.1 miles away"
        iconName="icons/Ponder_Icon"
      />
      <MerchantItem
        id="ponder"
        title="Ponder"
        description="Open Now - 1.1 miles away"
        iconName="icons/Ponder_Icon"
      />
      <MerchantItem
        id="ponder"
        title="Ponder"
        description="Open Now - 1.1 miles away"
        iconName="icons/Ponder_Icon"
      />
      <ViewAll>
        <Link to="/merchants">View All Merchants</Link>
      </ViewAll>
    </Card>
  );
}

MerchantsNearMe.propTypes = {};

export default MerchantsNearMe;
