import React from 'react';
import GenericWebViewController from '../../webview/controllers/GenericWebViewController';
import { spectroCheckListHtml } from '../../webview/pages/spectroCheckListHtml';

const SpectroCheckList = () => (
  <GenericWebViewController
    header="ספקטרו - סד״פים"
    storageKey="spectroCheckList"
    fallbackHtml={spectroCheckListHtml}
  />
);

export default SpectroCheckList; 