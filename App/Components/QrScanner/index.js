/**
 *
 * QrScanner
 *
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FluidFormContainer } from '../styled/Form';
import Container from '../Container';
import { isJsonString } from '../../utils/isJsonString';
import { Html5Qrcode as Qr } from '../../lib/CameraUtil';

const Wrapper = styled(FluidFormContainer)`
  background-color: rgba(0, 0, 0, 0.4);
  position: relative;
  padding: 0;
  // padding: 4rem 0;
`;

const ScannerText = styled.div`
  display: flex;
  text-align: center;
  // flex: 1;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  flex-direction: column;
`;

// const SwitchCameraButton = styled.button.attrs(() => ({ type: 'button' }))`
//   border: none;
//   background: none;
//   outline: none;
//   position: absolute;
//   top: 25px;
//   right: 0;
//   z-index: 50;
// `;

const Pdf417Image = styled.img`
  display: none;
`;

const CAMERA_PENDING = 'CAMERA_PENDING';
const CAMERA_READY = 'CAMERA_READY';
const CAMERA_DENIED = 'CAMERA_DENIED';
const CAMERA_UNSUPPORTED = 'CAMERA_UNSUPPORTED';

const FPS = 0.1;

function QrScanner({ disabled, acceptEverything, mode, onSuccess, onFail }) {
  const qrScanner = useRef(null);
  const canScan = useRef(!disabled);
  const wrapperRef = useRef(null);

  const [status, setStatus] = useState(CAMERA_PENDING);
  const [cameraId, setCameraId] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [cameraList, setCameras] = useState([]);

  const [browser, setBrowser] = useState(null);

  useEffect(() => {
    const { userAgent, mediaDevices } = window.navigator;
    if (mediaDevices === undefined) {
      setStatus(CAMERA_UNSUPPORTED);
    } else {
      Qr.getCameras()
        .then(cameras => {
          setCameras(cameras);
          if (cameras.length === 1) {
            setCameraId(cameras[0].id);
            setStatus(CAMERA_READY);
          } else if (cameras.length > 1) {
            const searchBackcamera = cameras.find(item =>
              item.label.toLowerCase().includes('back'),
            );
            setCameraId(
              searchBackcamera?.id || cameras[cameras.length - 1]?.id,
            );
            setStatus(CAMERA_READY);
          } else {
            setStatus(CAMERA_DENIED);
          }
        })
        .catch(() => {
          setStatus(CAMERA_DENIED);
        });
    }
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
      if (navigator.userAgent.match('CriOS')) {
        setBrowser('chrome');
      } else {
        setBrowser('safari');
      }
    } else {
      setBrowser(userAgent);
    }
  }, []);

  const handleScanSuccess = useCallback(
    data => {
      if (canScan.current && data) {
        if (isJsonString(data)) {
          if (onSuccess) {
            const json = JSON.parse(data);
            onSuccess(json);
          }
        } else if (data.startsWith('artery')) {
          const [name, type, version, handle] = data.split('|||');
          onSuccess({
            name,
            type,
            version,
            properties: {
              merchant_handle: handle,
              external_purchase_id: null,
            },
          });
        } else if (acceptEverything) {
          onSuccess(data);
        } else if (onFail) {
          onFail('Please confirm the QR is for ArteryPay and try again');
        }
      }
    },
    [canScan, onSuccess, onFail],
  );

  // eslint-disable-next-line no-unused-vars
  const handleScanError = useCallback(error => {}, []);

  useEffect(() => {
    if (cameraId && status === CAMERA_READY) {
      try {
        const qrBoxSize = wrapperRef.current.clientWidth - 40;
        qrScanner.current = new Qr('reader', mode);
        qrScanner.current
          .start(
            cameraId,
            { fps: FPS, qrbox: qrBoxSize },
            handleScanSuccess,
            handleScanError,
          )
          .catch();
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }
    return () => {
      try {
        if (qrScanner.current) {
          qrScanner.current.stop();
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    };
  }, [cameraId, status, mode]);

  useEffect(() => {
    canScan.current = !disabled;
  }, [disabled]);

  // const toggleCamera = useCallback(() => {
  //   const currentIndex = cameraList.findIndex(item => item.id === cameraId);
  //   if (currentIndex >= cameraList.length - 1) {
  //     setCameraId(cameraList[0].id);
  //   } else {
  //     setCameraId(cameraList[currentIndex + 1].id);
  //   }
  // }, [cameraList, cameraId]);

  return (
    <Wrapper ref={wrapperRef}>
      {/* <Container ref={wrapperRef}> */}
      {status === CAMERA_PENDING && (
        <Container>
          <ScannerText>Waiting for camera</ScannerText>
        </Container>
      )}
      {status === CAMERA_READY && (
        <>
          {/* {cameraList.length > 1 && ( */}
          {/*  <Container relative> */}
          {/*    <SwitchCameraButton onClick={toggleCamera}> */}
          {/*      Switch camera */}
          {/*    </SwitchCameraButton> */}
          {/*  </Container> */}
          {/* )} */}
          <div id="reader" />
          <Pdf417Image alt="pdf417" id="pdf417" />
        </>
      )}
      {status === CAMERA_DENIED && (
        <Container>
          <ScannerText>
            <h3>Your camera access was denied.</h3>
            <br />
            <span>You can still upload QR code from your photos.</span>
            {browser === 'safari' && (
              <>
                <br />
                <span>
                  You can enable camera by opening Website Settings tab in your
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  browser, choosing "Ask" or "Allow" for Camera access and
                  refreshing this page.
                </span>
              </>
            )}
          </ScannerText>
        </Container>
      )}
      {status === CAMERA_UNSUPPORTED && (
        <Container>
          <ScannerText>
            <h3>
              Your device or browser does not support camera in web
              applications.
            </h3>
            <br />
            <span>
              You can try using another browser or upload code from your photos.
            </span>
          </ScannerText>
        </Container>
      )}
      {/* </Container> */}
    </Wrapper>
  );
}

QrScanner.propTypes = {
  disabled: PropTypes.bool,
  acceptEverything: PropTypes.bool,
  onSuccess: PropTypes.func,
  onFail: PropTypes.func,
  mode: PropTypes.oneOf(['qr', 'pdf417']),
};

QrScanner.defaultProps = {
  mode: 'qr',
  disabled: false,
  acceptEverything: false,
};

export default QrScanner;
