import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { closeModal } from '../actions';
import { Button, Content, Footer, Text, Title, Wrapper } from './styles';
import { MODAL_CONFIRM, MODAL_DEFAULT } from '../constants';

export function ModalDialog({ item, dispatch }) {
  const handleButtonAction = useCallback(
    confirm => {
      if (item.onClose) {
        item.onClose(confirm);
      }
      dispatch(closeModal(item));
    },
    [item, dispatch],
  );

  return (
    <Wrapper>
      <Content>
        {item.title && <Title>{item.title}</Title>}
        {item.text && <Text>{item.text}</Text>}
      </Content>
      <Footer>
        {item.modal === MODAL_CONFIRM && (
          <>
            <Button onClick={() => handleButtonAction(false)}>No</Button>
            <Button onClick={() => handleButtonAction(true)}>Yes</Button>
          </>
        )}
        {item.modal === MODAL_DEFAULT && (
          <>
            <Button onClick={() => handleButtonAction(true)}>Okay</Button>
          </>
        )}
      </Footer>
    </Wrapper>
  );
}

ModalDialog.propTypes = {
  dispatch: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};
