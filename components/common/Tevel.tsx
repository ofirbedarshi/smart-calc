import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

const PDF_VIEWER_URL = 'http://192.168.1.134:5173/#/tevel-pdf';

const Tevel = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>תבל</Text>
      </View>
      {error ? (
        <View style={styles.centered}>
          <Text style={{ color: 'red', textAlign: 'center' }}>שגיאה בטעינת PDF: {error}</Text>
        </View>
      ) : (
        <>
          {loading && (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color="#baaf9d" />
              <Text style={{ marginTop: 8 }}>טוען PDF...</Text>
            </View>
          )}
          <WebView
            source={{ uri: PDF_VIEWER_URL }}
            style={styles.webview}
            onLoadEnd={() => setLoading(false)}
            onError={syntheticEvent => {
              const { nativeEvent } = syntheticEvent;
              setError(nativeEvent?.description || 'שגיאה לא ידועה');
              setLoading(false);
            }}
            originWhitelist={['*']}
            containerStyle={loading || error ? { height: 0, width: 0 } : { flex: 1 }}
            javaScriptEnabled
            domStorageEnabled
            allowsBackForwardNavigationGestures
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    padding: 18,
    alignItems: 'center',
    backgroundColor: '#f7f4ef',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#444',
  },
  webview: { flex: 1, width: '100%', backgroundColor: '#fff' },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default Tevel; 