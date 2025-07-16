import React from 'react';
import GenericWebViewController from '../../../app/screens/webview/controllers/GenericWebViewController';
import { DEFAULT_ARTILLERY_TEMPLATE } from './artilleryTemplate';

const Artillery: React.FC = () => {
  const htmlElment = DEFAULT_ARTILLERY_TEMPLATE.elements[0]
  const html = htmlElment.data as string;
  return  <GenericWebViewController
  header="ארטילריה"
  storageKey={`html_${DEFAULT_ARTILLERY_TEMPLATE.id}`}
  fallbackHtml={html}
  allowEdit={false}
/>;
};

export default Artillery; 