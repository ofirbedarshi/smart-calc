import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { CalculatorField } from '../../../types/calculator';

interface TargetInputsProps {
  fields: CalculatorField[];
}

export const TargetInputs: React.FC<TargetInputsProps> = ({ fields }) => {
  return (
    <View style={styles.container}>
      {fields.map((field, index) => (
        <View key={index} style={styles.inputGroup}>
          <Text style={styles.inputLabel}>{field.label}</Text>
          <TextInput
            style={styles.input}
            value={field.value}
            onChangeText={field.onChange}
            keyboardType={field.keyboardType || 'default'}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  inputGroup: {
    gap: 4,
  },
  inputLabel: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    textAlign: 'right',
  },
}); 