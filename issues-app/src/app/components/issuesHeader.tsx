import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const IssuesHeader: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header>
      <h1>Issues App</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} theme
      </button>
    </header>
  );
};

export default IssuesHeader;