import { useNavigation } from '@react-navigation/native';
import React from 'react';
import SimpleNavigationMenu from '../../../components/common/SimpleNavigationMenu';

const spectroItems = [
  { label: "צ'ק ליסט", route: 'SpectroCheckList' },
  { label: 'רשמ"צ', route: 'SpectroEquiList' },
];

export default function SpectroOptions() {
  const navigation = useNavigation();
  return (
    <SimpleNavigationMenu
      title="ספקטרו"
      items={spectroItems}
      backgroundColor="#f9f8f4"
      buttonColor="#baaf9d"
      onNavigate={route => (navigation as any).navigate(route)}
    />
  );
} 