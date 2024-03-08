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
import Chat from './components/Chat';

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
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
