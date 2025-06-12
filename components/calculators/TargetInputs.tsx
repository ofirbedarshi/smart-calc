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
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              value={field.value}
              onChangeText={field.onChange}
              keyboardType={field.keyboardType || 'default'}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 4,
    justifyContent: 'flex-start',
  },
  inputGroup: {
    gap: 2,
    marginLeft: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  inputWrapper: {
    alignItems: 'flex-end',
  },
  input: {
    width: 110,
    height: 36,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 14,
    textAlign: 'right',
  },
}); 