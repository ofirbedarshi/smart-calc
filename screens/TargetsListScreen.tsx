import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';

// Import existing TargetsList components
import TargetDetailsMain from '../components/TargetDetailsMain';
import TargetsListMain from '../components/TargetsListMain';

const Stack = createNativeStackNavigator();

const TargetsListScreen = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      initialRouteName="TargetsListMain"
    >
      <Stack.Screen name="TargetsListMain" component={TargetsListMain} />
      <Stack.Screen name="TargetDetails" component={TargetDetailsMain} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f8f4',
  },
});

export default TargetsListScreen; 