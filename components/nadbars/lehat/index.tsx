import React from 'react';
import NadbarEditor from '../../common/NadbarEditor';
import { DEFAULT_LEHAT_TEMPLATE } from './lehatTemplate';

const Lehat: React.FC = () => {
  return <NadbarEditor template={DEFAULT_LEHAT_TEMPLATE} />;
};

export default Lehat; 