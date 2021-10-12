import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';
import { BanksService } from '../../Services/BanksService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  invisible: {
    opacity: 0,
  },
});

export function FrogWebView({ onEventReceived, invisible }) {
  const webRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [html, setHtml] = useState('');

  useEffect(() => {
    BanksService.getFrogHtml()
      .then((response) => {
        setHtml(response);
      })
      .catch((e) => {
        console.error(e);
      });

    return () => {
      setIsReady(false);
    };
  }, []);

  useEffect(() => {
    onEventReceived({ type: 'onReady', data: isReady });
  }, [isReady]);

  const handleWebviewMessage = ({ nativeEvent }) => {
    try {
      const { action, content } = JSON.parse(nativeEvent?.data);
      switch (action) {
        case 'ready':
          setIsReady(true);
          break;
        case 'onCancel':
          onEventReceived({ type: 'onCancel', data: null });
          break;
        case 'onEnrollmentSuccess':
          onEventReceived({ type: 'onEnrollmentSuccess', data: content });
          break;
      }
    } catch (e) {
      console.error(e);
      onEventReceived({ type: 'onError', value: e.message });
    }
  };

  return (
    <WebView
      ref={webRef}
      style={[styles.container, invisible ? styles.invisible : {}]}
      originWhitelist={['*']}
      allowUniversalAccessFromFileURLs={true}
      javaScriptCanOpenWindowsAutomatically={true}
      javaScriptEnabled={true}
      startInLoadingState={true}
      onMessage={handleWebviewMessage}
      source={{
        html: `
        <html lang="en">
      <head>
      <meta name="viewport" content="width=device-width">
      <title>Artery Pay</title>
      <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
      </head>
      <body>
            <div id="frog-div"></div>
            ${html}
            <div class="loading" >
              <p> Please wait, we are making thing's ready. </p>
            </div>
            
            <script>
             function init() {
               try {
                 if (typeof Cashflow === 'undefined') {
                    setTimeout(init, 1000);
                    return;
                  }
                  const cf = Cashflow;
                  
                  cf.init({ target: $('#frog-div') });

                  cf.ready = () => {
                    cf.open();
                    window.ReactNativeWebView.postMessage(JSON.stringify({ action: 'ready' }));
                  };

                  cf.onEnrollmentSuccess = (...e) => window.ReactNativeWebView.postMessage(JSON.stringify({ action: 'onEnrollmentSuccess', content: e }));
                  cf.onCancel = () => window.ReactNativeWebView.postMessage(JSON.stringify({ action: 'onCancel' }));
                 } catch (e) {
                    window.ReactNativeWebView.postMessage(e.message);
                     setTimeout(init, 1000);
                 }
              }
              init();
        </script>
        <style>
              .loading{
                  width: 100vw;
                  height: 100vh;
                  display: flex;
                  justify-content: center;
                  align-items: center;
              }
        </style>
      </body>
      </html>
            `,
      }}
    />
  );
}

FrogWebView.propTypes = {
  onEventReceived: PropTypes.func,
  invisible: PropTypes.bool,
};

FrogWebView.defaultProps = {
  invisible: false,
};