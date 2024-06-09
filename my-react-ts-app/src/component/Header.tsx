import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './Header.css';

const Header: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { isDarkTheme, toggleTheme } = useTheme();
  const location = useLocation();

  if (!authContext) {
    return null;
  }

  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {authContext.isAuthenticated && location.pathname === '/' && (
            <li>
              <button onClick={authContext.logout}>Logout</button>
            </li>
          )}
          {!authContext.isAuthenticated && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          <li>
            <button onClick={toggleTheme}>
              {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
