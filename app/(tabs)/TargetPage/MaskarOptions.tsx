import { useRouter } from 'expo-router';
import React from 'react';
import SimpleNavigationMenu from '../../../components/common/SimpleNavigationMenu';

const MaskarOptions = () => {
  const router = useRouter();

  const maskarItems = [
    { label: 'מסקר', route: 'Maskar' },
    { label: 'מסקר loal', route: 'MaskarLoal' },
  ];

  const handleNavigate = (route: string) => {
    router.push(`/TargetPage/${route}` as any);
  };

  return (
    <SimpleNavigationMenu
      title="מסקר"
      items={maskarItems}
      backgroundColor="#f9f8f4"
      buttonColor="#baaf9d"
      onNavigate={handleNavigate}
    />
  );
};

export default MaskarOptions; 