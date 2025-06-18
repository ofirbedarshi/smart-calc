import { SafeAreaView, StyleSheet } from 'react-native';
import { SelfLocation } from '../../components/SelfLocation';
import TargetsList from '../screens/targetList/TargetsList';

export default function TargetsListTab() {
  return (
      <SafeAreaView style={styles.container}>
        <SelfLocation />
        <TargetsList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
