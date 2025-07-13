import React from 'react';
import TargetsListSelector from '../app/screens/targetList/TargetsListSelector';
import { useNavigation } from '../hooks/useNavigation';

const TargetsListMain = () => {
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
};

export default TargetsListMain; 