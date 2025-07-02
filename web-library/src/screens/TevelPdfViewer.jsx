import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import React from 'react';

const pdfUrl = 'pdf/tevel.pdf';

const TevelPdfViewer = () => (
  <div style={{ width: '100vw', height: '100vh', background: '#fff', direction: 'rtl' }}>
    <div style={{ height: '100vh' }}>
      <Worker workerUrl={'pdfjs/pdf.worker.js'}>
        <Viewer fileUrl={pdfUrl} />
      </Worker>
    </div>
  </div>
);

export default TevelPdfViewer; 