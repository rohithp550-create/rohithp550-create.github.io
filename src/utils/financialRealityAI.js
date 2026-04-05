// Financial Reality AI - Brutally honest financial analysis

export const analyzeFinancialReality = (expenses, monthlyIncome) => {
  if (expenses.length === 0 || monthlyIncome === 0) {
    return {
      realityCheck: "Start tracking expenses to see your financial reality.",
      severity: 'info',
      predictions: null,
      suggestions: []
    };
  }

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  
  // Calculate daily average
  const dates = expenses.map(exp => new Date(exp.date));
  const oldestDate = new Date(Math.min(...dates));
  const newestDate = new Date(Math.max(...dates));
  const daysTracked = Math.max(1, Math.ceil((newestDate - oldestDate) / (1000 * 60 * 60 * 24)) + 1);
  const dailyAverage = totalSpent / daysTracked;
  const projectedMonthlySpending = dailyAverage * 30;

  // Calculate spending ratio
  const spendingRatio = projectedMonthlySpending / monthlyIncome;

  // Generate brutal reality check
  let realityCheck = '';
  let severity = 'info';

  if (spendingRatio >= 1.2) {
    realityCheck = "🚨 You are spending like a future broke person! You're spending 20% MORE than you earn. This is financial suicide.";
    severity = 'critical';
  } else if (spendingRatio >= 1.0) {
    realityCheck = "⚠️ You are living paycheck to paycheck. One emergency and you're done. Zero savings = zero future.";
    severity = 'danger';
  } else if (spendingRatio >= 0.9) {
    realityCheck = "😬 You're barely saving anything. At this rate, you'll be working forever. Time to get serious.";
    severity = 'warning';
  } else if (spendingRatio >= 0.7) {
    realityCheck = "😐 You're doing okay, but 'okay' won't make you financially free. You can do better.";
    severity = 'moderate';
  } else if (spendingRatio >= 0.5) {
    realityCheck = "👍 Not bad! You're saving a decent amount. Keep it up and you'll actually have a future.";
    severity = 'good';
  } else {
    realityCheck = "🌟 Impressive! You're crushing it. This is how wealth is built. Stay disciplined.";
    severity = 'excellent';
  }

  // 3-month predictions
  const predictions = calculate3MonthPredictions(expenses, monthlyIncome, dailyAverage);

  // Generate realistic suggestions
  const suggestions = generateRealisticSuggestions(expenses, monthlyIncome, spendingRatio);

  return {
    realityCheck,
    severity,
    currentSpending: projectedMonthlySpending,
    spendingRatio: (spendingRatio * 100).toFixed(1),
    predictions,
    suggestions
  };
};

const calculate3MonthPredictions = (expenses, monthlyIncome, dailyAverage) => {
  const monthlySpending = dailyAverage * 30;
  const monthlySavings = monthlyIncome - monthlySpending;
  
  const threeMonthSavings = monthlySavings * 3;
  const sixMonthSavings = monthlySavings * 6;
  const yearSavings = monthlySavings * 12;

  // Category-based predictions
  const categorySpending = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const topWasteCategory = Object.entries(categorySpending)
    .sort(([, a], [, b]) => b - a)[0];

  return {
    threeMonth: {
      savings: threeMonthSavings,
      message: threeMonthSavings > 0 
        ? `You'll save ₹${Math.abs(threeMonthSavings).toFixed(0)} in 3 months`
        : `You'll be ₹${Math.abs(threeMonthSavings).toFixed(0)} in debt in 3 months`
    },
    sixMonth: {
      savings: sixMonthSavings,
      message: sixMonthSavings > 0
        ? `₹${Math.abs(sixMonthSavings).toFixed(0)} in 6 months`
        : `₹${Math.abs(sixMonthSavings).toFixed(0)} deeper in debt in 6 months`
    },
    year: {
      savings: yearSavings,
      message: yearSavings > 0
        ? `₹${Math.abs(yearSavings).toFixed(0)} in a year`
        : `₹${Math.abs(yearSavings).toFixed(0)} in debt in a year`
    },
    topWaste: topWasteCategory ? {
      category: topWasteCategory[0],
      amount: topWasteCategory[1]
    } : null
  };
};

const generateRealisticSuggestions = (expenses, monthlyIncome, spendingRatio) => {
  const suggestions = [];
  
  // Category-based analysis
  const categorySpending = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const sortedCategories = Object.entries(categorySpending)
    .sort(([, a], [, b]) => b - a);

  // Food & Dining suggestions
  if (categorySpending['Food & Dining']) {
    const foodSpending = categorySpending['Food & Dining'];
    const foodPercentage = (foodSpending / monthlyIncome) * 100;
    
    if (foodPercentage > 20) {
      suggestions.push({
        category: 'Food & Dining',
        current: foodSpending,
        suggestion: `Cut eating out by 50%. Cook at home 4 days a week.`,
        potentialSaving: foodSpending * 0.4,
        priority: 'high'
      });
    } else if (foodPercentage > 15) {
      suggestions.push({
        category: 'Food & Dining',
        current: foodSpending,
        suggestion: `Meal prep on Sundays. Skip 2 restaurant visits per week.`,
        potentialSaving: foodSpending * 0.25,
        priority: 'medium'
      });
    }
  }

  // Entertainment suggestions
  if (categorySpending['Entertainment']) {
    const entSpending = categorySpending['Entertainment'];
    if (entSpending > monthlyIncome * 0.1) {
      suggestions.push({
        category: 'Entertainment',
        current: entSpending,
        suggestion: `Cancel unused subscriptions. Share Netflix with family.`,
        potentialSaving: entSpending * 0.4,
        priority: 'high'
      });
    }
  }

  // Shopping suggestions
  if (categorySpending['Shopping']) {
    const shopSpending = categorySpending['Shopping'];
    if (shopSpending > monthlyIncome * 0.15) {
      suggestions.push({
        category: 'Shopping',
        current: shopSpending,
        suggestion: `Wait 48 hours before buying anything non-essential.`,
        potentialSaving: shopSpending * 0.5,
        priority: 'high'
      });
    }
  }

  // Transportation suggestions
  if (categorySpending['Transportation']) {
    const transSpending = categorySpending['Transportation'];
    if (transSpending > monthlyIncome * 0.15) {
      suggestions.push({
        category: 'Transportation',
        current: transSpending,
        suggestion: `Use public transport 3 days a week. Carpool when possible.`,
        potentialSaving: transSpending * 0.3,
        priority: 'medium'
      });
    }
  }

  // General overspending
  if (spendingRatio > 0.9) {
    suggestions.push({
      category: 'Overall',
      current: null,
      suggestion: `Emergency mode: Track every rupee. No impulse purchases for 30 days.`,
      potentialSaving: monthlyIncome * 0.2,
      priority: 'critical'
    });
  }

  // If no specific suggestions, add general advice
  if (suggestions.length === 0 && spendingRatio > 0.7) {
    suggestions.push({
      category: 'General',
      current: null,
      suggestion: `Set up automatic savings. Pay yourself first - 20% of income.`,
      potentialSaving: monthlyIncome * 0.2,
      priority: 'medium'
    });
  }

  return suggestions.sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

export const getMotivationalMessage = (severity) => {
  const messages = {
    critical: "Your future self is begging you to change. Start today.",
    danger: "Every day you delay is money you'll never get back.",
    warning: "Small changes now = big results later. You got this.",
    moderate: "You're on the right track. Don't get comfortable.",
    good: "Keep going! Financial freedom is closer than you think.",
    excellent: "You're building real wealth. This is the way."
  };
  
  return messages[severity] || messages.moderate;
};