import React from 'react';
import PropTypes from 'prop-types';
import { Content, Wrapper } from './styles';
import Loader from '../../../components/Loader';

export function LoaderModal({ title }) {
  return (
    <Wrapper>
      <Content>
        <Loader inline title={title} />
      </Content>
    </Wrapper>
  );
}

LoaderModal.propTypes = {
  title: PropTypes.string,
};
