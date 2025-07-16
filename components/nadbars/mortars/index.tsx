import React from 'react';
import GenericWebViewController from '../../../app/screens/webview/controllers/GenericWebViewController';
import { DEFAULT_MORTARS_TEMPLATE } from './mortarsTemplate';

const Artillery: React.FC = () => {
  const htmlElment = DEFAULT_MORTARS_TEMPLATE.elements[0]
  const html = htmlElment.data as string;
  return  <GenericWebViewController
  header="מרגמות"
  storageKey={`html_${DEFAULT_MORTARS_TEMPLATE.id}`}
  fallbackHtml={html}
  allowEdit={false}
/>;
};

export default Artillery; 