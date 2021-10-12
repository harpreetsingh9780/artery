import React from 'react';
import styled, { css } from 'styled-components';
import Img from '../Img';

const ItemWrapper = styled.div`
  border-bottom: 1px solid #e8e8eb;
  color: #091857;
  font-family: 'SF Pro Rounded';
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 2rem;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 1rem 0;
  flex-grow: 0;
  flex-shrink: 0;
  max-width: 100%;
  ${props =>
    props.first &&
    css`
      border-top: 1px solid #e8e8eb;
    `}
`;

const SpanFlex = styled.div`
  flex: 1;
  min-width: 0;
  padding-right: 2rem;
  ${props =>
    props.right &&
    css`
      text-align: right;
    `}
  ${props =>
    props.shrink &&
    css`
      flex-shrink: 1;
    `}

  ${props =>
    props.grow &&
    css`
      flex-grow: 1;
    `}
`;

const Span = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// eslint-disable-next-line react/prop-types
export function CompletionItem({ children, ...rest }) {
  return (
    <ItemWrapper {...rest}>
      <SpanFlex>
        <Span>{children}</Span>
      </SpanFlex>
      <Img name="icons/Checkmark_Icon" alt="Checkmark" srcSet={[2, 3, 4]} />
    </ItemWrapper>
  );
}

// eslint-disable-next-line react/prop-types
export function KeyValueItem({ title, value, ...rest }) {
  return (
    <ItemWrapper {...rest}>
      <SpanFlex>
        <Span>{title}</Span>
      </SpanFlex>
      <SpanFlex>
        <Span>{value}</Span>
      </SpanFlex>
    </ItemWrapper>
  );
}

// eslint-disable-next-line react/prop-types
export function SingleItem({ title, ...rest }) {
  return (
    <ItemWrapper {...rest}>
      <SpanFlex>
        <Span>{title}</Span>
      </SpanFlex>
    </ItemWrapper>
  );
}

// eslint-disable-next-line react/prop-types
export function ProductItem({ name, quantity, price, ...rest }) {
  return (
    <ItemWrapper {...rest}>
      <SpanFlex grow>
        <Span>{name}</Span>
      </SpanFlex>
      <SpanFlex right shrink>
        <Span>{quantity}</Span>
      </SpanFlex>
      <SpanFlex right shrink>
        <Span>{price}</Span>
      </SpanFlex>
    </ItemWrapper>
  );
}
