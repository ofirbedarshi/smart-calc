import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

const TargetPage = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button title="מסקר" onPress={() => router.push('/TargetPage/Maskar')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default TargetPage; 