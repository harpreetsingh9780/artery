import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Img from '../../../components/Img';

const Wrapper = styled(Link)`
  display: flex;
  width: 100%;
  padding: 2rem;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;
  text-decoration: none;
  border-bottom: 1px solid #e8e8eb;
`;
const TextWrapper = styled.span`
  display: flex;
  flex: 1;
  margin-left: 0.9rem;
  flex-direction: column;
`;
const Title = styled.span`
  color: #1c7ac3;
  font-family: 'SF Pro Rounded';
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1.8rem;
`;
const Description = styled.span`
  color: #636466;
  font-family: 'SF Pro Rounded';
  font-size: 1.2rem;
  letter-spacing: 0.05rem;
  line-height: 1.5rem;
`;

function MerchantItem({ id, title, description, iconName }) {
  return (
    <Wrapper to={`/merchant/${id}`}>
      <Img name={iconName} alt={title} srcSet={[2, 3, 4]} />
      <TextWrapper>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TextWrapper>
    </Wrapper>
  );
}

MerchantItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
};

export default MerchantItem;
