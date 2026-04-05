import './App.css';

import React, { useState } from 'react';

import Dashboard from './components/Dashboard';
import ExpenseEntry from './components/ExpenseEntry';
import ExpenseList from './components/ExpenseList';
import { ExpenseProvider } from './context/ExpenseContext';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <ExpenseProvider>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">
              💸 Financial Reality AI
            </h1>
            <p className="app-tagline">
              Stop wondering where your money goes. We'll tell you the brutal truth.
            </p>
          </div>
        </header>

        <nav className="app-nav">
          <button
            className={`nav-button ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button
            className={`nav-button ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            ➕ Add Expense
          </button>
          <button
            className={`nav-button ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            📝 History
          </button>
        </nav>

        <main className="app-main">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'add' && <ExpenseEntry />}
          {activeTab === 'history' && <ExpenseList />}
        </main>

        <footer className="app-footer">
          <p>
            Built with React • AI-Powered Insights • Your data stays local
          </p>
        </footer>
      </div>
    </ExpenseProvider>
  );
}

export default App;

