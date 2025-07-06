import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../../../components/common/Header';
import TargetNavButton from '../../../components/common/TargetNavButton';
import WideButton from '../../../components/common/WideButton';

const TargetPage = () => {
  const router = useRouter();

  const targetScreens = [
    {
      navigationCtaLabel: 'מסקר',
      routeName: 'Maskar',
      color: '#baaf9d',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Header title="דף מטרה" />
      <WideButton 
        title="בנק נדברים" 
        onPress={() => router.push(`/TargetPage/NadbarListRoute` as any)}
        backgroundColor="#bdc6c9"
      />
      <View style={styles.flexGrid}>
        {targetScreens.map((screen) => (
          <TargetNavButton
            key={screen.routeName}
            screen={screen}
            onPress={() => router.push(`/TargetPage/${screen.routeName}` as any)}
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

export default TargetPage; 