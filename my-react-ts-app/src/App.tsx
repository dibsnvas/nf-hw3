import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostsList from './component/PostsList';
import PostDetail from './component/PostDetail';
import LoginPage from './component/LoginPage';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import PrivateRoute from './component/PrivateRoute';
import Header from './component/Header';
import './App.css'

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <Header />
          <div className="App">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<PostsList />} />
                <Route path="/posts/:id" element={<PostDetail />} />
              </Route>
            </Routes>
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};


export default App;
