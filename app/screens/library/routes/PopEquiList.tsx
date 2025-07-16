import React from 'react';
import GenericWebViewController from '../../webview/controllers/GenericWebViewController';
import { popEquiListHtml } from '../../webview/pages/popEquiListHtml';

const PopEquiList = () => (
  <GenericWebViewController
    header="פופ - רשמ״צ"
    storageKey="popEquiList"
    fallbackHtml={popEquiListHtml}
  />
);

export default PopEquiList; 