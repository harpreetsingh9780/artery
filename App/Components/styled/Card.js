import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Img from '../Img';

export const CardWrapper = styled.div`
  margin-top: 2rem;
  border: 1px solid #e8e8eb;
  border-radius: 4px;
  background-color: #ffffff;
`;

const CardTitleWrapper = styled.div`
  padding: 1.8rem 2rem;
  border-bottom: 1px solid #e8e8eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const Title = styled.div`
  color: #091857;
  font-family: 'SF Pro Rounded';
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 2rem;
`;

export function CardTitle({ title, iconName = null }) {
  return (
    <CardTitleWrapper>
      <Title>{title}</Title>
      {iconName && <Img name={iconName} srcSet={[2, 3, 4]} alt={title} />}
    </CardTitleWrapper>
  );
}

CardTitle.propTypes = {
  title: PropTypes.string.isRequired,
  iconName: PropTypes.string,
};

function Card({ children, title, iconName = null }) {
  return (
    <CardWrapper>
      <CardTitle title={title} iconName={iconName} />
      {children}
    </CardWrapper>
  );
}

Card.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string.isRequired,
  iconName: PropTypes.string,
};

export default Card;
