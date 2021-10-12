/**
 *
 * QrFileReaderButton
 *
 */

import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormFooterButton } from '../styled/Form';
import { isJsonString } from '../../utils/isJsonString';
import QrScanner from '../QrScanner';
import { CodeReader } from '../../utils/codeReader';

const UploadInput = styled.input`
  psoition: absolute;
  left: -10000000px;
  top: -10000000px;
  width: 0;
  height: 0;
  visibility: hidden;
`;

const Canvas = styled.canvas`
  position: absolute;
  top: -1000000000px;
  left: -1000000000px;
  visibility: hidden;
`;

function QrFileReaderButton({
  title,
  capture,
  mode,
  acceptEverything,
  onSuccess,
  onFail,
}) {
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const reader = useRef();

  const handleUploadClick = useCallback(() => {
    fileInputRef.current.value = null;
    fileInputRef.current.click();
  }, [fileInputRef]);

  const fileChange = useCallback(e => {
    if (e.target.files.length === 0) {
      // No file selected, ignore
      return;
    }

    const img = new Image();
    img.onload = function onload() {
      const canvas = canvasRef.current;
      if (mode === 'pdf417') {
        canvas.height = img.height;
        canvas.width = img.width;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        scanFile(imageData);
      } else {
        const height = (900 * img.height) / img.width;
        canvas.height = height;
        canvas.width = 900;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 900, height);
        const imageData = ctx.getImageData(0, 0, 900, height);
        scanFile(imageData);
      }
    };
    img.src = URL.createObjectURL(e.target.files[0]);
  }, []);

  const scanFile = useCallback(
    async imageData => {
      const data = await reader.current.decode(imageData);
      if (data && isJsonString(data)) {
        if (onSuccess) {
          const json = JSON.parse(data);
          onSuccess(json);
        }
      } else if (data && data.startsWith('artery')) {
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
      } else if (data && acceptEverything) {
        onSuccess(data);
      } else if (onFail) {
        onFail('Please confirm the QR is for ArteryPay and try again');
      }
    },
    [onSuccess, onFail],
  );

  useEffect(() => {
    fileInputRef.current.addEventListener('change', fileChange);
    return () => {
      fileInputRef.current.removeEventListener('change', fileChange);
    };
  }, [fileInputRef]);

  useEffect(() => {
    reader.current = new CodeReader(mode);
  }, [mode]);

  return (
    <>
      <FormFooterButton type="button" secondary onClick={handleUploadClick}>
        {title || 'Select Code From Photos'}
      </FormFooterButton>
      <UploadInput
        type="file"
        id="qr-input-file"
        accept="image/*"
        ref={fileInputRef}
        capture={capture}
      />
      <Canvas ref={canvasRef} />
    </>
  );
}

QrFileReaderButton.propTypes = {
  title: PropTypes.string,
  capture: PropTypes.bool,
  acceptEverything: PropTypes.bool,
  onSuccess: PropTypes.func,
  onFail: PropTypes.func,
  mode: PropTypes.oneOf(['qr', 'pdf417']),
};

QrScanner.defaultProps = {
  mode: 'qr',
  acceptEverything: false,
};

export default QrFileReaderButton;
