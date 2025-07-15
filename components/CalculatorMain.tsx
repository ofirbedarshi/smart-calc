import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '../hooks/useNavigation';
import { SelfLocation } from './SelfLocation';

const buttons = [
  { text: 'המרת נ.צ', route: 'CoordinateConversion', color: '#939c80' },
  { text: 'חיתוך לאחור', route: 'BackAzimuth', color: '#b7bd9e' },
  { text: 'חישוב גודל כתם', route: 'StainSizeCalculation', color: '#b3b8bd' },
  { text: 'חישוב יעילות', route: 'EfficiencyCalculation', color: '#baaf9d' },
  { text: 'המרת יחידות', route: 'UnitConversion', color: '#d8d1c3' },
];

const iconSources = [
  require('../assets/icons/nav1icon.png'),
  require('../assets/icons/nav2icon.png'),
  require('../assets/icons/nav3icon.png'),
  require('../assets/icons/nav4icon.png'),
  require('../assets/icons/nav5icon.png'),
];

const CalculatorMain = () => {
  const navigation = useNavigation();

  const handleNavigate = (route: string) => {
    navigation.navigate(route as any);
  };

  return (
    <View style={styles.container}>
      <SelfLocation />
      <Image
        source={require('../assets/images/maglanSymbol.jpeg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.buttonContainer}>
        {buttons.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, { backgroundColor: button.color }]}
            onPress={() => handleNavigate(button.route)}
          >
            <Image source={iconSources[index]} style={styles.buttonIcon} resizeMode="contain" />
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>{button.text}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  logo: {
    width: '100%',
    height: 100,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    marginTop: -32, // Remove only the first gap before the first button
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    position: 'relative',
  },
  buttonContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    position: 'absolute',
    right: 16,
    width: 56,
    height: 56,
    zIndex: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CalculatorMain; 