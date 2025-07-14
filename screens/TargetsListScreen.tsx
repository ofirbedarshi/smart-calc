import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SafeAreaScreen from '../components/common/SafeAreaScreen';

// Import existing TargetsList components
import TargetDetailsMain from '../components/TargetDetailsMain';
import TargetsListMain from '../components/TargetsListMain';

const Stack = createNativeStackNavigator();

const TargetsListScreen = () => {
  return (
    <SafeAreaScreen>
      <Stack.Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName="TargetsListMain"
      >
        <Stack.Screen name="TargetsListMain" component={TargetsListMain} />
        <Stack.Screen name="TargetDetails" component={TargetDetailsMain} />
      </Stack.Navigator>
    </SafeAreaScreen>
  );
};

export default TargetsListScreen; 