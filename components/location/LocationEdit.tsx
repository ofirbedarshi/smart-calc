import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LocationData } from '../../services/LocationService';

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
  const [editData, setEditData] = useState<LocationData>(locationData);

  useEffect(() => {
    setEditData(locationData);
  }, [locationData]);

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>גובה</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={editData.height}
          onChangeText={(text) => setEditData({ ...editData, height: text })}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>נ.צ צפוני</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={editData.northCoord}
          onChangeText={(text) => setEditData({ ...editData, northCoord: text })}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>נ.צ מזרחי</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={editData.eastCoord}
          onChangeText={(text) => setEditData({ ...editData, eastCoord: text })}
        />
      </View>
      <TouchableOpacity 
        style={[styles.saveButton, isLoading && styles.saveButtonDisabled]} 
        onPress={() => onSave(editData)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>שמירה</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    gap: 16,
  },
  inputGroup: {
    gap: 4,
  },
  inputLabel: {
    fontSize: 16,
    color: '#666',
    textAlign: 'right',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    textAlign: 'right',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 