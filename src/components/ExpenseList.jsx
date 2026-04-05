import './ExpenseList.css';

import React, { useState } from 'react';

import { useExpenses } from '../context/ExpenseContext';

const ExpenseList = () => {
  const { expenses, deleteExpense, clearAllExpenses } = useExpenses();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-IN', { 
        day: 'numeric', 
        month: 'short',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      'Food & Dining': '🍽️',
      'Transportation': '🚗',
      'Shopping': '🛍️',
      'Entertainment': '🎬',
      'Bills & Utilities': '💡',
      'Healthcare': '🏥',
      'Education': '📚',
      'Personal Care': '💅',
      'Subscriptions': '📱',
      'Others': '📦'
    };
    return emojis[category] || '📦';
  };

  // Get unique categories from expenses
  const categories = ['all', ...new Set(expenses.map(exp => exp.category))];

  // Filter expenses
  let filteredExpenses = expenses;
  if (filter !== 'all') {
    filteredExpenses = expenses.filter(exp => exp.category === filter);
  }

  // Sort expenses
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'amount') {
      return b.amount - a.amount;
    }
    return 0;
  });

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all expenses? This cannot be undone.')) {
      clearAllExpenses();
    }
  };

  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="expense-list">
      <div className="list-header">
        <h2>Expense History</h2>
        {expenses.length > 0 && (
          <button className="clear-all" onClick={handleClearAll}>
            🗑️ Clear All
          </button>
        )}
      </div>

      {expenses.length > 0 && (
        <>
          <div className="list-controls">
            <div className="filter-group">
              <label>Filter:</label>
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="sort-group">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="date">Date (Newest)</option>
                <option value="amount">Amount (Highest)</option>
              </select>
            </div>
          </div>

          <div className="list-summary">
            <span>
              Showing {sortedExpenses.length} expense{sortedExpenses.length !== 1 ? 's' : ''}
            </span>
            <span className="total-amount">
              Total: {formatCurrency(totalAmount)}
            </span>
          </div>

          <div className="expenses-container">
            {sortedExpenses.map((expense) => (
              <div key={expense.id} className="expense-item">
                <div className="expense-icon">
                  {getCategoryEmoji(expense.category)}
                </div>
                <div className="expense-details">
                  <div className="expense-description">{expense.description}</div>
                  <div className="expense-meta">
                    <span className="expense-category">{expense.category}</span>
                    <span className="expense-date">{formatDate(expense.date)}</span>
                  </div>
                </div>
                <div className="expense-right">
                  <div className="expense-amount">
                    {formatCurrency(expense.amount)}
                  </div>
                  <button
                    className="delete-button"
                    onClick={() => {
                      if (window.confirm('Delete this expense?')) {
                        deleteExpense(expense.id);
                      }
                    }}
                    title="Delete expense"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {expenses.length === 0 && (
        <div className="empty-list">
          <p>📝 No expenses yet</p>
          <p className="empty-subtitle">Start tracking to see your spending patterns</p>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;

