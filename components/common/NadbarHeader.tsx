import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InputCard from './InputCard';

interface NadbarHeaderProps {
  data: string;
}

const NadbarHeader: React.FC<NadbarHeaderProps> = ({ data }) => {
  return (
    <InputCard style={styles.card}>
      <View style={styles.container}>
        <Text style={styles.header}>{data}</Text>
      </View>
    </InputCard>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  container: {
    gap: 12,
    width: '100%',
    alignItems: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default NadbarHeader; 