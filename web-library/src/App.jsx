import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Playground from './playground/Playground';
import ContentEditorScreen from './screens/ContentEditorScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Playground />} />
        <Route path="/contentEditor" element={<ContentEditorScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
