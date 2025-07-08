import React from 'react';
import NadbarEditor from '../../common/NadbarEditor';
import { DEFAULT_MORTARS_TEMPLATE } from './mortarsTemplate';

const Mortars: React.FC = () => {
  return <NadbarEditor template={DEFAULT_MORTARS_TEMPLATE} />;
};

export default Mortars; 