import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LocationData } from '../../services/LocationService';
import { BaseInput } from '../common/BaseInput';
import PrefixInput from '../common/PrefixInput';

interface LocationEditProps {
  locationData: LocationData;
  isLoading: boolean;
  onSave: (data: LocationData) => void;
}

interface FormData {
  eastCoord: string;
  northCoord: string;
  height: string;
}

export const LocationEdit: React.FC<LocationEditProps> = ({
  locationData,
  isLoading,
  onSave,
}) => {
  const { control, handleSubmit, formState: { errors }, setError, clearErrors } = useForm<FormData>({
    defaultValues: {
      eastCoord: locationData.eastCoord,
      northCoord: locationData.northCoord,
      height: locationData.height,
    },
  });

  const onSubmit = (data: FormData) => {
    onSave({
      ...locationData,
      ...data,
    });
  };

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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.saveButton, isLoading && styles.saveButtonDisabled]} 
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          <Text style={styles.saveButtonText}>שמירה</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16,
  },
  buttonContainer: {
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: '#34C759',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 