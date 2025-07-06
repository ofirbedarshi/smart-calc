import React from 'react';
import GenericWebViewController from '../../webview/controllers/GenericWebViewController';
import { evenRatlerHtml } from '../../webview/pages/evenRatlerHtml';

const EvenRatler = () => {
  return (
    <GenericWebViewController
      storageKey="evenRatler"
      fallbackHtml={evenRatlerHtml}
    />
  );
};

export default EvenRatler; 