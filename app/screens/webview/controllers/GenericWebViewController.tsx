import React, { useEffect, useRef, useState } from 'react';
import { Alert, Platform, StyleSheet, View } from 'react-native';
import type { WebView as WebViewType } from 'react-native-webview';
import { WebView } from 'react-native-webview';
import LibraryContentService from '../../../services/LibraryContentService';

const WEBAPP_URL = Platform.OS === 'android'
  ? (__DEV__ ? 'http://localhost:5173' : 'file:///android_asset/web-content/index.html')
  : (__DEV__ ? 'http://localhost:5173' : 'file:///web-content/index.html');

interface GenericWebViewControllerProps {
  storageKey: string;
  fallbackHtml: string;
  allowEdit?: boolean;
  editAccess?: string;
}

function GenericWebViewController({ storageKey, fallbackHtml, allowEdit = true, editAccess = 'Admin'}: GenericWebViewControllerProps) {
  const webViewRef = useRef<WebViewType>(null);
  const [logs, setLogs] = useState('');
  const [initialHtml, setInitialHtml] = useState<string | null>(null);
  const [webAppReady, setWebAppReady] = useState(false);

  // Load content on mount
  useEffect(() => {
    (async () => {
      try {
        const saved = await LibraryContentService.getContent(storageKey);
        setInitialHtml(saved || fallbackHtml);
        setLogs((prev) => prev + '\nLoaded initial content 2');
      } catch (e) {
        setInitialHtml(fallbackHtml);
        setLogs((prev) => prev + '\nError loading content, using fallback');
      }
    })();
  }, [storageKey, fallbackHtml]);

  const sendContentToWeb = () => {
    if (!initialHtml) return;
    setLogs((prev) => prev + '\nSending content to webapp' + storageKey);
    const message = JSON.stringify({ type: 'SET_CONTENT', html: initialHtml, allowEdit, editAccess, id: storageKey });
    webViewRef.current?.postMessage(message);
  };

  const handleWebViewMessage = async (event: any) => {
    setLogs((prev) => prev + '\nReceived message: ' + event.nativeEvent.data);
    try {
      const data = typeof event.nativeEvent.data === 'string' ? JSON.parse(event.nativeEvent.data) : event.nativeEvent.data;
      if (data && data.type === 'READY') {
        setWebAppReady(true);
        setTimeout(sendContentToWeb, 0);
      }
      if (data && data.type === 'SAVE_CONTENT' && typeof data.html === 'string') {
        try {
          await LibraryContentService.setContent(storageKey, data.html);
          setLogs((prev) => prev + '\nSaved content to LibraryContentService');
          !data.silent && Alert.alert('הצלחה', 'התוכן נשמר בהצלחה');
        } catch (err) {
          setLogs((prev) => prev + '\nFailed to save content: ' + err);
          Alert.alert('שגיאה', 'שמירת התוכן נכשלה, נסה שוב');
        }
      }
    } catch (e) {
      setLogs((prev) => prev + '\nError parsing message: ' + e);
    }
  };

  // If webapp becomes ready after content is loaded, send content
  useEffect(() => {
    if (webAppReady && initialHtml) {
      sendContentToWeb();
    }
  }, [webAppReady, initialHtml]);

  return (
    <View style={{ flex: 1 }}>
      {/* Logs for debugging, can be hidden in production */}
      {/* <Text style={{ padding: 8, color: '#333', fontSize: 12 }}>{logs}</Text> */}
      <WebView
        ref={webViewRef}
        style={styles.container}
        source={{ uri: WEBAPP_URL }}
        onMessage={handleWebViewMessage}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        allowFileAccessFromFileURLs={true}
        mixedContentMode="always"
        domStorageEnabled={true}
        javaScriptEnabled={true}
        scalesPageToFit={false}
        setBuiltInZoomControls={false}
        setDisplayZoomControls={false}
        automaticallyAdjustContentInsets={false}
        contentInsetAdjustmentBehavior="never"
        onShouldStartLoadWithRequest={() => true}
        injectedJavaScript={`
          (function() {
            if (window.visualViewport) {
              window.visualViewport.scale = 1;
            }
            var viewport = document.querySelector('meta[name="viewport"]');
            if (viewport) {
              viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            }
            document.documentElement.style.zoom = '1';
            document.body.style.zoom = '1';
          })();
        `}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          setLogs((prev) => prev + '\nWebView error: ' + nativeEvent.description);
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          setLogs((prev) => prev + '\nWebView HTTP error: ' + nativeEvent.statusCode);
        }}
      />
    </View>
  );
}

export default GenericWebViewController;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 