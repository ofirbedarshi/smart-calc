import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from './Header';
import TargetNavButton from './TargetNavButton';

interface SubMenuOption {
  navigationCtaLabel: string;
  routeName: string;
  color?: string;
}

interface TargetSubMenuNavigationProps {
  title: string;
  options: SubMenuOption[];
}

const TargetSubMenuNavigation: React.FC<TargetSubMenuNavigationProps> = ({ title, options }) => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Header title={title} />
      <View style={styles.flexGrid}>
        {options.map((option) => (
          <TargetNavButton
            key={option.routeName}
            screen={option}
            onPress={() => router.push(`/TargetPage/${option.routeName}` as any)}
            backgroundColor="#baaf9d"
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
    backgroundColor: '#f9f8f4',
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

export default TargetSubMenuNavigation; 