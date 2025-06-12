import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CalculatorField } from '../../../types/calculator';

interface ConversionResultsProps {
  title: string;
  fields: CalculatorField[];
}

export const ConversionResults: React.FC<ConversionResultsProps> = ({ title, fields }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      
      {fields.map((field, index) => (
        <View key={index} style={styles.resultItem}>
          <Text style={styles.resultLabel}>{field.label}</Text>
          <Text style={styles.resultValue}>{field.value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    margin: 16,
    borderRadius: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'right',
  },
  resultItem: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  resultLabel: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
  },
}); 