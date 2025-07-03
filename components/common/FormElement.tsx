import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { NadbarElement, NadbarFormField } from './nadbarTypes';

interface FormElementProps {
  element: Extract<NadbarElement, { type: 'form' }>;
  onFieldChange: (fieldId: string, value: string) => void;
}

const FormElement: React.FC<FormElementProps> = ({ element, onFieldChange }) => {
  return (
    <View style={styles.container}>
      {element.data.map((field: NadbarFormField) => (
        <View key={field.fieldId} style={styles.fieldRow}>
          <Text style={styles.label}>{field.label}</Text>
          <TextInput
            style={styles.input}
            value={field.value}
            onChangeText={value => onFieldChange(field.fieldId, value)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    gap: 12,
  },
  fieldRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: '#333',
    minWidth: 80,
    textAlign: 'right',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    fontSize: 16,
    textAlign: 'right',
    backgroundColor: '#fff',
  },
});

export default FormElement; 