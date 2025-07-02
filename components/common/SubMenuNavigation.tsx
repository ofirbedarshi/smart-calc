import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from './Header';

interface SubMenuOption {
  navigationCtaLabel: string;
  routeName: string;
  color?: string;
}

interface SubMenuNavigationProps {
  title: string;
  options: SubMenuOption[];
  navigation: any; // react-navigation navigation prop
}

const SubMenuNavigation: React.FC<SubMenuNavigationProps> = ({ title, options, navigation }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <Header title={title} />
      <View style={styles.flexGrid}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.routeName}
            style={[styles.gridButton, { backgroundColor: '#baaf9d' }]}
            onPress={() => navigation.navigate(option.routeName)}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>{option.navigationCtaLabel}</Text>
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
    backgroundColor: '#f7f4ef',
  },
  flexGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  gridButton: {
    backgroundColor: '#baaf9d',
    minHeight: 90,
    flexBasis: '48%',
    margin: 8,
    minWidth: 300,
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

export default SubMenuNavigation; 