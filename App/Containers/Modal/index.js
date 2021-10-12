/**
 *
 * Modal
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/injectReducer';
import makeSelectModal from './selectors';
import reducer from './reducer';
import { ModalDialog } from './components/ModalDialog';
import { LoaderModal } from './components/LoaderModal';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 250;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * @return {null}
 */
export function Modal({ modal, dispatch }) {
  useInjectReducer({ key: 'modal', reducer });

  const { items, loader } = modal;

  const [hasModals, setHasModals] = useState(false);
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    setHasModals(items.length > 0 || loader);
    setCurrent(!loader && items.length ? items[0] : null);
  }, [items, loader]);

  useEffect(() => {
    if (hasModals) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [hasModals]);

  if (!hasModals) {
    return null;
  }

  return (
    <Wrapper>
      {modal.loader && <LoaderModal title={modal.loaderTitle} />}
      {current && <ModalDialog dispatch={dispatch} item={current} />}
    </Wrapper>
  );
}

Modal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  modal: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  modal: makeSelectModal(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Modal);
