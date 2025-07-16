import React from 'react';
import GenericWebViewController from '../../webview/controllers/GenericWebViewController';
import { checkListHtml } from '../../webview/pages/checkListHtml';

const PopCheckList = () => (
  <GenericWebViewController
    header='פופ - סד״פ הרכבה'
    storageKey="checkList"
    fallbackHtml={checkListHtml}
  />
);

export default PopCheckList; 