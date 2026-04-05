import './ExpenseEntry.css';

import React, { useState } from 'react';
import { categorizeExpense, getAllCategories } from '../utils/aiCategorizer';
import { categorizeExpenseWithGemini, isGeminiInitialized } from '../utils/geminiAI';

import { useExpenses } from '../context/ExpenseContext';

const ExpenseEntry = () => {
  const { addExpense, monthlyIncome, setMonthlyIncome } = useExpenses();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [tempIncome, setTempIncome] = useState(monthlyIncome.toString());
  const [isCategorizingWithAI, setIsCategorizingWithAI] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!description.trim() || !amount || parseFloat(amount) <= 0) {
      alert('Please enter valid description and amount');
      return;
    }

    let finalCategory = category;

    // Try Gemini AI categorization first if available and no manual category selected
    if (!category && isGeminiInitialized()) {
      setIsCategorizingWithAI(true);
      try {
        finalCategory = await categorizeExpenseWithGemini(description, parseFloat(amount));
      } catch (error) {
        console.error('Gemini categorization failed, using fallback:', error);
        finalCategory = categorizeExpense(description);
      } finally {
        setIsCategorizingWithAI(false);
      }
    } else if (!category) {
      // Fallback to rule-based categorization
      finalCategory = categorizeExpense(description);
    }

    addExpense({
      description: description.trim(),
      amount: parseFloat(amount),
      category: finalCategory
    });

    // Reset form
    setDescription('');
    setAmount('');
    setCategory('');
    setAiSuggestion('');
  };

  const handleDescriptionChange = async (e) => {
    const value = e.target.value;
    setDescription(value);
    
    // Auto-suggest category as user types
    if (value.length > 3 && !category && amount) {
      if (isGeminiInitialized()) {
        // Show AI is thinking
        setAiSuggestion('🤖 AI analyzing...');
        try {
          const suggested = await categorizeExpenseWithGemini(value, parseFloat(amount) || 0);
          setAiSuggestion(`🤖 AI suggests: ${suggested}`);
        } catch (error) {
          const suggested = categorizeExpense(value);
          setAiSuggestion(`AI suggests: ${suggested}`);
        }
      } else {
        const suggested = categorizeExpense(value);
        setAiSuggestion(`AI suggests: ${suggested}`);
      }
    } else if (value.length <= 3) {
      setAiSuggestion('');
    }
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    const income = parseFloat(tempIncome);
    if (income > 0) {
      setMonthlyIncome(income);
      setShowIncomeModal(false);
    } else {
      alert('Please enter a valid income amount');
    }
  };

  const suggestedCategory = description.length > 2 ? categorizeExpense(description) : '';

  return (
    <div className="expense-entry">
      <div className="entry-header">
        <h2>Add Expense</h2>
        <button 
          className="income-button"
          onClick={() => setShowIncomeModal(true)}
        >
          💰 Income: ₹{monthlyIncome.toLocaleString('en-IN')}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label htmlFor="description">What did you spend on?</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="e.g., Lunch at restaurant, Uber ride, Netflix subscription"
            required
          />
          {suggestedCategory && !category && (
            <span className="ai-suggestion">
              🤖 AI suggests: {suggestedCategory}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount (₹)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            step="0.01"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category (optional - AI will suggest)</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Auto-categorize with AI</option>
            {getAllCategories().map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-button">
          Add Expense
        </button>
      </form>

      <div className="quick-add">
        <h3>Quick Add</h3>
        <div className="quick-buttons">
          <button onClick={() => { setDescription('Coffee'); setAmount('150'); }}>
            ☕ Coffee
          </button>
          <button onClick={() => { setDescription('Lunch'); setAmount('300'); }}>
            🍽️ Lunch
          </button>
          <button onClick={() => { setDescription('Uber ride'); setAmount('200'); }}>
            🚗 Uber
          </button>
          <button onClick={() => { setDescription('Groceries'); setAmount('500'); }}>
            🛒 Groceries
          </button>
        </div>
      </div>

      {/* Income Modal */}
      {showIncomeModal && (
        <div className="modal-overlay" onClick={() => setShowIncomeModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Set Monthly Income</h3>
            <p>Enter your monthly income to get accurate financial insights</p>
            <form onSubmit={handleIncomeSubmit}>
              <input
                type="number"
                value={tempIncome}
                onChange={(e) => setTempIncome(e.target.value)}
                placeholder="Enter monthly income"
                step="1000"
                min="0"
                required
                autoFocus
              />
              <div className="modal-buttons">
                <button type="submit" className="modal-submit">
                  Save
                </button>
                <button 
                  type="button" 
                  className="modal-cancel"
                  onClick={() => setShowIncomeModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseEntry;

