/*
 * HomeScreen
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { PageView } from '../../Components/PageView';
import H1 from '../../Components/H1';
import { AuthHeader } from '../AuthHeader';
import Images from '../../Theme/Images';
import { Lead } from '../../Components/Lead';
import NavigationService from '../../Services/NavigationService';
import { TabButtonGroup } from '../../Components/TabButtonGroup';
import { TabButton } from '../../Components/TabButton';
import { Footer } from '../../Components/Footer';
import { Button } from '../../Components/Button';
import { Input } from '../../Components/Input';
import { isEmailValid, isPhoneValid } from '../../Utils/Validators';
import { PhoneInput } from '../../Components/PhoneInput';
import { ReferralService } from '../../Services/ReferralService';
import { Alert } from '../../Utils/Alert';
import FormErrors from '../../Components/FormErrors';

function InviteAFriendScreen({ onGoBack }) {
  const [type, setType] = useState('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (type === 'phone') {
      setFormValid(isPhoneValid(phone));
    } else {
      setFormValid(isEmailValid(email));
    }
  }, [type, phone, email]);

  const handleButtonSubmit = useCallback(() => {
    setLoading(true);
    ReferralService.invite(type, type === 'phone' ? phone : email)
      .then(() => {
        setLoading(true);
        setError(false);
        Alert.success({ message: 'Referral Sent' });
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, [type, phone]);

  return (
    <PageView
      header={<AuthHeader title="Invite a Friend" onGoBack={onGoBack} />}
      footer={
        <Footer>
          <Button
            text="Send Invite"
            onPress={handleButtonSubmit}
            disabled={!formValid || loading}
            intent="primary"
            loading={loading}
          />
        </Footer>
      }
    >
      <H1 icon={Images.contactIcon} text="Invite a Friend" />
      <Lead
        text="Enter the mobile number or email address of a friend to invite to
            Artery Pay and earn a reward when they sign up."
      />
      <TabButtonGroup>
        <TabButton
          onPress={() => setType('phone')}
          text="Mobile Number"
          active={type === 'phone'}
        />
        <TabButton onPress={() => setType('email')} text="Email" active={type === 'email'} />
      </TabButtonGroup>

      {type === 'phone' && <PhoneInput value={phone} onValueChange={(value) => setPhone(value)} />}
      {type === 'email' && (
        <Input
          title="Email Address"
          value={email}
          onValueChange={(value) => setEmail(value)}
          type="email"
        />
      )}
      <FormErrors error={error} />
    </PageView>
  );
}

InviteAFriendScreen.propTypes = {
  onGoBack: PropTypes.func.isRequired,
};

const mapDispatchToProps = () => ({
  onGoBack: () => NavigationService.navigateToHome(),
});

const withConnect = connect(
  null,
  mapDispatchToProps
);

export default compose(withConnect)(InviteAFriendScreen);
