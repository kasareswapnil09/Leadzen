// src/App.js
import React from 'react';
import './App.css';
import DataComponent from './components/DataComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>JSON Data Table with Dropdown</h1>
        <DataComponent />
      </header>
    </div>
  );
}

export default App;
