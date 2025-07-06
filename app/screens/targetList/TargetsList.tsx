import { useRouter } from 'expo-router';
import React from 'react';
import TargetsListSelector from './TargetsListSelector';

export default function TargetsList() {
  const router = useRouter();

  const handleNavigate = (target: any) => {
    router.push({
      pathname: '/TargetsList/TargetDetails',
      params: { target: JSON.stringify(target) },
    });
  };

  const handleAddPress = () => {
    router.push({
      pathname: '/TargetsList/TargetDetails',
      params: { target: JSON.stringify({}) },
    });
  };

  return (
    <TargetsListSelector
      onTargetSelect={handleNavigate}
      showAddButton={true}
      onAddPress={handleAddPress}
    />
  );
} 