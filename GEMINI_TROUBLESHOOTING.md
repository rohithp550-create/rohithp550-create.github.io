# 🔧 Gemini AI Dashboard Integration - Troubleshooting Guide

## Issue: Gemini Cards Not Appearing on Dashboard

If you're not seeing the Gemini AI cards on your dashboard, follow these steps:

### Step 1: Verify Gemini API Key is Set

1. Go to **⚙️ Settings** tab
2. Check if you see "✅ Gemini AI Active" badge
3. If not, you need to add your API key:
   - Get a free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Paste it in the Settings page
   - Click "Save & Initialize"

### Step 2: Check Browser Console for Errors

1. Open browser DevTools (F12 or Right-click → Inspect)
2. Go to **Console** tab
3. Look for any errors related to Gemini
4. Common errors and solutions:

#### Error: "Gemini AI not initialized"
**Solution**: Add your API key in Settings

#### Error: "Failed to fetch" or "Network error"
**Solution**: 
- Check your internet connection
- Verify API key is correct
- Check if you've exceeded API quota

#### Error: "Invalid model name"
**Solution**: The code now uses `gemini-1.5-flash` (fixed in latest update)

### Step 3: Verify You Have Expenses

The Gemini cards only appear when:
- ✅ Gemini API key is configured
- ✅ You have at least 1 expense added
- ✅ Monthly income is set

**To test:**
1. Go to **💰 Add Expense** tab
2. Set your monthly income (click "Set Monthly Income" button)
3. Add at least one expense
4. Go back to **📊 Dashboard** tab
5. Wait 2-3 seconds for AI to analyze

### Step 4: Check Network Tab

1. Open DevTools → **Network** tab
2. Filter by "generativelanguage" or "gemini"
3. Add an expense and go to Dashboard
4. You should see API calls to Google's Gemini API
5. Click on the request to see:
   - Status: Should be 200 (success)
   - Response: Should contain AI-generated text

### Step 5: Clear Cache and Reload

Sometimes the browser cache causes issues:

1. Open DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"
4. Or use: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)

### Step 6: Verify Code Changes

Make sure these files have the latest changes:

#### `src/components/Dashboard.jsx`
Should import:
```javascript
import { 
  getSpendingInsights as getGeminiSpendingInsights, 
  getPersonalizedAdvice, 
  isGeminiInitialized 
} from '../utils/geminiAI';
```

Should have useEffect:
```javascript
useEffect(() => {
  const fetchGeminiData = async () => {
    if (!isGeminiInitialized() || expenses.length === 0) {
      return;
    }
    // ... fetch logic
  };
  fetchGeminiData();
}, [expenses, monthlyIncome, reality.currentSpending]);
```

#### `src/utils/geminiAI.js`
Should use correct model:
```javascript
model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
```

### Step 7: Test with Console Logs

Add temporary console logs to debug:

In `Dashboard.jsx`, add inside useEffect:
```javascript
console.log('Gemini initialized?', isGeminiInitialized());
console.log('Expenses count:', expenses.length);
console.log('Loading Gemini:', loadingGemini);
console.log('Gemini Advice:', geminiAdvice);
console.log('Gemini Insights:', geminiInsights);
```

### Expected Behavior

When working correctly, you should see:

1. **Loading State** (2-3 seconds):
   ```
   ┌─────────────────────────────────────┐
   │  🔄 Loading spinner                 │
   │  AI is analyzing your spending...   │
   └─────────────────────────────────────┘
   ```

2. **AI Financial Advisor Card** (purple gradient):
   ```
   ┌─────────────────────────────────────┐
   │  🤖 AI Financial Advisor            │
   │  Powered by Gemini                  │
   │                                     │
   │  Assessment:                        │
   │  [AI-generated assessment]          │
   │                                     │
   │  Recommended Actions:               │
   │  1. [Action 1]                      │
   │  2. [Action 2]                      │
   │  3. [Action 3]                      │
   │                                     │
   │  💡 Key Insight:                    │
   │  [AI-generated insight]             │
   └─────────────────────────────────────┘
   ```

3. **AI Spending Analysis Card** (pink gradient):
   ```
   ┌─────────────────────────────────────┐
   │  🔍 AI Spending Analysis            │
   │  Powered by Gemini                  │
   │                                     │
   │  [AI-generated spending patterns]   │
   └─────────────────────────────────────┘
   ```

### Common Issues and Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Cards never appear | API key not set | Add API key in Settings |
| Cards appear then disappear | API error | Check console for errors |
| Loading forever | Network issue | Check internet connection |
| "Invalid API key" error | Wrong key | Get new key from Google AI Studio |
| "Quota exceeded" error | Too many requests | Wait or upgrade API plan |
| Cards don't update | useEffect not triggering | Add/remove expense to trigger |

### API Quota Information

**Free Tier Limits:**
- 60 requests per minute
- 1,500 requests per day

**Dashboard Usage:**
- Each dashboard view = 2 API calls (advice + insights)
- Adding expense = 1 API call (categorization)

**Tip**: If you hit quota limits, the app will fall back to rule-based AI for categorization, but dashboard cards won't appear.

### Still Not Working?

1. **Check API Key Validity**:
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Verify your key is active
   - Try generating a new key

2. **Test API Key Manually**:
   ```javascript
   // In browser console
   const { GoogleGenerativeAI } = await import('@google/generative-ai');
   const genAI = new GoogleGenerativeAI('YOUR_API_KEY');
   const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
   const result = await model.generateContent('Hello');
   console.log(result.response.text());
   ```

3. **Restart Dev Server**:
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

4. **Check for JavaScript Errors**:
   - Open Console tab
   - Look for red error messages
   - Share them for debugging

### Success Checklist

- [ ] API key added in Settings
- [ ] "✅ Gemini AI Active" badge visible
- [ ] Monthly income set
- [ ] At least 1 expense added
- [ ] No errors in browser console
- [ ] Internet connection working
- [ ] Waited 2-3 seconds on Dashboard
- [ ] Gemini cards visible with purple/pink gradients

### Need More Help?

If you've tried all steps and it's still not working:

1. Share the browser console errors
2. Check the Network tab for failed requests
3. Verify the API key works in Google AI Studio
4. Try with a fresh browser/incognito mode

---

**Last Updated**: April 5, 2026  
**Version**: 1.0