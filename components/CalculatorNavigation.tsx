import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const buttons = [
  { text: 'המרת נ.צ', route: '/calculator/CoordinateConversion', color: '#939c80' },
  { text: 'חיתוך לאחור', route: '/calculator/BackAzimuth', color: '#b7bd9e' },
  { text: 'חישוב גודל כתם', route: '/calculator/StainSizeCalculation', color: '#b3b8bd' },
  { text: 'חישוב יעילות', route: '/calculator/EfficiencyCalculation', color: '#baaf9d' },
  { text: 'המרת יחידות', route: '/calculator/UnitConversion', color: '#d8d1c3' },
];

const iconSources = [
  require('../assets/icons/nav1icon.png'),
  require('../assets/icons/nav2icon.png'),
  require('../assets/icons/nav3icon.png'),
  require('../assets/icons/nav4icon.png'),
  require('../assets/icons/nav5icon.png'),
];

export const CalculatorNavigation: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
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
            onPress={() => router.push(button.route)}
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
    marginBottom: 24,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
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
    position: 'relative', // Make button relative for absolute icon
  },
  buttonContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row', // Only for text centering
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