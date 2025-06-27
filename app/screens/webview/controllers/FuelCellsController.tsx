import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import type { WebView as WebViewType } from 'react-native-webview';
import { WebView } from 'react-native-webview';
import LibraryContentService from '../../../services/LibraryContentService';
import { fuelCellHtml } from '../pages/fuelCellHtml';

const isAndroid = Platform.OS === 'android';
const WEBAPP_URL = isAndroid ? 'http://192.168.1.101:5173/fuel-cells' : 'http://localhost:5173/fuel-cells';

function FuelCellsController() {
  const webViewRef = useRef<WebViewType>(null);
  const [logs, setLogs] = useState('');
  const [initialHtml, setInitialHtml] = useState<string | null>(null);
  const [webAppReady, setWebAppReady] = useState(false);

  // Load content on mount
  useEffect(() => {
    (async () => {
      try {
        const saved = await LibraryContentService.getContent('fuelCellContent');
        setInitialHtml(saved || fuelCellHtml);
        setLogs((prev) => prev + '\nLoaded initial content');
      } catch (e) {
        setInitialHtml(fuelCellHtml);
        setLogs((prev) => prev + '\nError loading content, using fallback');
      }
    })();
  }, []);

  const sendContentToWeb = () => {
    if (!initialHtml) return;
    setLogs((prev) => prev + '\nSending content to webapp');
    const message = JSON.stringify({ type: 'SET_CONTENT', html: initialHtml });
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
        await LibraryContentService.setContent('fuelCellContent', data.html);
        setLogs((prev) => prev + '\nSaved content to LibraryContentService');
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