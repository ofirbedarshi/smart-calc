import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const TargetPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>hello world</Text>
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
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TargetPage; 