import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import QRCode from 'react-native-qrcode-svg';
import PropTypes from 'prop-types';
import { PageViewFull } from '../../Components/PageView';
import H1 from '../../Components/H1';
import { AuthHeader } from '../AuthHeader';
import Images from '../../Theme/Images';
import { Lead } from '../../Components/Lead';
import { TabButtonGroup } from '../../Components/TabButtonGroup';
import { TabButton } from '../../Components/TabButton';
import { Camera, CAMERA_QR } from '../../Components/Camera';
import { createStructuredSelector } from 'reselect';
import { getUserSelector } from '../../Stores/User/Selectors';
import NavigationService from '../../Services/NavigationService';
import { Alert } from '../../Utils/Alert';

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
  qrCodeContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnGroup: {
    marginBottom: 10,
  },
});

function ScanMyScreen({ user }) {
  const [tab, setTab] = useState('scan');
  const [scanning, setScanning] = useState(true);
  const [qrCodeValue, setQrCodeValue] = useState(null);

  useEffect(() => {
    if (user && user.handle) {
      const items = ['artery', 'receive', '2', user.handle];
      setQrCodeValue(items.join('|||'));
    } else {
      setQrCodeValue(null);
    }
  }, [user]);

  const handleQrCodeData = useCallback(
    (data) => {
      if (scanning) {
        setScanning(false);
        try {
          if (data.name === 'artery') {
            NavigationService.navigate('SendMoneyAmountScreen', { qrCodeData: data });
            // setScanning(true);
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

  return (
    <PageViewFull header={<AuthHeader title="Scan a Code" />}>
      <View style={styles.container}>
        <View style={[styles.horizontalContainer]}>
          <H1 text="Scan a Code" icon={Images.scanQrIcon} />
          <Lead text="To send money or make a payment, simply scan the QR code your merchant provides you." />
          <TabButtonGroup style={styles.btnGroup}>
            <TabButton onPress={() => setTab('code')} text="My Code" active={tab === 'code'} />
            <TabButton onPress={() => setTab('scan')} text="Scan a Code" active={tab === 'scan'} />
          </TabButtonGroup>
        </View>
        {tab === 'scan' && (
          <View style={styles.cameraContainer}>
            <Camera onData={handleQrCodeData} mode={CAMERA_QR} />
          </View>
        )}
        {tab === 'code' && (
          <View style={[styles.horizontalContainer, styles.qrCodeContainer]}>
            <QRCode value={qrCodeValue} size={250} />
          </View>
        )}
      </View>
    </PageViewFull>
  );
}

ScanMyScreen.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: getUserSelector,
});

const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(withConnect)(ScanMyScreen);
