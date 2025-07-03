import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BaseInput } from './BaseInput';
import InputCard from './InputCard';
import { NadbarElement, NadbarFormField } from './nadbarTypes';

interface FormElementProps {
  element: Extract<NadbarElement, { type: 'form' }>;
  onFieldChange: (fieldId: string, value: string) => void;
}

const FormElement: React.FC<FormElementProps> = ({ element, onFieldChange }) => {
  return (
    <InputCard style={styles.card}>
      <View style={styles.container}>
        {element.header && (
          <Text style={styles.header}>{element.header}</Text>
        )}
        {element.data.map((field: NadbarFormField) => (
          <View key={field.fieldId} style={styles.row}>
            <View style={styles.inputWrapper}>
              <BaseInput
                value={field.value}
                onChange={value => onFieldChange(field.fieldId, value)}
              />
            </View>
            <Text style={styles.label}>{field.label}</Text>
          </View>
        ))}
      </View>
    </InputCard>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  container: {
    marginVertical: 8,
    gap: 12,
    width: '100%',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
    width: '100%',
    marginBottom: 4,
  },
  label: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
    flex: 1,
    flexShrink: 1,
    maxWidth: '60%',
  },
  inputWrapper: {
    width: 160,
    minWidth: 100,
    maxWidth: 220,
  },
});

export default FormElement; 