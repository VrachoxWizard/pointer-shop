import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ShopProvider } from './context/ShopContext.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ShopProvider>
      <App />
    </ShopProvider>
  </React.StrictMode>
);
