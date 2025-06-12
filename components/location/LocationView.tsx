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
      <View style={styles.locationRow}>
        <View style={styles.locationItem}>
          <Text style={styles.locationLabel}>גובה:</Text>
          <Text style={styles.locationValue} numberOfLines={1}>{locationData.height}</Text>
        </View>
        <View style={styles.locationItem}>
          <Text style={styles.locationLabel}>נ.צ צפוני:</Text>
          <Text style={styles.locationValue} numberOfLines={1}>{locationData.northCoord}</Text>
        </View>
        <View style={styles.locationItem}>
          <Text style={styles.locationLabel}>נ.צ מזרחי:</Text>
          <Text style={styles.locationValue} numberOfLines={1}>{locationData.eastCoord}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    paddingVertical: 8,
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
  locationRow: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'flex-start',
  },
  locationItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 4,
    flexShrink: 1,
    minWidth: 120,
  },
  locationLabel: {
    fontSize: 16,
    color: '#666',
  },
  locationValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flexShrink: 1,
  },
}); 