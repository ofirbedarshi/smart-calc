import React from 'react';
import { StyleSheet, View } from 'react-native';
import NadbarRenderer from '../../common/NadbarRenderer';
import { NadbarScheme } from '../../common/nadbarTypes';
import emptyMaskarScheme from './emptyMaskarScheme.json';

const Maskar: React.FC = () => (
  <View style={styles.container}>
    <NadbarRenderer scheme={emptyMaskarScheme as NadbarScheme} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Maskar; 