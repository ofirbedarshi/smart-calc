import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LocationData } from '../../services/LocationService';
import { CoordsData, CoordsInput } from '../common/CoordsInput';

interface LocationEditProps {
  locationData: LocationData;
  isLoading: boolean;
  onSave: (data: LocationData) => void;
}

export const LocationEdit: React.FC<LocationEditProps> = ({
  locationData,
  isLoading,
  onSave,
}) => {
  const [isValid, setIsValid] = useState(false);
  const [coordsData, setCoordsData] = useState<CoordsData>({
    eastCoord: locationData.eastCoord,
    northCoord: locationData.northCoord,
    height: locationData.height,
  });

  const handleCoordsChange = (data: CoordsData) => {
    setCoordsData(data);
  };

  const handleSave = () => {
    onSave({
      ...locationData,
      ...coordsData,
    });
  };

  return (
    <View style={styles.container}>
      <CoordsInput
        initialData={coordsData}
        onChange={handleCoordsChange}
        onValidationChange={setIsValid}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.saveButton, (!isValid || isLoading) && styles.saveButtonDisabled]} 
          onPress={handleSave}
          disabled={!isValid || isLoading}
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