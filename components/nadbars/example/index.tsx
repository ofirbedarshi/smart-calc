import React from 'react';
import NadbarEditor from '../../common/NadbarEditor';
import { EXAMPLE_TEMPLATE } from './exampleTemplate';

const ExampleNadbar: React.FC = () => {
  return <NadbarEditor template={EXAMPLE_TEMPLATE} />;
};

export default ExampleNadbar; 