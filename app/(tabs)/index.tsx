import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { SelfLocation } from '../../components/SelfLocation';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <SelfLocation />
      <View style={styles.content}>
        <Text style={styles.text}>Hello World</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
});
