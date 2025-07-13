import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

// Import existing calculator components
import BackAzimuth from '../app/(tabs)/calculator/BackAzimuth';
import CoordinateConversion from '../app/(tabs)/calculator/CoordinateConversion';
import EfficiencyCalculation from '../app/(tabs)/calculator/EfficiencyCalculation';
import StainSizeCalculation from '../app/(tabs)/calculator/StainSizeCalculation';
import UnitConversion from '../app/(tabs)/calculator/UnitConversion';
import CalculatorMain from '../components/CalculatorMain';

const Stack = createNativeStackNavigator();

const CalculatorMainScreen = () => {
  return (
    <View style={styles.container}>
      <CalculatorMain />
    </View>
  );
};

const CalculatorScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="CalculatorMain">
      <Stack.Screen name="CalculatorMain" component={CalculatorMainScreen} />
      <Stack.Screen name="CoordinateConversion" component={CoordinateConversion} />
      <Stack.Screen name="BackAzimuth" component={BackAzimuth} />
      <Stack.Screen name="StainSizeCalculation" component={StainSizeCalculation} />
      <Stack.Screen name="EfficiencyCalculation" component={EfficiencyCalculation} />
      <Stack.Screen name="UnitConversion" component={UnitConversion} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f8f4',
  },
});

export default CalculatorScreen; 