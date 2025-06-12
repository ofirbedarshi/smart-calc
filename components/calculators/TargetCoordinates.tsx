import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CalculatorField } from '../../../types/calculator';
import { TargetInputs } from './TargetInputs';

interface TargetCoordinatesProps {
  title: string;
  fields: CalculatorField[];
}

export const TargetCoordinates: React.FC<TargetCoordinatesProps> = ({ title, fields }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TargetInputs fields={fields} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'right',
  },
}); 