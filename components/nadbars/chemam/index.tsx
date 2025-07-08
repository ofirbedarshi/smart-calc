import React from 'react';
import NadbarEditor from '../../common/NadbarEditor';
import { DEFAULT_CHEMAM_TEMPLATE } from './chemamTemplate';

const Chemam: React.FC = () => {
  return <NadbarEditor template={DEFAULT_CHEMAM_TEMPLATE} />;
};

export default Chemam; 