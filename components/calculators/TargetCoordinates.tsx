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
}

export const TargetCoordinates: React.FC<TargetCoordinatesProps> = ({
  title,
  coordsData,
  onCoordsChange,
  distance,
  onDistanceChange,
  elevation,
  onElevationChange,
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
            placeholder="הזן זוהר"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  additionalFields: {
    gap: 16,
  },
}); 