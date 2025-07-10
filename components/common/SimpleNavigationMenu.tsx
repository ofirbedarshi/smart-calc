import React from 'react';
import { StyleSheet, View } from 'react-native';
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
  // Group items into rows of two
  const rows = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }
  return (
    <View style={[styles.container, { backgroundColor }]}> 
      <Header title={title} />
      {wideButton && (
        <WideButton 
          title={wideButton.label} 
          onPress={() => onNavigate(wideButton.route)}
          backgroundColor={wideButton.backgroundColor}
        />
      )}
      <View style={styles.flexGrid}>
        {rows.map((row, rowIndex) => (
          <View style={styles.row} key={rowIndex}>
            {row.map((item) => (
              <View style={styles.buttonWrapper} key={item.route}>
                <TargetNavButton
                  screen={{ navigationCtaLabel: item.label, routeName: item.route }}
                  onPress={() => onNavigate(item.route)}
                  backgroundColor={buttonColor}
                />
              </View>
            ))}
            {/* Filler for odd items */}
            {row.length < 2 && <View style={[styles.buttonWrapper, { opacity: 0 }]} />}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  flexGrid: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  buttonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    minWidth: 150,
  },
});

export default SimpleNavigationMenu; 