import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Button, View } from 'react-native';
import GenericWebViewController from '../webview/controllers/GenericWebViewController';
import { fuelCellHtml } from '../webview/pages/fuelCellHtml';

const Stack = createNativeStackNavigator();

type LibraryStackParamList = {
  LibraryMain: undefined;
  FuelCells: undefined;
};

function MainLibraryScreen({ navigation }: { navigation: NativeStackNavigationProp<LibraryStackParamList, 'LibraryMain'> }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="תאי דלק"
        onPress={() => navigation.navigate('FuelCells')}
      />
    </View>
  );
}

export default function LibraryNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LibraryMain" component={MainLibraryScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="FuelCells"
        children={() => (
          <GenericWebViewController
            storageKey="fuelCellContent"
            fallbackHtml={fuelCellHtml}
          />
        )}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
} 