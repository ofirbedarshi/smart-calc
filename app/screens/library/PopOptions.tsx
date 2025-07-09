import { useNavigation } from '@react-navigation/native';
import React from 'react';
import SimpleNavigationMenu from '../../../components/common/SimpleNavigationMenu';

const popItems = [
  { label: 'סד״פ הרכבה', route: 'PopCheckList' },
  { label: 'רשמצ', route: 'PopEquiList' },
  { label: 'תקלות', route: 'PopErrors' },
];

export default function PopOptions() {
  const navigation = useNavigation();
  return (
    <SimpleNavigationMenu
      title="פופ"
      items={popItems}
      backgroundColor="#f9f8f4"
      buttonColor="#baaf9d"
      onNavigate={route => (navigation as any).navigate(route)}
    />
  );
} 