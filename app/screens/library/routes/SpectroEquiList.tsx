import React from 'react';
import GenericWebViewController from '../../webview/controllers/GenericWebViewController';
import { spectroEquiListHtml } from '../../webview/pages/spectroEquiListHtml';

const SpectroEquiList = () => (
  <GenericWebViewController
    storageKey="spectroEquiList"
    fallbackHtml={spectroEquiListHtml}
  />
);

export default SpectroEquiList; 