import React from 'react';
import GenericWebViewController from '../../webview/controllers/GenericWebViewController';
import { spectroCheckListHtml } from '../../webview/pages/spectroCheckListHtml';

const SpectroCheckList = () => (
  <GenericWebViewController
    storageKey="spectroCheckList"
    fallbackHtml={spectroCheckListHtml}
  />
);

export default SpectroCheckList; 