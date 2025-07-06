import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BaseInput } from './BaseInput';
import { Dropdown } from './Dropdown';
import InputCard from './InputCard';
import { NadbarElement, NadbarFormField } from './nadbarTypes';

interface FormElementProps {
  element: Extract<NadbarElement, { type: 'form' }>;
  onFieldChange: (fieldId: string, value: string) => void;
}

const FormElement: React.FC<FormElementProps> = ({ element, onFieldChange }) => {
  const renderInput = (field: NadbarFormField) => {
    if (field.inputType === 'dropdown' && field.inputOptions?.dropdown) {
      const options = field.inputOptions.dropdown.map(option => ({
        label: option,
        value: option,
      }));
      
      return (
        <Dropdown
          options={options}
          value={field.value}
          onChange={value => onFieldChange(field.fieldId, value)}
        />
      );
    }
    
    return (
      <BaseInput
        value={field.value}
        onChange={value => onFieldChange(field.fieldId, value)}
        textArea={field.inputType === 'textArea'}
      />
    );
  };

  return (
    <InputCard style={styles.card}>
      <View style={styles.container}>
        {element.header && (
          <Text style={styles.header}>{element.header}</Text>
        )}
        {element.data.map((field: NadbarFormField) => (
          <View key={field.fieldId} style={styles.row}>
            <View style={styles.inputWrapper}>
              {renderInput(field)}
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