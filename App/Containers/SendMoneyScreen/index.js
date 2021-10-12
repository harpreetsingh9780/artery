import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { PageView, PageViewFull } from '../../Components/PageView';
import H1 from '../../Components/H1';
import { AuthHeader } from '../AuthHeader';
import Images from '../../Theme/Images';
import { Lead } from '../../Components/Lead';
import { createStructuredSelector } from 'reselect';
import { getUserSelector } from '../../Stores/User/Selectors';
import { Footer } from '../../Components/Footer';
import { Button } from '../../Components/Button';
import { Camera, CAMERA_QR } from '../../Components/Camera';
import NavigationService from '../../Services/NavigationService';
import { Alert } from '../../Utils/Alert';
import SearchRecipient from '../SearchRecipient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 250,
  },
  horizontalContainer: {
    paddingHorizontal: 20,
  },
  cameraContainer: {
    flex: 1,
  },
  photoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  circle: {
    width: 240,
    height: 240,
    backgroundColor: 'rgba(28, 122, 195, 0.1)',
    borderRadius: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleA: {
    width: 200,
    height: 200,
    borderRadius: 200,
  },
  circleB: {
    width: 160,
    height: 160,
    borderRadius: 160,
  },
  circleC: {
    width: 120,
    height: 120,
    borderRadius: 120,
  },
  circleD: {},
  mainPhoto: {
    width: 356,
    height: 274,
  },
});

function SendMoneyScreen({ user, toAmount, toMerchant, back }) {
  const [tab, setTab] = useState('qr');
  const [scanning, setScanning] = useState(true);
  const [recipient, setRecipient] = useState(null);

  const loadUser = useCallback((handle) => {
    toAmount({ qrCodeData: {} });
  }, []);

  const handleQrCodeData = useCallback(
    (data) => {
      if (scanning) {
        setScanning(false);
        try {
          if (data.name === 'artery') {
            if (['purchase', 'receive'].includes(data.type)) {
              if (data.type === 'receive') {
                loadUser(data.properties.merchant_handle);
              } else {
                toMerchant({ qrCodeData: data, setPreviousScanning: setScanning });
              }
              // setScanning(true);
            } else {
              Alert.success({
                title: 'Scan Failed',
                message: 'Please confirm the QR is for ArteryPay and try again',
                onConfirm: () => setScanning(true),
              });
            }
          } else {
            Alert.success({
              title: 'Scan Failed',
              message: 'Please confirm the QR is for ArteryPay and try again',
              onConfirm: () => setScanning(true),
            });
          }
        } catch (e) {
          Alert.success({
            title: 'Scan Failed',
            message: 'Please confirm the QR is for ArteryPay and try again',
            onConfirm: () => setScanning(true),
          });
        }
      }
    },
    [scanning, setScanning]
  );

  if (tab === 'qr') {
    return (
      <PageViewFull header={<AuthHeader title="Send Money" onGoBack={() => back()} />}>
        <View style={styles.container}>
          <View style={[styles.horizontalContainer]}>
            <H1 text="Scan a Code" icon={Images.scanQrIcon} />
            <Lead text="Scan a merchant payment QR or another user’s ID QR" />
          </View>
          <View style={styles.cameraContainer}>
            <Camera onData={handleQrCodeData} mode={CAMERA_QR} />
          </View>
        </View>
      </PageViewFull>
    );
  }

  if (tab === 'phone') {
    return (
      <PageView
        header={<AuthHeader title="Send Money" onGoBack={() => setTab('main')} />}
        footer={
          <Footer>
            <Button
              text="Continue"
              intent="primary"
              onPress={() => toAmount({ recipient })}
              disabled={!recipient?.id}
            />
          </Footer>
        }
      >
        <H1 text="Choose a Recipient" icon={Images.recipientIcon} />
        <Lead text="To send to an individual, all you need is your recipients mobile number." />
        <SearchRecipient selected={recipient} onSelected={(value) => setRecipient(value)} />
      </PageView>
    );
  }

  return (
    <PageViewFull
      header={<AuthHeader title="Send Money" />}
      footer={
        <Footer>
          <Button text="Scan a QR" intent="primary" onPress={() => setTab('qr')} />
          <Button text="Select by Phone Number" onPress={() => setTab('phone')} />
        </Footer>
      }
    >
      <View style={styles.horizontalContainer}>
        <H1 text="What's Next?" icon={Images.sendMoneyIcon} />
        <Lead text="You can send to a merchant or individual by scanning a QR code or you can select the recipient by phone number." />
      </View>
      <View style={styles.photoContainer}>
        <View style={styles.circle}>
          <View style={[styles.circle, styles.circleA]}>
            <View style={[styles.circle, styles.circleB]}>
              <View style={[styles.circle, styles.circleC]}>
                <View style={[styles.circle, styles.circleD]}>
                  <Image source={Images.illustration} style={styles.mainPhoto} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </PageViewFull>
  );
}

SendMoneyScreen.propTypes = {
  user: PropTypes.object,
  toAmount: PropTypes.func,
  toMerchant: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: getUserSelector,
});

const mapDispatchToProps = (dispatch) => ({
  back: () => NavigationService.back(),
  toAmount: (params) => NavigationService.navigate('SendMoneyAmountScreen', params),
  toMerchant: (params) => NavigationService.navigate('SendMoneyToMerchantScreen', params),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(SendMoneyScreen);
