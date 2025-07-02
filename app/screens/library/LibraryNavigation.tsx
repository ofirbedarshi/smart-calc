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
    navigationCtaLabel: 'פקלון כוונים',
    storageKey: 'aim',
    fallbackHtml: aimHtml,
    routeName: 'aim',
    color: '#FFFFBA', // Pastel Yellow
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
  // Arrange buttons in two columns
  const rows = [];
  for (let i = 0; i < contentScreens.length; i += 2) {
    rows.push(contentScreens.slice(i, i + 2));
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <Header title="ספרייה" />
      <View style={styles.gridContainer}>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((screen) => (
              <TouchableOpacity
                key={screen.routeName}
                style={styles.gridButton}
                onPress={() => navigation.navigate(screen.routeName)}
                activeOpacity={0.85}
              >
                <Text style={styles.buttonText}>{screen.navigationCtaLabel}</Text>
              </TouchableOpacity>
            ))}
            {/* If odd number of buttons, fill the last cell */}
            {row.length === 1 && <View style={styles.gridButton} />}
          </View>
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
    backgroundColor: '#f7f4ef', // match the image background
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  gridButton: {
    backgroundColor: '#baaf9d',
    minWidth: 150,
    minHeight: 90,
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#444',
    textAlign: 'center',
  },
}); 