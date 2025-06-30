import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Button, View } from 'react-native';
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
  },
  {
    navigationCtaLabel: 'טווחי בטיחות',
    storageKey: 'safeRangesContent',
    fallbackHtml: safeRangesHtml,
    routeName: 'safeRanges',
  },
  {
    navigationCtaLabel: 'צילומי צגון',
    storageKey: 'tzagonPhotos',
    fallbackHtml: tzagonPhotosHtml,
    routeName: 'tzagonPhotos',
    allowEdit: true,
  },
  {
    navigationCtaLabel: 'כוונים',
    storageKey: 'aim',
    fallbackHtml: aimHtml,
    routeName: 'aim',
  },
  {
    navigationCtaLabel: 'איון ראטלר',
    storageKey: 'evenRatler',
    fallbackHtml: evenRatlerHtml,
    routeName: 'evenRatler',
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {contentScreens.map(screen => (
        <Button
          key={screen.routeName}
          title={screen.navigationCtaLabel}
          onPress={() => navigation.navigate(screen.routeName)}
        />
      ))}
    </View>
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