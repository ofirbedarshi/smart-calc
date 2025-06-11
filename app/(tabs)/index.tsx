import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { MyLocation } from '../../components/MyLocation';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <MyLocation />
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
