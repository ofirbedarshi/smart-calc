import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Playground from './playground/Playground';
import FuelCellsScreen from './screens/FuelCellsScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Playground />} />
        <Route path="/fuel-cells" element={<FuelCellsScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
