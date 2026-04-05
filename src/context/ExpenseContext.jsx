import React, { createContext, useContext, useEffect, useState } from 'react';

const ExpenseContext = createContext();

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [monthlyIncome, setMonthlyIncome] = useState(() => {
    const saved = localStorage.getItem('monthlyIncome');
    return saved ? parseFloat(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('monthlyIncome', monthlyIncome.toString());
  }, [monthlyIncome]);

  const addExpense = (expense) => {
    const newExpense = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...expense
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };

  const updateExpense = (id, updatedExpense) => {
    setExpenses(prev => prev.map(exp => 
      exp.id === id ? { ...exp, ...updatedExpense } : exp
    ));
  };

  const clearAllExpenses = () => {
    setExpenses([]);
  };

  return (
    <ExpenseContext.Provider value={{
      expenses,
      addExpense,
      deleteExpense,
      updateExpense,
      clearAllExpenses,
      monthlyIncome,
      setMonthlyIncome
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};

