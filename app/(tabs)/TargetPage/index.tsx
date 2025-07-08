import { useRouter } from 'expo-router';
import React from 'react';
import SimpleNavigationMenu from '../../../components/common/SimpleNavigationMenu';

const TargetPage = () => {
  const router = useRouter();

  const targetItems = [
    { label: 'מסקר', route: 'MaskarOptions' },
    { label: 'קרב', route: 'KravOptions' },
    { label: 'חמ"מ', route: 'Chemam' },
    { label: 'להט', route: 'Lehat' },
    { label: 'עוקץ פלדה', route: 'OketzPlada' },
  ];

  const handleNavigate = (route: string) => {
    router.push(`/TargetPage/${route}` as any);
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

export default TargetPage; 