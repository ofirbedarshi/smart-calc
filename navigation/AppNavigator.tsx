import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Text, View } from 'react-native';

// Import screens
import Artillery from '../app/(tabs)/TargetPage/Artillery';
import Chemam from '../app/(tabs)/TargetPage/Chemam';
import KravBarkat from '../app/(tabs)/TargetPage/KravBarkat';
import KravLaserLoal from '../app/(tabs)/TargetPage/KravLaserLoal';
import KravLaserLobl from '../app/(tabs)/TargetPage/KravLaserLobl';
import KravLine6 from '../app/(tabs)/TargetPage/KravLine6';
import KravSaduraLaser from '../app/(tabs)/TargetPage/KravSaduraLaser';
import Lehat from '../app/(tabs)/TargetPage/Lehat';
import Maskar from '../app/(tabs)/TargetPage/Maskar';
import MaskarLoal from '../app/(tabs)/TargetPage/MaskarLoal';
import Mortars from '../app/(tabs)/TargetPage/Mortars';
import NadbarListRoute from '../app/(tabs)/TargetPage/NadbarListRoute';
import OketzPlada from '../app/(tabs)/TargetPage/OketzPlada';
import TargetDetailsMain from '../components/TargetDetailsMain';
import CalculatorScreen from '../screens/CalculatorScreen';
import LibraryScreen from '../screens/LibraryScreen';
import TargetPageScreen from '../screens/TargetPageScreen';
import TargetsListScreen from '../screens/TargetsListScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: string;
        let label: string;
        if (route.name === 'Library') {
          iconName = 'book';
          label = 'ספריה';
        } else if (route.name === 'TargetPage') {
          iconName = 'bullseye';
          label = 'דף מטרה';
        } else if (route.name === 'TargetsList') {
          iconName = 'map-marker';
          label = 'בנק מטרות';
        } else if (route.name === 'Calculator') {
          iconName = 'calculator';
          label = 'מחשבון';
        } else {
          iconName = 'question';
          label = 'Unknown';
        }
        const activeColor = '#1976D2';
        return (
          <View style={{ alignItems: 'center' }}>
            <FontAwesome name={iconName as any} size={size} color={focused ? activeColor : color} />
            <Text
              style={{
                fontSize: 12,
                color: focused ? activeColor : color,
                marginTop: 2,
                fontWeight: focused ? 'bold' : 'normal',
              }}
            >
              {label}
            </Text>
          </View>
        );
      },
      tabBarActiveTintColor: '#333',
      tabBarInactiveTintColor: '#666',
      tabBarStyle: {
        backgroundColor: '#ffffff',
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        height: 80,
        paddingBottom: 20,
      },
      headerShown: false,
    })}
  >
    <Tab.Screen name="Calculator" component={CalculatorScreen} options={{ tabBarLabel: () => null }} />
    <Tab.Screen name="Library" component={LibraryScreen} options={{ tabBarLabel: () => null }} />
    <Tab.Screen name="TargetPage" component={TargetPageScreen} options={{ tabBarLabel: () => null }} />
    <Tab.Screen name="TargetsList" component={TargetsListScreen} options={{ tabBarLabel: () => null }} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        {/* Nadbar-related screens and TargetDetails accessible globally */}
        <Stack.Screen name="Maskar" component={Maskar} />
        <Stack.Screen name="MaskarLoal" component={MaskarLoal} />
        <Stack.Screen name="KravBarkat" component={KravBarkat} />
        <Stack.Screen name="KravSaduraLaser" component={KravSaduraLaser} />
        <Stack.Screen name="KravLaserLobl" component={KravLaserLobl} />
        <Stack.Screen name="KravLine6" component={KravLine6} />
        <Stack.Screen name="KravLaserLoal" component={KravLaserLoal} />
        <Stack.Screen name="OketzPlada" component={OketzPlada} />
        <Stack.Screen name="Mortars" component={Mortars} />
        <Stack.Screen name="Chemam" component={Chemam} />
        <Stack.Screen name="Lehat" component={Lehat} />
        <Stack.Screen name="Artillery" component={Artillery} />
        <Stack.Screen name="NadbarListRoute" component={NadbarListRoute} />
        <Stack.Screen name="TargetDetails" component={TargetDetailsMain} />
        {/* Add more screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 