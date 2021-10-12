/**
 *
 * SuccessScreen
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  FooterLink,
  FormContainer,
  FormFooter,
  FormPage,
} from '../styled/Form';
import AuthHeader from '../../containers/AuthHeader';
import MainContent from '../../containers/MainContent';
import H1 from '../H1';
import Lead from '../Lead';
import { CompletionItem } from '../styled/CompletionItem';

function SuccessScreen({
  title = 'Success',
  heading = 'Success',
  text,
  items,
  footer,
  onEnter,
  onLeave,
}) {
  useEffect(() => {
    if (onEnter) {
      onEnter();
    }
    return () => {
      if (onLeave) {
        onLeave();
      }
    };
  }, []);
  return (
    <FormPage>
      <AuthHeader title={title} />
      <MainContent stickyFooter>
        <FormContainer>
          <H1 icon="icons/Confirmation_Icon">{heading}</H1>
          {text && <Lead>{text}</Lead>}
          {items.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <CompletionItem key={index}>{item}</CompletionItem>
          ))}
        </FormContainer>
        <FormFooter>
          {footer ? (
            <>{footer}</>
          ) : (
            <FooterLink to="/home" primary="true">
              Done
            </FooterLink>
          )}
        </FormFooter>
      </MainContent>
    </FormPage>
  );
}

SuccessScreen.propTypes = {
  title: PropTypes.string,
  heading: PropTypes.string,
  text: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  footer: PropTypes.object,
  onEnter: PropTypes.func,
  onLeave: PropTypes.func,
};

export default SuccessScreen;
