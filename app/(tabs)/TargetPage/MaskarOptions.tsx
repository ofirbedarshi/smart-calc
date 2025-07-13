import React from 'react';
import SimpleNavigationMenu from '../../../components/common/SimpleNavigationMenu';
import { useNavigation } from '../../../hooks/useNavigation';

const MaskarOptions = () => {
  const navigation = useNavigation();
  const maskarItems = [
    { label: 'מסקר', route: 'Maskar' },
    { label: 'מסקר loal', route: 'MaskarLoal' },
  ];

  const handleNavigate = (route: string) => {
    navigation.navigate(route as any);
  };

  return (
    <SimpleNavigationMenu
      title="מסקר"
      items={maskarItems}
      backgroundColor="#f9f8f4"
      buttonColor="#cfddde"
      onNavigate={handleNavigate}
    />
  );
};

export default MaskarOptions; 