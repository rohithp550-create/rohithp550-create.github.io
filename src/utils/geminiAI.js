import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
let genAI = null;
let model = null;

export const initializeGemini = (apiKey) => {
  try {
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });
    return true;
  } catch (error) {
    console.error('Failed to initialize Gemini:', error);
    return false;
  }
};

export const isGeminiInitialized = () => {
  return model !== null;
};

// Enhanced expense categorization using Gemini AI
export const categorizeExpenseWithGemini = async (description, amount) => {
  if (!model) {
    throw new Error('Gemini AI not initialized. Please add your API key.');
  }

  const prompt = `Categorize this expense into ONE of these categories: Food & Dining, Transportation, Shopping, Entertainment, Bills & Utilities, Healthcare, Education, Personal Care, Subscriptions, Others.

Expense: "${description}"
Amount: ₹${amount}

Respond with ONLY the category name, nothing else.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const category = response.text().trim();
    
    // Validate the category
    const validCategories = [
      'Food & Dining', 'Transportation', 'Shopping', 'Entertainment',
      'Bills & Utilities', 'Healthcare', 'Education', 'Personal Care',
      'Subscriptions', 'Others'
    ];
    
    return validCategories.includes(category) ? category : 'Others';
  } catch (error) {
    console.error('Gemini categorization error:', error);
    throw error;
  }
};

// Get personalized financial advice using Gemini AI
export const getPersonalizedAdvice = async (expenses, monthlyIncome, spendingRatio) => {
  if (!model) {
    throw new Error('Gemini AI not initialized. Please add your API key.');
  }

  // Prepare expense summary
  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const expenseSummary = Object.entries(categoryTotals)
    .map(([cat, amount]) => `${cat}: ₹${amount}`)
    .join('\n');

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const prompt = `You are a brutally honest financial advisor. Analyze this spending pattern and provide specific, actionable advice.

Monthly Income: ₹${monthlyIncome}
Total Spent: ₹${totalSpent}
Spending Ratio: ${(spendingRatio * 100).toFixed(1)}%

Spending by Category:
${expenseSummary}

Provide:
1. A brutally honest assessment (2-3 sentences, be direct and motivating)
2. Top 3 specific actions to improve finances (be very specific, not generic)
3. One surprising insight about their spending pattern

Format your response as:
ASSESSMENT: [your assessment]
ACTIONS:
1. [specific action]
2. [specific action]
3. [specific action]
INSIGHT: [surprising insight]`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the response
    const assessmentMatch = text.match(/ASSESSMENT:\s*(.+?)(?=ACTIONS:|$)/s);
    const actionsMatch = text.match(/ACTIONS:\s*(.+?)(?=INSIGHT:|$)/s);
    const insightMatch = text.match(/INSIGHT:\s*(.+?)$/s);
    
    return {
      assessment: assessmentMatch ? assessmentMatch[1].trim() : text,
      actions: actionsMatch ? actionsMatch[1].trim().split('\n').filter(a => a.trim()) : [],
      insight: insightMatch ? insightMatch[1].trim() : ''
    };
  } catch (error) {
    console.error('Gemini advice error:', error);
    throw error;
  }
};

// Get smart spending insights using Gemini AI
export const getSpendingInsights = async (expenses, timeframe = '30 days') => {
  if (!model) {
    throw new Error('Gemini AI not initialized. Please add your API key.');
  }

  const recentExpenses = expenses.slice(0, 10).map(exp => 
    `${exp.description} - ₹${exp.amount} (${exp.category})`
  ).join('\n');

  const prompt = `Analyze these recent expenses and identify patterns or concerns:

${recentExpenses}

Provide 2-3 brief insights about spending patterns, habits, or red flags. Be specific and actionable.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Gemini insights error:', error);
    throw error;
  }
};

// Generate a motivational message based on financial status
export const getMotivationalMessage = async (severity, savingsAmount) => {
  if (!model) {
    return null; // Fall back to default messages
  }

  const prompt = `Generate a short, motivational message (1-2 sentences) for someone whose financial status is "${severity}" and they're saving ₹${savingsAmount} per month. Be encouraging but realistic.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (error) {
    console.error('Gemini motivation error:', error);
    return null;
  }
};

// Analyze a specific expense and suggest if it was necessary
export const analyzeExpenseNecessity = async (description, amount, category) => {
  if (!model) {
    throw new Error('Gemini AI not initialized. Please add your API key.');
  }

  const prompt = `Analyze this expense and rate its necessity on a scale of 1-5 (1=luxury, 5=essential):

Expense: ${description}
Amount: ₹${amount}
Category: ${category}

Respond in format:
NECESSITY: [1-5]
REASON: [brief explanation]
ALTERNATIVE: [cheaper alternative if applicable, or "None" if essential]`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const necessityMatch = text.match(/NECESSITY:\s*(\d)/);
    const reasonMatch = text.match(/REASON:\s*(.+?)(?=ALTERNATIVE:|$)/s);
    const alternativeMatch = text.match(/ALTERNATIVE:\s*(.+?)$/s);
    
    return {
      necessity: necessityMatch ? parseInt(necessityMatch[1]) : 3,
      reason: reasonMatch ? reasonMatch[1].trim() : '',
      alternative: alternativeMatch ? alternativeMatch[1].trim() : 'None'
    };
  } catch (error) {
    console.error('Gemini necessity analysis error:', error);
    throw error;
  }
};
