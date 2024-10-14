import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Ensure the following line is correct based on the actual path
import './App.css'; // Check if this file exists
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
