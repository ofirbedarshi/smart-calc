import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LocationData } from '../../services/LocationService';

interface LocationViewProps {
  locationData: LocationData;
}

export const LocationView: React.FC<LocationViewProps> = ({ locationData }) => {
  const isLocationComplete = locationData.height && locationData.northCoord && locationData.eastCoord;

  if (!isLocationComplete) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>מיקום לא ידוע</Text>
      </View>
    );
  }

  return (
    <View style={styles.viewContainer}>
      <View style={styles.locationItem}>
        <Text style={styles.locationLabel}>גובה</Text>
        <Text style={styles.locationValue}>{locationData.height}</Text>
      </View>
      <View style={styles.locationItem}>
        <Text style={styles.locationLabel}>נ.צ צפוני</Text>
        <Text style={styles.locationValue}>{locationData.northCoord}</Text>
      </View>
      <View style={styles.locationItem}>
        <Text style={styles.locationLabel}>נ.צ מזרחי</Text>
        <Text style={styles.locationValue}>{locationData.eastCoord}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    gap: 12,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  locationItem: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  locationLabel: {
    fontSize: 16,
    color: '#666',
  },
  locationValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
}); 