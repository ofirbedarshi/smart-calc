import { StyleSheet, Text, View } from 'react-native';

export default function BackAzimuth() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>חיתוך לאחור</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
}); 