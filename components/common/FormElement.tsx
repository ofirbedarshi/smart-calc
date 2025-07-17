import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MergedNadbarElement, MergedNadbarField } from '../../utils/NadbarMerger';
import { BaseInput } from './BaseInput';
import { Dropdown } from './Dropdown';
import InputCard from './InputCard';
import Tooltip from './Tooltip';

interface FormElementProps {
  element: Extract<MergedNadbarElement, { type: 'form' }>;
  onFieldChange: (fieldId: string, value: string) => void;
}

const FormElement: React.FC<FormElementProps> = ({ element, onFieldChange }) => {
  const renderInput = (field: MergedNadbarField) => {
    if (field.inputType === 'none' && field.constantText) {
      return <Text style={styles.constantText}>{field.constantText}</Text>;
    }
    if (field.inputType === 'dropdown' && field.inputOptions?.dropdown) {
      const options = field.inputOptions.dropdown.map(option => ({
        label: option,
        value: option,
      }));
      return (
        <View style={styles.fullWidth}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>{field.label}</Text>
            {field.targetField && (
              <Tooltip content={'המידע הנ״ל נטען מהמטרה'} direction='left'>
                <FontAwesome name="info-circle" size={14} color="#007AFF" style={styles.infoIcon} />
              </Tooltip>
            )}
          </View>
          <Dropdown
            options={options}
            value={field.value}
            onChange={value => onFieldChange(field.fieldId, value)}
          />
        </View>
      );
    }

    // Info icon above input if needed
    return (
      <View style={styles.fullWidth}>
        <View style={styles.labelRow}>
          <Text style={styles.label}>{field.label}</Text>
          {field.targetField && (
            <Tooltip content={'המידע הנ״ל נטען מהמטרה'} direction='left'>
              <FontAwesome name="info-circle" size={14} color="#007AFF" style={styles.infoIcon} />
            </Tooltip>
          )}
        </View>
        <BaseInput
          value={field.value}
          onChange={value => onFieldChange(field.fieldId, value)}
          autoGrowVertically={true}
        />
      </View>
    );
  };

  return (
    <InputCard style={styles.card}>
      <View style={styles.container}>
        {element.header && (
          <Text style={styles.header}>{element.header}</Text>
        )}
        {element.data.map((field: MergedNadbarField) => (
          <View key={field.fieldId} style={styles.fieldBlock}>
            {renderInput(field)}
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
  fieldBlock: {
    width: '100%',
    marginBottom: 4,
  },
  labelRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  label: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
    flexShrink: 1,
  },
  infoIcon: {
    marginLeft: 4,
  },
  constantText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
    paddingVertical: 8,
  },
  fullWidth: {
    width: '100%',
    minWidth: 0,
    maxWidth: '100%',
  },
});

export default FormElement; 