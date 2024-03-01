import { createRoot } from 'react-dom/client.js';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>,
  );
