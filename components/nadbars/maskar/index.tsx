import React from 'react';
import NadbarEditor from '../../common/NadbarEditor';
import { DEFAULT_MASKAR_TEMPLATE } from './maskarTemplate';

const Maskar: React.FC = () => {
  return <NadbarEditor template={DEFAULT_MASKAR_TEMPLATE} />;
};

export default Maskar; 