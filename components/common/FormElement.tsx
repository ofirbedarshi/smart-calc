import React from 'react';
import { StyleSheet, View } from 'react-native';
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
        {element.data.map((field: NadbarFormField) => (
          <BaseInput
            key={field.fieldId}
            label={field.label}
            value={field.value}
            onChange={value => onFieldChange(field.fieldId, value)}
          />
        ))}
      </View>
    </InputCard>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  container: {
    marginVertical: 8,
    gap: 12,
    width: '100%',
  },
});

export default FormElement; 