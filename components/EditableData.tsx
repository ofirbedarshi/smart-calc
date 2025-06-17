import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BaseInput, BaseInputProps } from './common/BaseInput';

interface EditableDataProps extends BaseInputProps {
  editMode: boolean;
}

export const EditableData: React.FC<EditableDataProps> = ({
  editMode,
  label,
  value,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.valueContainer}>
        {editMode ? (
          <BaseInput
            label=""
            value={value}
            {...props}
          />
        ) : (
          <Text style={styles.value}>{value || 'אין ערך'}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    textAlign: 'right',
  },
  valueContainer: {
    minHeight: 40, // Match BaseInput height
    justifyContent: 'center',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
}); 