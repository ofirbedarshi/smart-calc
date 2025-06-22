import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CalculatorField } from '../../types/calculator';

interface ConversionResultsProps {
  title: string;
  fields: CalculatorField[];
}

export const ConversionResults: React.FC<ConversionResultsProps> = ({ title, fields }) => {
  const hasVisibleFields = fields.some(field => field.value);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      {hasVisibleFields? fields.map((field, index) => (
          <View key={index} style={styles.resultItem}>
            <Text style={styles.resultLabel}>{field.label}</Text>
            <Text style={styles.resultValue}>{field.value || 'אין ערך'}</Text>
          </View>
        )) : <View style={styles.resultItem}>
        <Text style={styles.resultLabel}>אין תוצאות</Text>
      </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
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