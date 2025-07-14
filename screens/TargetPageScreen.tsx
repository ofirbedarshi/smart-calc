import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SafeAreaScreen from '../components/common/SafeAreaScreen';

// Import existing TargetPage components
import Artillery from '../app/(tabs)/TargetPage/Artillery';
import Chemam from '../app/(tabs)/TargetPage/Chemam';
import KravBarkat from '../app/(tabs)/TargetPage/KravBarkat';
import KravLaserLoal from '../app/(tabs)/TargetPage/KravLaserLoal';
import KravLaserLobl from '../app/(tabs)/TargetPage/KravLaserLobl';
import KravLine6 from '../app/(tabs)/TargetPage/KravLine6';
import KravOptions from '../app/(tabs)/TargetPage/KravOptions';
import KravSaduraLaser from '../app/(tabs)/TargetPage/KravSaduraLaser';
import Lehat from '../app/(tabs)/TargetPage/Lehat';
import Maskar from '../app/(tabs)/TargetPage/Maskar';
import MaskarLoal from '../app/(tabs)/TargetPage/MaskarLoal';
import MaskarOptions from '../app/(tabs)/TargetPage/MaskarOptions';
import Mortars from '../app/(tabs)/TargetPage/Mortars';
import NadbarListRoute from '../app/(tabs)/TargetPage/NadbarListRoute';
import OketzPlada from '../app/(tabs)/TargetPage/OketzPlada';
import TargetPageMain from '../components/TargetPageMain';

const Stack = createNativeStackNavigator();

const TargetPageScreen = () => {
  return (
    <SafeAreaScreen>
      <Stack.Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName="TargetPageMain"
      >
        <Stack.Screen name="TargetPageMain" component={TargetPageMain} />
        <Stack.Screen name="MaskarOptions" component={MaskarOptions} />
        <Stack.Screen name="KravOptions" component={KravOptions} />
        <Stack.Screen name="Chemam" component={Chemam} />
        <Stack.Screen name="Lehat" component={Lehat} />
        <Stack.Screen name="OketzPlada" component={OketzPlada} />
        <Stack.Screen name="Artillery" component={Artillery} />
        <Stack.Screen name="Mortars" component={Mortars} />
        <Stack.Screen name="Maskar" component={Maskar} />
        <Stack.Screen name="MaskarLoal" component={MaskarLoal} />
        <Stack.Screen name="KravLaserLoal" component={KravLaserLoal} />
        <Stack.Screen name="KravLine6" component={KravLine6} />
        <Stack.Screen name="KravLaserLobl" component={KravLaserLobl} />
        <Stack.Screen name="KravSaduraLaser" component={KravSaduraLaser} />
        <Stack.Screen name="KravBarkat" component={KravBarkat} />
        <Stack.Screen name="NadbarListRoute" component={NadbarListRoute} />
      </Stack.Navigator>
    </SafeAreaScreen>
  );
};

export default TargetPageScreen; 