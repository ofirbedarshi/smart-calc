import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LocationData } from '../services/LocationService';
import { useLocationStore } from '../stores/locationStore';
import { Modal } from './common/Modal';
import { LocationEdit } from './location/LocationEdit';
import { LocationView } from './location/LocationView';

export const SelfLocation: React.FC = () => {
  const { locationData, loadLocation, saveLocation } = useLocationStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      await loadLocation();
    } catch (error) {
      console.error('[SelfLocation] Error loading location:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (newLocationData: LocationData) => {
    try {
      setIsLoading(true);
      await saveLocation(newLocationData);
      Alert.alert('הצלחה', 'המיקום נשמר בהצלחה');
      setIsEditing(false);
    } catch (error) {
      Alert.alert('שגיאה', 'אירעה שגיאה בשמירת המיקום');
      console.error('[SelfLocation] Error saving location:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <FontAwesome 
            name="pencil" 
            size={20} 
            color="#007AFF" 
          />
        </TouchableOpacity>
        <Text style={styles.heading}>מיקום עצמי</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : (
        <LocationView locationData={locationData} />
      )}

      <Modal
        visible={isEditing}
        onClose={() => setIsEditing(false)}
        title="ערוך מיקום עצמי"
      >
        <LocationEdit
          locationData={locationData}
          isLoading={isLoading}
          onSave={handleSave}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  loader: {
    marginVertical: 20,
  },
}); 