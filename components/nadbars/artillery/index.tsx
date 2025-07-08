import React from 'react';
import NadbarEditor from '../../common/NadbarEditor';
import { DEFAULT_ARTILLERY_TEMPLATE } from './artilleryTemplate';

const Artillery: React.FC = () => {
  return <NadbarEditor template={DEFAULT_ARTILLERY_TEMPLATE} />;
};

export default Artillery; 