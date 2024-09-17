import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import CompletedGenerationsPage from './pages/CompletedGenerationsPage/CompletedGenerationsPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/completed">Completed Generations</Link></li>
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
