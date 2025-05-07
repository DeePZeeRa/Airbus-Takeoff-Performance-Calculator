import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render( // Ensure this matches the ID in index.html
  <StrictMode>
    <App />
  </StrictMode>
);
