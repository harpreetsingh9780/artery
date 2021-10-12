import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PageView } from '../../Components/PageView';
import { Button } from '../../Components/Button';
import Header from '../Header';
import NavigationService from '../../Services/NavigationService';
import { Text } from '../../Components/Text';

function SignUpInitialScreen({ next, back }) {
  return (
    <PageView header={<Header title="Create Account" onGoBack={() => back()} />}>
      <Text weight="bold" size={26}>
        Payments Simplified
      </Text>
      <Text>Make purchases at your favorite retailers.</Text>
      <Button text="Get Started" onPress={() => next()} />
    </PageView>
  );
}

SignUpInitialScreen.propTypes = {
  next: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  next: () => NavigationService.navigate('SignUpEmailFormScreen'),
  back: () => NavigationService.navigateAndReset('LoginScreen'),
});

export default connect(
  null,
  mapDispatchToProps
)(SignUpInitialScreen);
