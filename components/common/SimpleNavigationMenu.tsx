import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from './Header';
import TargetNavButton from './TargetNavButton';
import WideButton from './WideButton';

interface NavigationItem {
  label: string;
  route: string;
}

interface SimpleNavigationMenuProps {
  title: string;
  items: NavigationItem[];
  backgroundColor?: string;
  buttonColor?: string;
  wideButton?: {
    label: string;
    route: string;
    backgroundColor?: string;
  };
  onNavigate: (route: string) => void;
}

const SimpleNavigationMenu: React.FC<SimpleNavigationMenuProps> = ({
  title,
  items,
  backgroundColor = '#f9f8f4',
  buttonColor = '#baaf9d',
  wideButton,
  onNavigate,
}) => {
  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <Header title={title} />
      {wideButton && (
        <WideButton 
          title={wideButton.label} 
          onPress={() => onNavigate(wideButton.route)}
          backgroundColor={wideButton.backgroundColor}
        />
      )}
      <View style={styles.flexGrid}>
        {items.map((item) => (
          <TargetNavButton
            key={item.route}
            screen={{ navigationCtaLabel: item.label, routeName: item.route }}
            onPress={() => onNavigate(item.route)}
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

export default SimpleNavigationMenu; 