import React from 'react';
import GenericWebViewController from '../../webview/controllers/GenericWebViewController';
import { aimHtml } from '../../webview/pages/aimHtml';

const Aim = () => {
  return (
    <GenericWebViewController
      storageKey="aim"
      fallbackHtml={aimHtml}
    />
  );
};

export default Aim; 