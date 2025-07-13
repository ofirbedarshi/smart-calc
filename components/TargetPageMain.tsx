import React from 'react';
import { useNavigation } from '../hooks/useNavigation';
import SimpleNavigationMenu from './common/SimpleNavigationMenu';

const TargetPageMain = () => {
  const navigation = useNavigation();

  const targetItems = [
    { label: 'מסקר', route: 'MaskarOptions' },
    { label: 'קרב', route: 'KravOptions' },
    { label: 'חמ"מ', route: 'Chemam' },
    { label: 'להט', route: 'Lehat' },
    { label: 'עוקץ פלדה', route: 'OketzPlada' },
    { label: 'ארטילריה', route: 'Artillery' },
    { label: 'מרגמות', route: 'Mortars' },
  ];

  const handleNavigate = (route: string) => {
    navigation.navigate(route as any);
  };

  return (
    <SimpleNavigationMenu
      title="דף מטרה"
      items={targetItems}
      backgroundColor="#f9f8f4"
      buttonColor="#cfddde"
      wideButton={{
        label: "בנק נדברים",
        route: "NadbarListRoute",
        backgroundColor: "#bdc6c9"
      }}
      onNavigate={handleNavigate}
    />
  );
};

export default TargetPageMain; 