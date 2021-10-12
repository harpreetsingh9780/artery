import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import H1 from '../../Components/H1';
import Images from '../../Theme/Images';
import { PageView } from '../../Components/PageView';
import NavigationService from '../../Services/NavigationService';
import { AuthHeader } from '../AuthHeader';
import { Lead } from '../../Components/Lead';
import { StateLineItem } from '../../Components/StateLineItem';
import { Footer } from '../../Components/Footer';
import { Button } from '../../Components/Button';
import { UserActions } from '../../Stores/User/Actions';

function SignUpWelcomeScreen({ linkBankAccount, goHome, startup, navigation }) {
  const { payload, response } = navigation.state.params;

  useEffect(() => {
    if (!!response) {
      startup(response);
    }
  }, [response]);

  return (
    <PageView
      header={<AuthHeader title="Account Created" />}
      footer={
        <Footer>
          <Button text="Done" onPress={() => goHome()} intent="primary" />
          <Button text="Link Bank Account" onPress={() => linkBankAccount()} />
        </Footer>
      }
    >
      <H1 icon={Images.checkmarkIcon} text="You're All Set" />
      <Lead text="You're ready to make purchases and start earning rewards at your favorite dispensaries." />
      <StateLineItem text={payload.firstName} />
      <StateLineItem text={payload.lastName} />
      <StateLineItem text={payload.licenseNumber} />
      <StateLineItem text={response.email} />
      <StateLineItem text={payload.phone} />
    </PageView>
  );
}

SignUpWelcomeScreen.propTypes = {
  linkBankAccount: PropTypes.func.isRequired,
  goHome: PropTypes.func.isRequired,
  startup: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  startup: (response) => {
    dispatch(UserActions.userAfterLogin(response));
    dispatch(UserActions.prepare());
  },
  linkBankAccount: () => NavigationService.navigateAndReset('LinkBankAccountScreen'),
  goHome: () => NavigationService.navigateToHome(),
});

export default connect(
  null,
  mapDispatchToProps
)(SignUpWelcomeScreen);
