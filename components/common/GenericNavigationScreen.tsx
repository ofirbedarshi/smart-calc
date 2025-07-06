import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from './Header';
import TargetNavButton from './TargetNavButton';
import WideButton from './WideButton';

interface NavigationScreen {
  navigationCtaLabel: string;
  routeName: string;
  color?: string;
  subNavigations?: NavigationScreen[];
  storageKey?: string;
  fallbackHtml?: string;
  allowEdit?: boolean;
}

interface GenericNavigationScreenProps {
  title: string;
  screens: NavigationScreen[];
  backgroundColor?: string;
  buttonColor?: string;
  wideButton?: {
    title: string;
    onPress: () => void;
    backgroundColor?: string;
  };
  onScreenPress: (screen: NavigationScreen) => void;
}

const GenericNavigationScreen: React.FC<GenericNavigationScreenProps> = ({
  title,
  screens,
  backgroundColor = '#f9f8f4',
  buttonColor = '#baaf9d',
  wideButton,
  onScreenPress,
}) => {
  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <Header title={title} />
      {wideButton && (
        <WideButton 
          title={wideButton.title} 
          onPress={wideButton.onPress}
          backgroundColor={wideButton.backgroundColor}
        />
      )}
      <View style={styles.flexGrid}>
        {screens.map((screen) => (
          <TargetNavButton
            key={screen.routeName}
            screen={screen}
            onPress={() => onScreenPress(screen)}
            backgroundColor={buttonColor}
          />
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
  flexGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 16,
    marginBottom: 16,
    justifyContent: 'center'
  },
});

export default GenericNavigationScreen; 