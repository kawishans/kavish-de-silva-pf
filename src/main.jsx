import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { PortfolioProvider } from './context/PortfolioContext.jsx';
import { HighlightsProvider } from './context/HighlightsContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <PortfolioProvider>
          <HighlightsProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </HighlightsProvider>
        </PortfolioProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
