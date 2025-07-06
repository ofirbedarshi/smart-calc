import React from 'react';
import GenericWebViewController from '../../webview/controllers/GenericWebViewController';
import { popEquiListHtml } from '../../webview/pages/popEquiListHtml';

const PopEquiList = () => (
  <GenericWebViewController
    storageKey="popEquiList"
    fallbackHtml={popEquiListHtml}
  />
);

export default PopEquiList; 