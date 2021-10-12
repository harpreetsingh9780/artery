/**
 *
 * LoginScreen
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from '../../Components/Input';
import H1 from '../../Components/H1';
import Images from '../../Theme/Images';
import { PageView } from '../../Components/PageView';
import { Button } from '../../Components/Button';
import { Footer } from '../../Components/Footer';
import Header from '../Header';
import { LoginActions } from '../../Stores/Login/Actions';
import NavigationService from '../../Services/NavigationService';
import FormErrors from '../../Components/FormErrors';

export function LoginScreen({ login, loginLoading, loginError, init }) {
  const [value, setValue] = useState({ email: '', password: '' });
  useEffect(() => {
    init();
  }, []);
  const handleChange = (name, value) => {
    setValue((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <PageView
      header={<Header title="Welcome to Artery Pay" />}
      footer={
        <Footer>
          <Button
            onPress={() => login(value.email, value.password)}
            text="Sign In"
            intent="primary"
            disabled={loginLoading}
            loading={loginLoading}
          />
          <Button
            onPress={() => NavigationService.navigate('SignUpInitialScreen')}
            text="Create Account"
          />
        </Footer>
      }
    >
      <H1 text="Sign In" icon={Images.signInIcon} />
      <Input
        value={value.email}
        type="email"
        onValueChange={(value) => handleChange('email', value)}
        title="Email address"
      />
      <Input
        value={value.password}
        type="password"
        onValueChange={(value) => handleChange('password', value)}
        title="Password"
      />
      <FormErrors error={loginError} />
    </PageView>
  );
}

LoginScreen.propTypes = {
  loginLoading: PropTypes.bool,
  loginError: PropTypes.string,
  login: PropTypes.func,
  init: PropTypes.func,
};

const mapStateToProps = (state) => ({
  loginLoading: state.login.loginLoading,
  loginError: state.login.loginError,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(LoginActions.login(email, password)),
  init: () => dispatch(LoginActions.loginInit()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
