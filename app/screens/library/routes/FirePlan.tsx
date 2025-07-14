import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FirePlan = () => {
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
    color: '#222',
    textAlign: 'center',
  },
});

export default FirePlan; 