import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LocationData } from '../../services/LocationService';

interface LocationViewProps {
  locationData: LocationData;
}

export const LocationView: React.FC<LocationViewProps> = ({ locationData }) => {
  if (!locationData.northCoord || !locationData.eastCoord || !locationData.height) {
    return (
      <View style={styles.container}>
        <Text style={styles.unknownText}>מיקום לא ידוע</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.locationText}>
        <Text style={styles.identifier}>גו'</Text>
        <Text style={styles.value}>{locationData.height}</Text>
        <Text style={styles.identifier}>/צפ'</Text>
        <Text style={styles.value}>{locationData.northCoord}</Text>
        <Text style={styles.identifier}>/מז'</Text>
        <Text style={styles.value}>{locationData.eastCoord}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  locationText: {
    fontSize: 16,
    textAlign: 'right',
  },
  identifier: {
    color: '#666',
  },
  value: {
    color: '#000',
    fontWeight: 'bold',
  },
  unknownText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'right',
  },
}); 