import './Dashboard.css';

import React, { useState } from 'react';
import { analyzeFinancialReality, getMotivationalMessage } from '../utils/financialRealityAI';

import { getSpendingInsights } from '../utils/aiCategorizer';
import { useExpenses } from '../context/ExpenseContext';

const Dashboard = () => {
  const { expenses, monthlyIncome } = useExpenses();
  const [showDetails, setShowDetails] = useState(false);

  const insights = getSpendingInsights(expenses, monthlyIncome);
  const reality = analyzeFinancialReality(expenses, monthlyIncome);

  const getSeverityColor = (severity) => {
    const colors = {
      critical: '#dc2626',
      danger: '#ea580c',
      warning: '#f59e0b',
      moderate: '#3b82f6',
      good: '#10b981',
      excellent: '#059669',
      info: '#6b7280'
    };
    return colors[severity] || colors.info;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>💰 Financial Reality Check</h1>
        <p className="subtitle">No sugar-coating. Just facts.</p>
      </div>

      {/* Reality Check Card */}
      <div 
        className="reality-card"
        style={{ borderColor: getSeverityColor(reality.severity) }}
      >
        <div className="reality-header">
          <h2>Your Financial Reality</h2>
          <span 
            className="severity-badge"
            style={{ backgroundColor: getSeverityColor(reality.severity) }}
          >
            {reality.severity.toUpperCase()}
          </span>
        </div>
        <p className="reality-message">{reality.realityCheck}</p>
        <p className="motivational-message">
          {getMotivationalMessage(reality.severity)}
        </p>

        {reality.currentSpending > 0 && (
          <div className="spending-stats">
            <div className="stat">
              <span className="stat-label">Monthly Income</span>
              <span className="stat-value">{formatCurrency(monthlyIncome)}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Projected Spending</span>
              <span className="stat-value spending">
                {formatCurrency(reality.currentSpending)}
              </span>
            </div>
            <div className="stat">
              <span className="stat-label">Spending Ratio</span>
              <span 
                className="stat-value"
                style={{ color: getSeverityColor(reality.severity) }}
              >
                {reality.spendingRatio}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 3-Month Predictions */}
      {reality.predictions && (
        <div className="predictions-card">
          <h2>📊 Your Financial Future</h2>
          <div className="predictions-grid">
            <div className="prediction-item">
              <span className="prediction-period">3 Months</span>
              <span 
                className={`prediction-amount ${reality.predictions.threeMonth.savings < 0 ? 'negative' : 'positive'}`}
              >
                {formatCurrency(Math.abs(reality.predictions.threeMonth.savings))}
              </span>
              <span className="prediction-label">
                {reality.predictions.threeMonth.savings < 0 ? 'In Debt' : 'Saved'}
              </span>
            </div>
            <div className="prediction-item">
              <span className="prediction-period">6 Months</span>
              <span 
                className={`prediction-amount ${reality.predictions.sixMonth.savings < 0 ? 'negative' : 'positive'}`}
              >
                {formatCurrency(Math.abs(reality.predictions.sixMonth.savings))}
              </span>
              <span className="prediction-label">
                {reality.predictions.sixMonth.savings < 0 ? 'In Debt' : 'Saved'}
              </span>
            </div>
            <div className="prediction-item">
              <span className="prediction-period">1 Year</span>
              <span 
                className={`prediction-amount ${reality.predictions.year.savings < 0 ? 'negative' : 'positive'}`}
              >
                {formatCurrency(Math.abs(reality.predictions.year.savings))}
              </span>
              <span className="prediction-label">
                {reality.predictions.year.savings < 0 ? 'In Debt' : 'Saved'}
              </span>
            </div>
          </div>

          {reality.predictions.topWaste && (
            <div className="top-waste">
              <p>
                🔥 Your biggest money drain: <strong>{reality.predictions.topWaste.category}</strong>
                <br />
                <span className="waste-amount">
                  {formatCurrency(reality.predictions.topWaste.amount)} wasted
                </span>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Realistic Suggestions */}
      {reality.suggestions && reality.suggestions.length > 0 && (
        <div className="suggestions-card">
          <h2>💡 Realistic Action Plan</h2>
          <p className="suggestions-intro">
            Not generic advice. Actual steps based on YOUR spending:
          </p>
          <div className="suggestions-list">
            {reality.suggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className="suggestion-item"
                style={{ borderLeftColor: getSeverityColor(suggestion.priority) }}
              >
                <div className="suggestion-header">
                  <span className="suggestion-category">{suggestion.category}</span>
                  <span 
                    className="suggestion-priority"
                    style={{ backgroundColor: getSeverityColor(suggestion.priority) }}
                  >
                    {suggestion.priority}
                  </span>
                </div>
                <p className="suggestion-text">{suggestion.suggestion}</p>
                {suggestion.current && (
                  <p className="suggestion-current">
                    Current: {formatCurrency(suggestion.current)}
                  </p>
                )}
                <p className="suggestion-saving">
                  💰 Potential saving: {formatCurrency(suggestion.potentialSaving)}/month
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Spending Breakdown */}
      {insights.topCategories.length > 0 && (
        <div className="breakdown-card">
          <div className="breakdown-header">
            <h2>📈 Where Your Money Goes</h2>
            <button 
              className="toggle-details"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide' : 'Show'} Details
            </button>
          </div>

          <div className="total-spent">
            <span>Total Tracked:</span>
            <span className="amount">{formatCurrency(insights.totalSpent)}</span>
          </div>

          {showDetails && (
            <>
              <div className="category-list">
                {insights.topCategories.map((cat, index) => (
                  <div key={index} className="category-item">
                    <div className="category-info">
                      <span className="category-name">{cat.category}</span>
                      <span className="category-percentage">{cat.percentage}%</span>
                    </div>
                    <div className="category-bar">
                      <div 
                        className="category-fill"
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                    <span className="category-amount">
                      {formatCurrency(cat.amount)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="tracking-info">
                <p>📅 Tracking for {insights.daysTracked} days</p>
                <p>📊 Daily average: {formatCurrency(insights.averageDaily)}</p>
              </div>
            </>
          )}
        </div>
      )}

      {expenses.length === 0 && (
        <div className="empty-state">
          <h3>No expenses tracked yet</h3>
          <p>Start adding expenses to see your financial reality.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

