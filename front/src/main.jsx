import { createRoot } from 'react-dom/client';
// import App from './App.jsx';
import './index.css';
import React from 'react';
import Client from "./client.jsx";

createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <Client/>
    </React.StrictMode>,
  );
