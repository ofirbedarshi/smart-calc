import { SafeAreaView, StyleSheet } from 'react-native';
import { CalculatorNavigation } from '../../../components/CalculatorNavigation';
import { SelfLocation } from '../../../components/SelfLocation';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <SelfLocation />
      <CalculatorNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
