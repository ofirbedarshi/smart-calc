import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CalculatorField } from '../../types/calculator';
import { BaseInput } from '../common/BaseInput';
import PrefixInput from '../common/PrefixInput';

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
            {field.prefixLength ? (
              <PrefixInput
                value={field.value}
                onChange={field.onChange || (() => {})}
                type={field.keyboardType === 'numeric' ? 'number' : 'text'}
                prefixLength={field.prefixLength}
              />
            ) : (
              <BaseInput
                value={field.value}
                onChange={field.onChange || (() => {})}
                type={field.keyboardType === 'numeric' ? 'number' : 'text'}
              />
            )}
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
}); 