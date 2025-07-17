import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BaseInput, BaseInputProps } from './common/BaseInput';
import Tooltip from './common/Tooltip';

interface EditableDataProps extends BaseInputProps {
  editMode: boolean;
  editComponent?: React.ReactNode;
  disabled?: boolean;
  info?: string;
  textArea?: boolean;
  maxLength?: number;
}

function isFragment(element: React.ReactNode) {
  return React.isValidElement(element) && element.type === React.Fragment;
}

function cloneWithPropsIfSupported(element: React.ReactNode, props: any) {
  if (React.isValidElement(element)) {
    // Only pass props that the element supports
    return React.cloneElement(element, props);
  }
  return element;
}

export const EditableData: React.FC<EditableDataProps> = ({
  editMode,
  label,
  value,
  editComponent,
  disabled = false,
  info,
  textArea = false,
  maxLength,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.valueContainer}>
          {editMode ? (
            editComponent ? (
              isFragment(editComponent)
                ? editComponent
                : cloneWithPropsIfSupported(editComponent, { disabled, info, maxLength })
            ) : (
              <BaseInput
                label=""
                value={value}
                {...props}
                disabled={disabled}
                textArea={textArea}
                maxLength={maxLength}
              />
            )
          ) : (
            <Text style={styles.value}>{value || 'אין ערך'}</Text>
          )}
        </View>
        {label && (
          <View style={styles.labelInlineRow}>
            <Text style={styles.label}>{label}</Text>
            {!!info && info.trim() !== '' && (
              <Tooltip content={info} direction='left'>
                <FontAwesome name="info-circle" size={14} color="#007AFF" style={styles.infoIcon} />
              </Tooltip>
            )}
          </View>
        )}
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
  labelInlineRow: {
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginLeft: 8,
    gap: 4,
  },
  label: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  infoIcon: {
    marginRight: 1,
    marginLeft: 2,
  },
  valueContainer: {
    flex: 2,
    minHeight: 40,
    justifyContent: 'center',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
  },
}); 