import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SimpleNavigationMenu from '../../../components/common/SimpleNavigationMenu';
import PopOptions from './PopOptions';
import Aim from './routes/Aim';
import EvenRatler from './routes/EvenRatler';
import FirePlan from './routes/FirePlan';
import FuelCells from './routes/FuelCells';
import PopCheckList from './routes/PopCheckList';
import PopEquiList from './routes/PopEquiList';
import PopErrors from './routes/PopErrors';
import SafeRanges from './routes/SafeRanges';
import SpectroCheckList from './routes/SpectroCheckList';
import SpectroEquiList from './routes/SpectroEquiList';
import TevelRoute from './routes/Tevel';
import TzagonPhotos from './routes/TzagonPhotos';
import SpectroOptions from './SpectroOptions';

const Stack = createNativeStackNavigator();

// Simple navigation configuration
const libraryItems = [
  { label: 'תאי דלק', route: 'FuelCells' },
  { label: 'פקלון כוונים', route: 'Aim' },
  { label: 'טווחי בטיחות', route: 'SafeRanges' },
  { label: 'צילומי צגון', route: 'TzagonPhotos' },
  { label: 'תוכנית אש', route: 'FirePlan' },
  { label: 'פופ', route: 'PopOptions' },
  { label: 'ספקטרו', route: 'SpectroOptions' },
  { label: 'איון ראטלר', route: 'EvenRatler' },
  { label: 'תבל', route: 'Tevel' },
];

function MainLibraryScreen({ navigation }: { navigation: any }) {
  return (
    <SimpleNavigationMenu
      title="ספריה"
      items={libraryItems}
      backgroundColor="#f7f4ef"
      buttonColor="#baaf9d"
      onNavigate={route => navigation.navigate(route)}
    />
  );
}

export default function LibraryNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LibraryMain" component={MainLibraryScreen} />
      <Stack.Screen name="FuelCells" component={FuelCells} />
      <Stack.Screen name="Aim" component={Aim} />
      <Stack.Screen name="SafeRanges" component={SafeRanges} />
      <Stack.Screen name="TzagonPhotos" component={TzagonPhotos} />
      <Stack.Screen name="PopOptions" component={PopOptions} />
      <Stack.Screen name="PopCheckList" component={PopCheckList} />
      <Stack.Screen name="PopEquiList" component={PopEquiList} />
      <Stack.Screen name="PopErrors" component={PopErrors} />
      <Stack.Screen name="SpectroOptions" component={SpectroOptions} />
      <Stack.Screen name="SpectroCheckList" component={SpectroCheckList} />
      <Stack.Screen name="SpectroEquiList" component={SpectroEquiList} />
      <Stack.Screen name="EvenRatler" component={EvenRatler} />
      <Stack.Screen name="Tevel" component={TevelRoute} />
      <Stack.Screen name="FirePlan" component={FirePlan} />
    </Stack.Navigator>
  );
} 