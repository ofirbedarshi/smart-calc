import React from 'react';
import GenericWebViewController from '../../webview/controllers/GenericWebViewController';
import { popErrorsHtml } from '../../webview/pages/popErrorsHtml';

const PopErrors = () => (
  <GenericWebViewController
    header="פופ - תקלות"
    storageKey="popErrors"
    fallbackHtml={popErrorsHtml}
  />
);

export default PopErrors; 