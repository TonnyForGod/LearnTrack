import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Make sure this path is correct

// Add DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    console.error('Root element not found! Check your HTML file.');
  }
});