import React from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import ContentEditorScreen from './screens/ContentEditorScreen';
import TevelPdfViewer from './screens/TevelPdfViewer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ContentEditorScreen />} />
        <Route path="/tevel-pdf" element={<TevelPdfViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
