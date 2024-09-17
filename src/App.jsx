import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CompletedGenerationsPage from './pages/CompletedGenerationsPage/CompletedGenerationsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="main-nav">
          <ul>
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/completed">Completed Generations</NavLink></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/completed" element={<CompletedGenerationsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
