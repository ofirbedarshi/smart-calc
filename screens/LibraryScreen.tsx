import React from 'react';
import { StyleSheet, View } from 'react-native';
import SafeAreaScreen from '../components/common/SafeAreaScreen';

// Import existing library components
import LibraryNavigation from '../app/screens/library/LibraryNavigation';

const LibraryMainScreen = () => {
  return (
    <SafeAreaScreen>
      <View style={styles.container}>
        <LibraryNavigation />
      </View>
    </SafeAreaScreen>
  );
};

export default LibraryMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f8f4',
  },
}); 