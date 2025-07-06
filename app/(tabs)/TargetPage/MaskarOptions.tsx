import React from 'react';
import TargetSubMenuNavigation from '../../../components/common/TargetSubMenuNavigation';

const MaskarOptions = () => {
  const maskarOptions = [
    {
      navigationCtaLabel: 'מסקר',
      routeName: 'Maskar',
      color: '#baaf9d',
    },
    {
      navigationCtaLabel: 'מסקר loal',
      routeName: 'MaskarLoal',
      color: '#baaf9d',
    },
  ];

  return (
    <TargetSubMenuNavigation
      title="מסקר"
      options={maskarOptions}
    />
  );
};

export default MaskarOptions; 