import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? 'theme-dark' : 'theme-light'}>
      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle theme"
      >
        <i className={`bi ${darkMode ? 'bi-sun-fill' : 'bi-moon-fill'}`} />
      </button>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:username" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
      <footer className="app-footer">
        Built by{' '}
        <a href="https://wa.me/231776428126" target="_blank" rel="noopener noreferrer">
          Mark Sumo
        </a>
      </footer>
    </div>
  );
}

export default App;
