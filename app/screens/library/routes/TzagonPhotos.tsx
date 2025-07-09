import React from 'react';
import GenericWebViewController from '../../webview/controllers/GenericWebViewController';
import { tzagonPhotosHtml } from '../../webview/pages/tzagonPhotosHtml';

const TzagonPhotos = () => {
  return (
    <GenericWebViewController
      storageKey="tzagonPhotos"
      fallbackHtml={tzagonPhotosHtml}
      editAccess="All"
    />
  );
};

export default TzagonPhotos; 