import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import FrontPage from './pages/FrontPage';
import './index.css';

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <FrontPage />
    </StrictMode>,
  );
}
