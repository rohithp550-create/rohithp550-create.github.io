# 💸 Financial Reality AI - Expense Tracker

A brutally honest expense tracking app that tells you the truth about your spending habits. No sugar-coating, just facts and AI-powered insights powered by Google Gemini.

## 🌟 Features

### 🤖 Gemini AI Integration (NEW!)
- **Smart Expense Categorization**: Uses Google Gemini 1.5 Flash for intelligent expense categorization
- **Dashboard AI Advisor**: Real-time personalized financial advice displayed on your dashboard
- **AI Spending Analysis**: Automatic pattern recognition and spending insights on dashboard
- **Personalized Recommendations**: AI-generated action items based on YOUR spending patterns
- **Expense Necessity Analysis**: AI rates whether expenses are essential or luxury
- **Motivational Messages**: Context-aware encouragement based on your financial status

### Core Functionality
- **Manual Expense Entry**: Add expenses with description and amount
- **Dual AI Categorization**:
  - **Gemini AI** (when API key provided): Advanced ML-based categorization
  - **Rule-based AI** (fallback): Keyword-based categorization for 10+ categories
- **Smart Category Detection**: Recognizes common merchants and services (Swiggy, Zomato, Uber, Netflix, etc.)
- **Local Data Storage**: All data stored in browser localStorage - your privacy is protected

### Financial Reality Check
- **Brutal Honesty**: Get real feedback on your spending habits
  - "You are spending like a future broke person" (when overspending)
  - "You're crushing it" (when saving well)
- **Spending Ratio Analysis**: See exactly what percentage of income you're spending
- **Severity Levels**: Critical, Danger, Warning, Moderate, Good, Excellent

### 3-Month Predictions
- **Future Savings Forecast**: See how much you'll save (or owe) in 3, 6, and 12 months
- **Trend Analysis**: Based on your current spending patterns
- **Top Waste Category**: Identifies where you're bleeding money

### Realistic Action Plan
- **Personalized Suggestions**: Not generic advice - specific to YOUR spending
- **Priority-Based**: Critical, High, Medium, Low priority actions
- **Potential Savings**: Shows exactly how much you can save with each suggestion
- **Category-Specific Tips**:
  - Food & Dining: "Cut eating out by 50%. Cook at home 4 days a week."
  - Entertainment: "Cancel unused subscriptions. Share Netflix with family."
  - Shopping: "Wait 48 hours before buying anything non-essential."
  - Transportation: "Use public transport 3 days a week."

### Spending Analytics
- **Category Breakdown**: Visual breakdown of spending by category
- **Top 5 Categories**: See where most money goes
## 🤖 Setting Up Gemini AI

### Get Your Free API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API Key" or "Create API Key"
4. Copy your API key

### Configure in App

1. Open the app and go to **⚙️ Settings** tab
2. Paste your Gemini API key
3. Click "Save & Initialize"
4. You'll see "✅ Gemini AI Active" when successful

### Features Enabled with Gemini AI

#### In Expense Entry:
- **Smart Categorization**: More accurate expense categorization using ML
- **Context Understanding**: Recognizes complex descriptions and occasions

#### On Dashboard (NEW!):
- **🤖 AI Financial Advisor Card**:
  - Real-time assessment of your financial health
  - Specific action items tailored to your spending
  - Key insights about your financial behavior
- **🔍 AI Spending Analysis Card**:
  - Automatic pattern recognition in your expenses
  - Identifies concerning trends and positive habits
  - Provides context-aware observations
- **Auto-Refresh**: AI insights update automatically when you add new expenses

#### Additional Features:
- **Necessity Analysis**: Rates whether expenses are essential or luxury
- **Context-Aware Messages**: Motivational messages tailored to your financial status

### Privacy & Security

- Your API key is stored locally in your browser (localStorage)
- Only you have access to your API key
- Expense data is sent to Google Gemini API only for analysis
- No data is stored on external servers
- You can remove your API key anytime from Settings

- **Daily Average**: Track daily spending patterns
- **Time-Based Tracking**: Shows how many days you've been tracking

### Expense Management
- **Quick Add Buttons**: Fast entry for common expenses (Coffee, Lunch, Uber, Groceries)
- **Filter by Category**: View expenses by specific categories
- **Sort Options**: By date or amount
- **Delete & Clear**: Manage individual or all expenses

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or navigate to the project directory:
```bash
cd "Expense Split"
```

2. Install dependencies (already done):
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## 📱 How to Use

### First Time Setup
1. Click the "💰 Income" button to set your monthly income
2. This is crucial for accurate financial reality checks

### Adding Expenses
1. Go to "➕ Add Expense" tab
2. Enter description (e.g., "Lunch at restaurant")
3. Enter amount
4. AI will auto-suggest category (or choose manually)
5. Click "Add Expense"

**Quick Add**: Use quick buttons for common expenses

### Viewing Dashboard
1. Go to "📊 Dashboard" tab
2. See your financial reality check
3. View 3-month predictions
4. Get realistic action plan
5. Analyze spending breakdown

### Managing Expenses
1. Go to "📝 History" tab
2. Filter by category
3. Sort by date or amount
4. Delete individual expenses
5. Clear all expenses if needed

## 🎨 Categories

The AI recognizes these categories:
- 🍽️ Food & Dining
- 🚗 Transportation
- 🛍️ Shopping
- 🎬 Entertainment
- 💡 Bills & Utilities
- 🏥 Healthcare
- 📚 Education
- 💅 Personal Care
- 📱 Subscriptions
- 📦 Others

## 🧠 AI Features

### Smart Categorization
The AI analyzes expense descriptions and matches them against a comprehensive keyword database:
- **Food**: Swiggy, Zomato, restaurant, cafe, pizza, burger, etc.
- **Transport**: Uber, Ola, taxi, metro, fuel, parking, etc.
- **Shopping**: Amazon, Flipkart, Myntra, mall, store, etc.
- **Entertainment**: Netflix, Spotify, Prime, movie, gaming, etc.

### Financial Reality Analysis
The AI calculates:
- **Spending Ratio**: Monthly spending vs income
- **Severity Assessment**: From Critical to Excellent
- **Future Projections**: 3, 6, and 12-month forecasts
- **Waste Detection**: Identifies biggest spending categories

### Personalized Suggestions
Based on YOUR actual spending:
- Analyzes each category's percentage of income
- Provides specific, actionable advice
- Calculates potential savings
- Prioritizes by impact

## 🔒 Privacy & Data

- **100% Local Storage**: All data stays in your browser
- **No Server**: No data sent to any server
- **No Tracking**: No analytics or tracking
- **Your Data, Your Control**: Clear all data anytime

## 🛠️ Technology Stack

- **React 18**: Modern UI framework
- **Vite**: Fast build tool
- **Context API**: State management
- **LocalStorage**: Data persistence
- **CSS3**: Custom styling with dark theme

## 📊 Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx          # Main dashboard with insights
│   ├── Dashboard.css
│   ├── ExpenseEntry.jsx       # Add expense form
│   ├── ExpenseEntry.css
│   ├── ExpenseList.jsx        # Expense history
│   └── ExpenseList.css
├── context/
│   └── ExpenseContext.jsx     # Global state management
├── utils/
│   ├── aiCategorizer.js       # AI categorization logic
│   └── financialRealityAI.js  # Financial analysis engine
├── App.jsx                     # Main app component
├── App.css                     # Global styles
└── main.jsx                    # Entry point
```

## 🎯 Future Enhancements

### Planned Features
- **Bank Integration**: Connect to bank accounts (via Plaid/similar)
- **SMS Parsing**: Auto-import from transaction SMS
- **Export Data**: CSV/PDF export
- **Budget Goals**: Set and track budget limits
- **Recurring Expenses**: Track subscriptions automatically
- **Multi-Currency**: Support for different currencies
- **Charts & Graphs**: Visual spending trends
- **Comparison**: Month-over-month comparisons

## 🤝 Contributing

This is a personal project, but suggestions are welcome!

## 📄 License

MIT License - Feel free to use and modify

## 💡 Tips for Best Results

1. **Set Accurate Income**: The more accurate your income, the better the insights
2. **Track Everything**: Even small expenses add up
3. **Be Consistent**: Track daily for best predictions
4. **Use Descriptions**: Better descriptions = better AI categorization
5. **Review Weekly**: Check dashboard weekly to stay on track
6. **Act on Suggestions**: The AI suggestions are based on YOUR data - they work!

## 🐛 Known Issues

- None currently - report any issues you find!

## 📞 Support

For questions or issues, please create an issue in the repository.

---

**Remember**: This app tells you the truth. It might hurt, but that's the point. Financial freedom starts with facing reality. 💪
