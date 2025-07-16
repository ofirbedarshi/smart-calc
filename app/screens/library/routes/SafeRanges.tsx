import React from 'react';
import GenericWebViewController from '../../webview/controllers/GenericWebViewController';
import { safeRangesHtml } from '../../webview/pages/safeRangesHtml';

const SafeRanges = () => {
  return (
    <GenericWebViewController
      header='טווחי בטיחות'
      storageKey="safeRangesContent"
      fallbackHtml={safeRangesHtml}
    />
  );
};

export default SafeRanges; 