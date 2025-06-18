import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BaseInput, BaseInputProps } from './common/BaseInput';

interface EditableDataProps extends BaseInputProps {
  editMode: boolean;
  editComponent?: React.ReactNode;
  disabled?: boolean;
}

export const EditableData: React.FC<EditableDataProps> = ({
  editMode,
  label,
  value,
  editComponent,
  disabled = false,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.valueContainer}>
          {editMode ? (
            editComponent ? (
              React.isValidElement(editComponent)
                ? React.cloneElement(editComponent, { disabled })
                : editComponent
            ) : (
              <BaseInput
                label=""
                value={value}
                {...props}
                disabled={disabled}
              />
            )
          ) : (
            <Text style={styles.value}>{value || 'אין ערך'}</Text>
          )}
        </View>
        {label && <Text style={styles.label}>{label}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    flex: 1,
    marginLeft: 8,
  },
  valueContainer: {
    minHeight: 40,
    justifyContent: 'center',
    flex: 2,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
}); 