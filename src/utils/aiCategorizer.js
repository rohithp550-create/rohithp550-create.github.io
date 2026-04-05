// AI-powered expense categorization
const categoryKeywords = {
  'Food & Dining': ['restaurant', 'cafe', 'food', 'pizza', 'burger', 'swiggy', 'zomato', 'uber eats', 'dominos', 'mcdonalds', 'kfc', 'starbucks', 'dunkin', 'subway', 'grocery', 'supermarket', 'market'],
  'Transportation': ['uber', 'lyft', 'ola', 'taxi', 'metro', 'bus', 'train', 'fuel', 'petrol', 'gas', 'parking', 'toll', 'rapido'],
  'Shopping': ['amazon', 'flipkart', 'myntra', 'ajio', 'mall', 'store', 'shop', 'clothing', 'fashion', 'electronics', 'nike', 'adidas'],
  'Entertainment': ['netflix', 'spotify', 'prime', 'hotstar', 'movie', 'cinema', 'theatre', 'concert', 'game', 'gaming', 'steam', 'playstation'],
  'Bills & Utilities': ['electricity', 'water', 'internet', 'wifi', 'phone', 'mobile', 'recharge', 'airtel', 'jio', 'vodafone', 'bill payment'],
  'Healthcare': ['hospital', 'doctor', 'pharmacy', 'medicine', 'medical', 'clinic', 'health', 'apollo', 'practo'],
  'Education': ['course', 'book', 'tuition', 'school', 'college', 'university', 'udemy', 'coursera', 'training'],
  'Personal Care': ['salon', 'spa', 'gym', 'fitness', 'beauty', 'haircut', 'grooming'],
  'Subscriptions': ['subscription', 'membership', 'premium', 'pro', 'plus'],
  'Others': []
};

export const categorizeExpense = (description) => {
  const lowerDesc = description.toLowerCase();
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (category === 'Others') continue;
    
    for (const keyword of keywords) {
      if (lowerDesc.includes(keyword)) {
        return category;
      }
    }
  }
  
  return 'Others';
};

export const getSpendingInsights = (expenses, monthlyIncome) => {
  if (expenses.length === 0) {
    return {
      totalSpent: 0,
      categoryBreakdown: {},
      topCategories: [],
      averageDaily: 0,
      daysTracked: 0
    };
  }

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  
  const categoryBreakdown = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const topCategories = Object.entries(categoryBreakdown)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: ((amount / totalSpent) * 100).toFixed(1)
    }));

  const dates = expenses.map(exp => new Date(exp.date));
  const oldestDate = new Date(Math.min(...dates));
  const newestDate = new Date(Math.max(...dates));
  const daysTracked = Math.max(1, Math.ceil((newestDate - oldestDate) / (1000 * 60 * 60 * 24)) + 1);
  const averageDaily = totalSpent / daysTracked;

  return {
    totalSpent,
    categoryBreakdown,
    topCategories,
    averageDaily,
    daysTracked
  };
};

export const getAllCategories = () => {
  return Object.keys(categoryKeywords);
};

