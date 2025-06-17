import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BaseInput } from '../common/BaseInput';
import { CoordsData, CoordsInput } from '../common/CoordsInput';

interface TargetCoordinatesProps {
  title: string;
  coordsData: CoordsData;
  onCoordsChange: (data: CoordsData) => void;
  distance: string;
  onDistanceChange: (value: string) => void;
  elevation?: string;
  onElevationChange?: (value: string) => void;
  height?: string;
  onHeightChange?: (value: string) => void;
}

export const TargetCoordinates: React.FC<TargetCoordinatesProps> = ({
  title,
  coordsData,
  onCoordsChange,
  distance,
  onDistanceChange,
  elevation,
  onElevationChange,
  height,
  onHeightChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      <CoordsInput
        initialData={coordsData}
        onChange={onCoordsChange}
      />

      <View style={styles.additionalFields}>
        <BaseInput
          label="טווח"
          value={distance}
          onChange={onDistanceChange}
          type="number"
          placeholder="הזן טווח"
        />

        {onElevationChange && (
          <BaseInput
            label="זוהר (אופציונלי)"
            value={elevation || ''}
            onChange={onElevationChange}
            type="number"
            placeholder="הזן זוה״ר"
          />
        )}

        {onHeightChange && (
          <BaseInput
            label="גובה (מטרים) (אופציונלי)"
            value={height || ''}
            onChange={onHeightChange}
            type="number"
            placeholder="הזן גובה"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'right',
  },
  additionalFields: {
    marginTop: 16,
    gap: 16,
  },
}); 