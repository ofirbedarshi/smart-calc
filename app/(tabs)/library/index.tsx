import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const isAndroid = Platform.OS === 'android';

// For development, use your machine's local IP address.
const DEV_URL = isAndroid ? 'http://192.168.1.132:5173' : 'http://localhost:5173';

export default function LibraryScreen() {
  return (
    <WebView
      style={styles.container}
      source={{ uri: DEV_URL }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 