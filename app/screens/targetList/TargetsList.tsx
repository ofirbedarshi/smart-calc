import React from 'react';
import { useNavigation } from '../../../hooks/useNavigation';
import TargetsListSelector from './TargetsListSelector';

export default function TargetsList() {
  const navigation = useNavigation();

  const handleNavigate = (target: any) => {
    navigation.navigate('TargetDetails', { targetId: JSON.stringify(target) });
  };

  const handleAddPress = () => {
    navigation.navigate('TargetDetails', { targetId: JSON.stringify({}) });
  };

  return (
    <TargetsListSelector
      onTargetSelect={handleNavigate}
      showAddButton={true}
      onAddPress={handleAddPress}
    />
  );
} 