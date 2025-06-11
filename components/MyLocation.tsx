import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface LocationData {
  height: string;
  latitude: string;
  longitude: string;
}

export const MyLocation: React.FC = () => {
  const [locationData, setLocationData] = useState<LocationData>({
    height: '',
    latitude: '',
    longitude: '',
  });

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving location data:', locationData);
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
          placeholder="קו רוחב"
          keyboardType="numeric"
          value={locationData.latitude}
          onChangeText={(text) => setLocationData({ ...locationData, latitude: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="קו אורך"
          keyboardType="numeric"
          value={locationData.longitude}
          onChangeText={(text) => setLocationData({ ...locationData, longitude: text })}
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>שמירה</Text>
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
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 