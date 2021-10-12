import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from '../../Components/Input';
import H1 from '../../Components/H1';
import Images from '../../Theme/Images';
import { PageView, PageViewFull } from '../../Components/PageView';
import { Button } from '../../Components/Button';
import { Footer } from '../../Components/Footer';
import Header from '../Header';
import NavigationService from '../../Services/NavigationService';
import { Lead } from '../../Components/Lead';
import { ButtonArea } from '../../Components/Button/ButtonArea';
import { Text } from '../../Components/Text';
import { Colors } from '../../Theme';
import FormErrors from '../../Components/FormErrors';
import { Camera, CAMERA_PDF417 } from '../../Components/Camera';
import { LoginService } from '../../Services/LoginService';

const styles = StyleSheet.create({
  scanButtonContainer: {
    backgroundColor: Colors.transparent,
    borderWidth: 1,
    borderColor: Colors.blue,
    borderRadius: 4,
    padding: 14,
    marginBottom: 21,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButtonImage: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  scanButtonText: {
    lineHeight: 14,
    alignSelf: 'center',
  },
});

function SignUpDetailsFormScreen({ next, back, idHelp, navigation }) {
  const [payload, setPayload] = useState({
    verificationId: '',
    verificationCode: '',
    email: '',
    phone: '',
  });
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    licenseNumber: '',
    birthEpochDate: '',
    city: '',
    countryCode: '',
    postalCode: '',
    state: '',
    streetAddress1: '',
    streetAddress2: '',
  });
  const [state, setState] = useState({
    screen: 'details',
    valid: false,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const data = navigation.getParam('payload');
    setPayload((prevState) => ({ ...prevState, ...data }));
  }, [navigation]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      ...{
        valid:
          values.firstName.length > 0 &&
          values.lastName.length > 0 &&
          values.licenseNumber.length > 0,
      },
    }));
  }, [values]);

  const handleFormSubmit = useCallback(() => {
    next({ ...payload, ...values });
  }, [values, payload]);

  const handleScannedCode = useCallback(
    (data) => {
      setState((prevState) => ({ ...prevState, screen: 'details', loading: true, error: null }));
      LoginService.parseDriversLicense({ data: data })
        .then((res) => {
          const { firstName, lastName, licenseNumber, birthEpochDate, mailingCity, mailingCountryCode, mailingPostalCode, mailingState, mailingStreetAddress1, mailingStreetAddress2 } = res
          setValues((prevState) => ({
            ...prevState,
            firstName: firstName || prevState.firstName,
            lastName: lastName || prevState.lastName,
            licenseNumber: licenseNumber || prevState.licenseNumber,
            birthEpochDate: birthEpochDate || prevState.birthEpochDate,
            city: mailingCity || prevState.city,
            countryCode: mailingCountryCode || prevState.countryCode,
            postalCode: mailingPostalCode || prevState.postalCode,
            state: mailingState || prevState.state,
            streetAddress1: mailingStreetAddress1 || prevState.streetAddress1,
            streetAddress2: mailingStreetAddress2 || prevState.streetAddress2,
          }));
          setState((prevState) => ({ ...prevState, loading: false, error: null }));
        })
        .catch((error) => {
          setState((prevState) => ({ ...prevState, loading: false, error: error }));
        });
    },
    [values]
  );

  if (state.screen === 'scanner') {
    return (
      <PageViewFull
        header={
          <Header
            title="Create Account"
            onGoBack={() => setState((prevState) => ({ ...prevState, screen: 'details' }))}
          />
        }
      >
        <Camera onData={handleScannedCode} mode={CAMERA_PDF417} />
      </PageViewFull>
    );
  }

  return (
    <PageView
      header={<Header title="Create Account" onGoBack={() => back()} />}
      footer={
        <Footer>
          <Button
            text="Continue"
            onPress={() => handleFormSubmit()}
            intent="primary"
            loading={state.loading}
            disabled={state.loading || !state.valid}
          />
        </Footer>
      }
    >
      <H1 text="Add Personal Details" />
      <Lead text="To help protect your accounts and confirm your identity, we need a little more information." />

      <ButtonArea onPress={() => setState((prevState) => ({ ...prevState, screen: 'scanner' }))}>
        <View style={styles.scanButtonContainer}>
          <Image style={styles.scanButtonImage} source={Images.photoIcon} />
          <Text color={Colors.blue} weight="medium" style={styles.scanButtonText}>
            Scan your ID
          </Text>
        </View>
      </ButtonArea>

      <Input
        title="First Name"
        value={values.firstName}
        onValueChange={(text) => setValues((prev) => ({ ...prev, ...{ firstName: text } }))}
      />
      <Input
        title="Last Name"
        value={values.lastName}
        onValueChange={(text) => setValues((prev) => ({ ...prev, ...{ lastName: text } }))}
      />
      <Input
        title="ID Number"
        value={values.licenseNumber}
        onValueChange={(text) => setValues((prev) => ({ ...prev, ...{ licenseNumber: text } }))}
      />
      {state.error && <FormErrors error={state.error} />}
      <ButtonArea onPress={() => idHelp()}>
        <Text color={Colors.blue}>What ID can I use?</Text>
      </ButtonArea>
    </PageView>
  );
}

SignUpDetailsFormScreen.propTypes = {
  next: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
  idHelp: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

const mapDispatchToProps = () => ({
  next: (payload) => NavigationService.navigate('SignUpPasswordFormScreen', { payload }),
  back: () => NavigationService.back(),
  idHelp: () => NavigationService.navigate('SignUpIdExampleScreen'),
});

export default connect(
  null,
  mapDispatchToProps
)(SignUpDetailsFormScreen);
