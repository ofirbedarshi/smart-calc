import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../../components/common/Header';
import SubMenuNavigation from '../../../components/common/SubMenuNavigation';
import Tevel from '../../../components/common/Tevel';
import GenericWebViewController from '../webview/controllers/GenericWebViewController';
import { aimHtml } from '../webview/pages/aimHtml';
import { checkListHtml } from '../webview/pages/checkListHtml';
import { evenRatlerHtml } from '../webview/pages/evenRatlerHtml';
import { fuelCellHtml } from '../webview/pages/fuelCellHtml';
import { popEquiListHtml } from '../webview/pages/popEquiListHtml';
import { popErrorsHtml } from '../webview/pages/popErrorsHtml';
import { safeRangesHtml } from '../webview/pages/safeRangesHtml';
import { spectroCheckListHtml } from '../webview/pages/spectroCheckListHtml';
import { spectroEquiListHtml } from '../webview/pages/spectroEquiListHtml';
import { tzagonPhotosHtml } from '../webview/pages/tzagonPhotosHtml';

const Stack = createNativeStackNavigator();

const contentScreens = [
  {
    navigationCtaLabel: 'תאי דלק',
    storageKey: 'fuelCellContent',
    fallbackHtml: fuelCellHtml,
    routeName: 'FuelCells',
    color: '#FFB3BA',
  },
  {
    navigationCtaLabel: 'פקלון כוונים',
    storageKey: 'aim',
    fallbackHtml: aimHtml,
    routeName: 'aim',
    color: '#FFFFBA', 
  },
 
  {
    navigationCtaLabel: 'טווחי בטיחות',
    storageKey: 'safeRangesContent',
    fallbackHtml: safeRangesHtml,
    routeName: 'safeRanges',
    color: '#BAFFC9', 
  },
  {
    navigationCtaLabel: 'צילומי צגון',
    storageKey: 'tzagonPhotos',
    fallbackHtml: tzagonPhotosHtml,
    routeName: 'tzagonPhotos',
    allowEdit: true,
    color: '#BAE1FF', 
  },
   {
    navigationCtaLabel: 'פופ',
    color: '#BAE1FF',
    routeName: 'PopOptions',
    subNavigations: [
      {
        navigationCtaLabel: 'צק ליסט',
        storageKey: 'checkList',
        fallbackHtml: checkListHtml,
        routeName: 'PopCheckList',
        color: '#BAE1FF',
      },
      {
        navigationCtaLabel: 'רשמצ',
        storageKey: 'popEquiList',
        fallbackHtml: popEquiListHtml,
        routeName: 'PopEquiList',
        color: '#BAE1FF',
      },
      {
        navigationCtaLabel: 'תקלות',
        storageKey: 'popErrors',
        fallbackHtml: popErrorsHtml,
        routeName: 'PopErrors',
        color: '#BAE1FF',
      },
    ],
  },
  {
    navigationCtaLabel: 'ספקטרו',
    color: '#baaf9d',
    routeName: 'SpectroOptions',
    subNavigations: [
      {
        navigationCtaLabel: "צ'ק ליסט",
        storageKey: 'spectroCheckList',
        fallbackHtml: spectroCheckListHtml,
        routeName: 'SpectroCheckList',
        color: '#baaf9d',
      },
      {
        navigationCtaLabel: 'רשמ"צ',
        storageKey: 'spectroEquiList',
        fallbackHtml: spectroEquiListHtml,
        routeName: 'SpectroEquiList',
        color: '#baaf9d',
      },
    ],
  },
  {
    navigationCtaLabel: 'איון ראטלר',
    storageKey: 'evenRatler',
    fallbackHtml: evenRatlerHtml,
    routeName: 'evenRatler',
    color: '#FFE4BA',
  },
  {
    navigationCtaLabel: 'תבל',
    routeName: 'Tevel',
    color: '#baaf9d',
  },
  // Add more screens here as needed
];

type LibraryStackParamList = {
  LibraryMain: undefined;
} & {
  [key: string]: undefined;
};

// LibraryNavButton: UI for a single navigation button
const LibraryNavButton: React.FC<{ screen: any; onPress: () => void }> = ({ screen, onPress }) => (
  <TouchableOpacity
    key={screen.routeName}
    style={[styles.gridButton, screen.color ? { backgroundColor: screen.color } : null]}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <Text style={styles.buttonText}>{screen.navigationCtaLabel}</Text>
  </TouchableOpacity>
);

// Set all button colors to #baaf9d
const normalizedScreens = contentScreens.map(screen => ({ ...screen, color: '#baaf9d' }));

function MainLibraryScreen({ navigation }: { navigation: NativeStackNavigationProp<LibraryStackParamList, 'LibraryMain'> }) {
  return (
    <ScrollView style={styles.container}>
      <Header title="ספרייה" />
      <View style={styles.flexGrid}>
        {normalizedScreens.map((screen) => (
          <LibraryNavButton
            key={screen.routeName}
            screen={screen}
            onPress={() => navigation.navigate(screen.routeName)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

export default function LibraryNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LibraryMain" component={MainLibraryScreen} options={{ headerShown: false }} />
      {contentScreens.filter(screen => screen.subNavigations).map(screen => (
        <Stack.Screen
          key={screen.routeName}
          name={screen.routeName}
          children={({ navigation }) => (
            <SubMenuNavigation
              title={screen.navigationCtaLabel}
              options={screen.subNavigations!}
              navigation={navigation}
            />
          )}
          options={{ headerShown: false }}
        />
      ))}
      {contentScreens.flatMap(screen =>
        screen.subNavigations
          ? screen.subNavigations.map(sub => (
              <Stack.Screen
                key={sub.routeName}
                name={sub.routeName}
                children={() => (
                  <GenericWebViewController
                    storageKey={sub.storageKey}
                    fallbackHtml={sub.fallbackHtml}
                  />
                )}
                options={{ headerShown: false }}
              />
            ))
          : screen.routeName === 'Tevel'
            ? (
                <Stack.Screen
                  key={screen.routeName}
                  name={screen.routeName}
                  component={Tevel}
                  options={{ headerShown: false }}
                />
              )
            : screen.routeName && screen.fallbackHtml && (
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
              )
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f4ef',
  },
  flexGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 16,
    marginBottom: 16,
  },
  gridButton: {
    backgroundColor: '#baaf9d',
    minHeight: 90,
    flexBasis: '48%',
    maxWidth: 150,
    margin: 7,
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