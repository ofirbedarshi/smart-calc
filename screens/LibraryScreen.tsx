import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

// Import existing library components
import LibraryNavigation from '../app/screens/library/LibraryNavigation';

const Stack = createNativeStackNavigator();

const LibraryMainScreen = () => {
  return (
    <View style={styles.container}>
      <LibraryNavigation />
    </View>
  );
};

const LibraryScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LibraryMain" component={LibraryMainScreen} />
      {/* Add other library routes here as needed */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f8f4',
  },
});

export default LibraryScreen; 