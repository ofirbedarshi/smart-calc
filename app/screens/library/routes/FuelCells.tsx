import React from 'react';
import GenericWebViewController from '../../webview/controllers/GenericWebViewController';
import { fuelCellHtml } from '../../webview/pages/fuelCellHtml';

const FuelCells = () => {
  return (
    <GenericWebViewController
      storageKey="fuelCellContent"
      fallbackHtml={fuelCellHtml}
    />
  );
};

export default FuelCells; 