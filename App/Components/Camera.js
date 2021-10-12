import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import { FillToAspectRatio } from './FillToAspectRation';
import { isJsonString } from '../Utils/Helpers';

export const CAMERA_ANY = 'ANY';
export const CAMERA_QR = 'QR_CODE';
export const CAMERA_PDF417 = 'PDF_417';

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  camera: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});

const cameraBox = 300;

export function Camera({ mode, onData }) {
  const cameraRef = useRef(null);
  const [googleBarcodeTypes, setGoogleBarcodetypes] = useState();
  const [maskSize, setMaskSize] = useState({ width: cameraBox, height: cameraBox });

  const configureCamera = React.useCallback(() => {
    if (mode === CAMERA_PDF417) {
      setMaskSize({ width: cameraBox, height: cameraBox / 3 });
      setGoogleBarcodetypes(RNCamera.Constants.BarCodeType.pdf417)
    } else {
      setMaskSize({ width: cameraBox, height: cameraBox });
      if (mode === CAMERA_QR) {
        setGoogleBarcodetypes(RNCamera.Constants.BarCodeType.qr)
      }
    }
  }, [mode]);

  React.useEffect(() => {
    configureCamera();
  }, [mode]);

  const barcodeRead = (res) => {
    const data = res.barcodes[0].rawData
    if (data) {
      if (isJsonString(data)) {
        const json = JSON.parse(data);
        onData(json);
      } else if (data.startsWith('artery')) {
        const [name, type, version, handle] = data.split('|||');
        onData({
          name,
          type,
          version,
          properties: {
            merchant_handle: handle,
            external_purchase_id: null,
          },
        });
      } else {
        onData(data);
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <FillToAspectRatio>
        <RNCamera
          disabled={true}
          ref={cameraRef}
          style={styles.camera}
          captureAudio={false}
          googleVisionBarcodeType={googleBarcodeTypes}
          onGoogleVisionBarcodesDetected={barcodeRead}
          autoFocus={true}
        >
          <BarcodeMask showAnimatedLine={false} width={maskSize.width} height={maskSize.height} />
        </RNCamera>
      </FillToAspectRatio>
    </View>
  );
}

Camera.defaultProps = {
  mode: CAMERA_QR,
};

Camera.propTypes = {
  mode: PropTypes.oneOf([CAMERA_QR, CAMERA_PDF417, CAMERA_ANY]).isRequired,
  onData: PropTypes.func.isRequired,
};
