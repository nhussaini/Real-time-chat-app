import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';
import Join from './components/Join';

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">Welcome to SkillReactor!</header>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/join" replace />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
