import React from 'react';
import SimpleNavigationMenu from '../../../components/common/SimpleNavigationMenu';
import { useNavigation } from '../../../hooks/useNavigation';

const kravItems = [
  { label: 'קרב ברקת', route: 'KravBarkat' },
  { label: 'קרב סדורה ברד לייזר', route: 'KravSaduraLaser' },
  { label: 'קרב ברד לייזר lobl', route: 'KravLaserLobl' },
  { label: 'קרב line 6', route: 'KravLine6' },
  { label: 'קרב ברד לייזר loal', route: 'KravLaserLoal' },
];

const KravOptions = () => {
  const navigation = useNavigation();
  const handleNavigate = (route: string) => {
    navigation.navigate(route as any);
  };

  return (
    <SimpleNavigationMenu
      title="קרב"
      items={kravItems}
      backgroundColor="#f9f8f4"
      buttonColor="#cfddde"
      onNavigate={handleNavigate}
    />
  );
};

export default KravOptions; 