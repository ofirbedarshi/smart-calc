import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const buttons = [
  { text: 'המרת נ.צ', route: '/calculator/CoordinateConversion', color: '#939c80' },
  { text: 'חיתוך לאחור', route: '/calculator/BackAzimuth', color: '#b7bd9e' },
  { text: 'חישוב גודל כתם', route: '/calculator/StainSizeCalculation', color: '#b3b8bd' },
  { text: 'חישוב יעילות', route: '/calculator/EfficiencyCalculation', color: '#baaf9d' },
  { text: 'המרת יחידות', route: '/calculator/UnitConversion', color: '#d8d1c3' },
];

export const CalculatorNavigation: React.FC = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
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
            <Text style={styles.buttonText}>{button.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  logo: {
    width: '100%',
    height: 100,
    marginBottom: 24,
  },
  buttonContainer: {
    gap: 16,
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
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
}); 