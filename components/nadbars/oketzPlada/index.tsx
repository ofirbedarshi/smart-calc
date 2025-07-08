import React from 'react';
import NadbarEditor from '../../common/NadbarEditor';
import { DEFAULT_OKETZ_PLADA_TEMPLATE } from './oketzPladaTemplate';

const OketzPlada: React.FC = () => {
  return <NadbarEditor template={DEFAULT_OKETZ_PLADA_TEMPLATE} />;
};

export default OketzPlada; 