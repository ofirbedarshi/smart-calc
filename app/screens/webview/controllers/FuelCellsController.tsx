import React, { useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import type { WebView as WebViewType } from 'react-native-webview';
import { WebView } from 'react-native-webview';
import fuelCellHtml from '../pages/fuelCellHtml';

const isAndroid = Platform.OS === 'android';
const WEBAPP_URL = isAndroid ? 'http://192.168.1.101:5173/fuel-cells' : 'http://localhost:5173/fuel-cells';

function FuelCellsController() {
  const webViewRef = useRef<WebViewType>(null);
  // Only keep logs in state for debugging, not shown in UI
  const [logs, setLogs] = useState('');

  const sendContentToWeb = () => {
    setLogs((prev) => prev + '\nSending content to webapp');
    const message = JSON.stringify({ type: 'SET_CONTENT', html: fuelCellHtml });
    webViewRef.current?.postMessage(message);
  };

  const handleWebViewMessage = (event: any) => {
    setLogs((prev) => prev + '\nReceived message: ' + event.nativeEvent.data);
    try {
      const data = typeof event.nativeEvent.data === 'string' ? JSON.parse(event.nativeEvent.data) : event.nativeEvent.data;
      if (data && data.type === 'READY') {
        setTimeout(sendContentToWeb, 0);
      }
    } catch (e) {
      // Optionally keep error logs for debugging
      setLogs((prev) => prev + '\nError parsing message: ' + e);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        style={styles.container}
        source={{ uri: WEBAPP_URL }}
        onMessage={handleWebViewMessage}
      />
    </View>
  );
}

export default FuelCellsController;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 