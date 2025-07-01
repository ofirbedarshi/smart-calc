import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../../components/common/Header';
import GenericWebViewController from '../webview/controllers/GenericWebViewController';
import { aimHtml } from '../webview/pages/aimHtml';
import { evenRatlerHtml } from '../webview/pages/evenRatlerHtml';
import { fuelCellHtml } from '../webview/pages/fuelCellHtml';
import { safeRangesHtml } from '../webview/pages/safeRangesHtml';
import { tzagonPhotosHtml } from '../webview/pages/tzagonPhotosHtml';

const Stack = createNativeStackNavigator();

const contentScreens = [
  {
    navigationCtaLabel: 'תאי דלק',
    storageKey: 'fuelCellContent',
    fallbackHtml: fuelCellHtml,
    routeName: 'FuelCells',
    color: '#FFB3BA', // Pastel Red
  },
  {
    navigationCtaLabel: 'טווחי בטיחות',
    storageKey: 'safeRangesContent',
    fallbackHtml: safeRangesHtml,
    routeName: 'safeRanges',
    color: '#BAFFC9', // Pastel Green
  },
  {
    navigationCtaLabel: 'צילומי צגון',
    storageKey: 'tzagonPhotos',
    fallbackHtml: tzagonPhotosHtml,
    routeName: 'tzagonPhotos',
    allowEdit: true,
    color: '#BAE1FF', // Pastel Blue
  },
  {
    navigationCtaLabel: 'כוונים',
    storageKey: 'aim',
    fallbackHtml: aimHtml,
    routeName: 'aim',
    color: '#FFFFBA', // Pastel Yellow
  },
  {
    navigationCtaLabel: 'איון ראטלר',
    storageKey: 'evenRatler',
    fallbackHtml: evenRatlerHtml,
    routeName: 'evenRatler',
    color: '#FFE4BA', // Pastel Orange
  },
  // Add more screens here as needed
];

type LibraryStackParamList = {
  LibraryMain: undefined;
} & {
  [key: string]: undefined;
};

function MainLibraryScreen({ navigation }: { navigation: NativeStackNavigationProp<LibraryStackParamList, 'LibraryMain'> }) {
  return (
    <ScrollView style={styles.container}>
      <Header title="ספרייה" />
      <View style={styles.buttonContainer}>
        {contentScreens.map((screen) => (
          <TouchableOpacity
            key={screen.routeName}
            style={[styles.button, { backgroundColor: screen.color }]}
            onPress={() => navigation.navigate(screen.routeName)}
          >
            <Text style={styles.buttonText}>{screen.navigationCtaLabel}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

export default function LibraryNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LibraryMain" component={MainLibraryScreen} options={{ headerShown: false }} />
      {contentScreens.map(screen => (
        <Stack.Screen
          key={screen.routeName}
          name={screen.routeName}
          children={() => (
            <GenericWebViewController
              storageKey={screen.storageKey}
              fallbackHtml={screen.fallbackHtml}
              allowEdit={screen.allowEdit}
            />
          )}
          options={{ headerShown: false }}
        />
      ))}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    gap: 16,
    marginTop: 16,
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