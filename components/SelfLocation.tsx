import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LocationData, LocationService } from '../services/LocationService';

export const SelfLocation: React.FC = () => {
  const [locationData, setLocationData] = useState<LocationData>({
    height: '',
    latitude: '',
    longitude: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await LocationService.saveLocation(locationData);
      Alert.alert('הצלחה', 'המיקום נשמר בהצלחה');
    } catch (error) {
      Alert.alert('שגיאה', 'אירעה שגיאה בשמירת המיקום');
      console.error('[SelfLocation] Error saving location:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>מיקום עצמי</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="גובה"
          keyboardType="numeric"
          value={locationData.height}
          onChangeText={(text) => setLocationData({ ...locationData, height: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="נ.צ צפוני"
          keyboardType="numeric"
          value={locationData.latitude}
          onChangeText={(text) => setLocationData({ ...locationData, latitude: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="נ.צ מזרחי"
          keyboardType="numeric"
          value={locationData.longitude}
          onChangeText={(text) => setLocationData({ ...locationData, longitude: text })}
        />
      </View>
      <TouchableOpacity 
        style={[styles.saveButton, isLoading && styles.saveButtonDisabled]} 
        onPress={handleSave}
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
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    textAlign: 'right',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
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