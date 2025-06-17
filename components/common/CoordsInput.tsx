import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { BaseInput } from './BaseInput';
import PrefixInput from './PrefixInput';

export interface CoordsData {
  eastCoord: string;
  northCoord: string;
  height: string;
}

interface CoordsInputProps {
  initialData: CoordsData;
  onChange: (data: CoordsData) => void;
  onValidationChange?: (isValid: boolean) => void;
}

export const CoordsInput: React.FC<CoordsInputProps> = ({
  initialData,
  onChange,
  onValidationChange,
}) => {
  const { control, formState: { errors, isValid }, setError, clearErrors } = useForm<CoordsData>({
    defaultValues: initialData,
    mode: 'onChange',
  });

  React.useEffect(() => {
    onValidationChange?.(isValid);
  }, [isValid, onValidationChange]);

  const validateEastCoord = (value: string) => {
    if (!value) return 'נ.צ מזרחי הוא שדה חובה';
    if (!/^\d{6}$/.test(value)) return 'נ.צ מזרחי חייב להכיל 6 ספרות';
    return true;
  };

  const validateNorthCoord = (value: string) => {
    if (!value) return 'נ.צ צפוני הוא שדה חובה';
    if (!/^\d{7}$/.test(value)) return 'נ.צ צפוני חייב להכיל 7 ספרות';
    return true;
  };

  const validateHeight = (value: string) => {
    if (!value) return 'גובה הוא שדה חובה';
    if (!/^\d+(\.\d+)?$/.test(value)) return 'גובה חייב להיות מספר';
    return true;
  };

  const handleFieldChange = (field: keyof CoordsData, value: string) => {
    onChange({ ...initialData, [field]: value });
  };

  return (
    <View style={styles.container}>
      <Controller
        name="eastCoord"
        control={control}
        rules={{ validate: validateEastCoord }}
        render={({ field: { onChange, value, onBlur } }) => (
          <BaseInput
            label="נ.צ מזרחי"
            value={value}
            onChange={(newValue) => {
              onChange(newValue);
              handleFieldChange('eastCoord', newValue);
            }}
            onBlur={() => {
              onBlur();
              if (errors.eastCoord) {
                const result = validateEastCoord(value);
                if (result === true) {
                  clearErrors('eastCoord');
                }
              }
            }}
            type="number"
            maxLength={6}
            placeholder="הזן נ.צ מזרחי"
            error={errors.eastCoord?.message}
          />
        )}
      />

      <Controller
        name="northCoord"
        control={control}
        rules={{ validate: validateNorthCoord }}
        render={({ field: { onChange, value, onBlur } }) => (
          <PrefixInput
            label="נ.צ צפוני"
            value={value}
            onChange={(newValue) => {
              onChange(newValue);
              handleFieldChange('northCoord', newValue);
            }}
            onBlur={() => {
              onBlur();
              if (errors.northCoord) {
                const result = validateNorthCoord(value);
                if (result === true) {
                  clearErrors('northCoord');
                }
              }
            }}
            type="number"
            maxLength={7}
            prefixLength={1}
            placeholder="הזן נ.צ צפוני"
            error={errors.northCoord?.message}
          />
        )}
      />

      <Controller
        name="height"
        control={control}
        rules={{ validate: validateHeight }}
        render={({ field: { onChange, value, onBlur } }) => (
          <BaseInput
            label="גובה"
            value={value}
            onChange={(newValue) => {
              onChange(newValue);
              handleFieldChange('height', newValue);
            }}
            onBlur={() => {
              onBlur();
              if (errors.height) {
                const result = validateHeight(value);
                if (result === true) {
                  clearErrors('height');
                }
              }
            }}
            type="number"
            placeholder="הזן גובה"
            error={errors.height?.message}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
}); 