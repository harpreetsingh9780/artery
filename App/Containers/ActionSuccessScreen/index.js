/*
 * HomeScreen
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
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
import { Button } from '../../Components/Button';
import { StateLineItem } from '../../Components/StateLineItem';
import { convertCents } from '../../Utils/Helpers';

function ActionSuccessScreen({ onGoBack, navigation }) {
  const header = navigation.getParam('header') || 'Success';
  const title = navigation.getParam('title') || 'Action Completed';
  const description = navigation.getParam('description') || null;
  const items = navigation.getParam('items') || [];

  return (
    <PageView
      header={<AuthHeader title={header} />}
      footer={
        <Footer>
          <Button text="Done" intent="default" onPress={() => onGoBack()} />
        </Footer>
      }
    >
      <H1 text={title} icon={Images.confirmationIcon} />
      {!!description && <Lead text={description} />}
      {items &&
        items
          .filter((item) => item !== null)
          .map((item, index) => <StateLineItem key={index} text={item} />)}
    </PageView>
  );
}

ActionSuccessScreen.propTypes = {
  onGoBack: PropTypes.func,
  navigation: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
  onGoBack: () => NavigationService.navigateToHome(),
});

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default compose(withConnect)(ActionSuccessScreen);
