import './Settings.css';

import React, { useEffect, useState } from 'react';
import { initializeGemini, isGeminiInitialized } from '../utils/geminiAI';

const Settings = () => {
  const [apiKey, setApiKey] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if API key exists in localStorage
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      const initialized = initializeGemini(savedKey);
      setIsInitialized(initialized);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      setMessage('Please enter a valid API key');
      return;
    }

    const success = initializeGemini(apiKey);
    if (success) {
      localStorage.setItem('gemini_api_key', apiKey);
      setIsInitialized(true);
      setMessage('✅ Gemini AI initialized successfully!');
    } else {
      setMessage('❌ Failed to initialize Gemini AI. Check your API key.');
    }

    setTimeout(() => setMessage(''), 3000);
  };

  const handleRemoveApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setIsInitialized(false);
    setMessage('API key removed');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="settings">
      <div className="settings-header">
        <h2>⚙️ Settings</h2>
        <p className="subtitle">Configure your AI-powered expense tracker</p>
      </div>

      <div className="settings-card">
        <h3>🤖 Gemini AI Integration</h3>
        <p className="settings-description">
          Enable advanced AI features powered by Google Gemini:
        </p>
        
        <ul className="features-list">
          <li>✨ Smart expense categorization</li>
          <li>💡 Personalized financial advice</li>
          <li>🎯 Spending pattern insights</li>
          <li>🔍 Expense necessity analysis</li>
        </ul>

        <div className="api-key-section">
          <label htmlFor="apiKey">Gemini API Key</label>
          <div className="api-key-input-group">
            <input
              type={showKey ? 'text' : 'password'}
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              disabled={isInitialized}
            />
            <button
              className="toggle-visibility"
              onClick={() => setShowKey(!showKey)}
              type="button"
            >
              {showKey ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>

          {message && (
            <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <div className="api-key-actions">
            {!isInitialized ? (
              <button className="save-button" onClick={handleSaveApiKey}>
                Save & Initialize
              </button>
            ) : (
              <button className="remove-button" onClick={handleRemoveApiKey}>
                Remove API Key
              </button>
            )}
          </div>

          {isInitialized && (
            <div className="status-badge success">
              ✅ Gemini AI Active
            </div>
          )}
        </div>

        <div className="help-section">
          <h4>How to get your API key:</h4>
          <ol>
            <li>Visit <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer">Google AI Studio</a></li>
            <li>Sign in with your Google account</li>
            <li>Click "Get API Key" or "Create API Key"</li>
            <li>Copy the key and paste it above</li>
          </ol>
          <p className="note">
            <strong>Note:</strong> Your API key is stored locally in your browser and never sent to any server except Google's Gemini API.
          </p>
        </div>
      </div>

      <div className="settings-card">
        <h3>🔒 Privacy & Data</h3>
        <ul className="info-list">
          <li>✅ All expense data stored locally in your browser</li>
          <li>✅ No data sent to external servers (except Gemini API when enabled)</li>
          <li>✅ API key stored securely in browser localStorage</li>
          <li>✅ You can clear all data anytime from browser settings</li>
        </ul>
      </div>

      <div className="settings-card">
        <h3>ℹ️ About</h3>
        <p><strong>Financial Reality AI</strong></p>
        <p>Version: 1.0.0</p>
        <p>A brutally honest expense tracker with AI-powered insights</p>
        <div className="tech-stack">
          <span className="tech-badge">React</span>
          <span className="tech-badge">Vite</span>
          <span className="tech-badge">Gemini AI</span>
          <span className="tech-badge">LocalStorage</span>
        </div>
      </div>
    </div>
  );
};

export default Settings;

