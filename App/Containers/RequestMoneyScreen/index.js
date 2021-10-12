/*
 * HomeScreen
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { PageView } from '../../Components/PageView';
import H1 from '../../Components/H1';
import { AuthHeader } from '../AuthHeader';
import NavigationService from '../../Services/NavigationService';
import Images from '../../Theme/Images';
import { Lead } from '../../Components/Lead';
import { Footer } from '../../Components/Footer';
import SearchRecipient from '../SearchRecipient';
import { Button } from '../../Components/Button';

function RequestMoneyScreen({ onGoBack, next }) {
  const [recipient, setRecipient] = useState(null);

  return (
    <PageView
      header={<AuthHeader title="Request Money" onGoBack={onGoBack} />}
      footer={
        <Footer>
          <Button
            text="Continue"
            intent="primary"
            onPress={() => next(recipient)}
            disabled={!recipient?.id}
          />
        </Footer>
      }
    >
      <H1 text="Request Payment" icon={Images.requestMoneyNavIcon} />
      <Lead text="Select user to request payment for." />
      <SearchRecipient selected={recipient} onSelected={(value) => setRecipient(value)} />
    </PageView>
  );
}

RequestMoneyScreen.propTypes = {
  onGoBack: PropTypes.func,
  next: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  onGoBack: () => NavigationService.navigateToHome(),
  next: (recipient) => NavigationService.navigate('RequestMoneyAmountScreen', { recipient }),
});

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default compose(withConnect)(RequestMoneyScreen);
