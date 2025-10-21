# 🚀 Quick Start Guide - Enhanced Features

Congratulations! Your dashboard has been upgraded with:
- ✅ **Real Gemini AI integration**
- ✅ **Google Calendar sync**
- ✅ **Improved flow and layout**
- ✅ **Production-ready build**

---

## 🎯 What's New?

### 1. Gemini AI-Powered Assistant
Your AI assistant now uses Google's Gemini AI for intelligent, contextual responses instead of hardcoded replies.

### 2. Google Calendar Integration
View and sync your real calendar events directly in the dashboard.

### 3. Enhanced Components
- New `EnhancedCalendar` component with beautiful UI
- Improved AI chat interface
- Better error handling

---

## ⚡ Quick Setup (5 Minutes)

### Step 1: Get Your API Keys

**Gemini AI (Required for AI features):**
1. Visit: https://makersuite.google.com/app/apikey
2. Click "Get API Key" → "Create API key"
3. Copy the key (starts with `AIza...`)

**Google Calendar (Optional but recommended):**
1. Visit: https://console.cloud.google.com/
2. Create/select a project
3. Enable "Google Calendar API"
4. Create credentials → "API Key"
5. Copy the key

### Step 2: Configure Environment

Create a `.env.local` file in your project root:

```bash
# Quick command to create the file:
cat > .env.local << 'EOF'
# Gemini AI
VITE_GEMINI_API_KEY=AIza_your_gemini_key_here

# Google Calendar
VITE_GOOGLE_API_KEY=AIza_your_google_key_here
VITE_GOOGLE_CALENDAR_ID=your_email@gmail.com

# Feature flags
VITE_ENABLE_AI_ASSISTANT=true
VITE_ENABLE_CALENDAR_SYNC=true
EOF
```

**Replace the placeholder keys with your actual keys!**

### Step 3: Run the App

```bash
# Install dependencies (if you haven't already)
npm install

# Start development server
npm run dev
```

Open http://localhost:3000 and test it out!

---

## 🧪 Testing Your Setup

### Test AI Assistant:
1. Click on the AI Assistant
2. Ask: "Tell me a creative story about roommates"
3. You should get a unique Gemini-powered response!

### Test Calendar:
1. Scroll to the calendar section
2. You should see your Google Calendar events
3. Or mock events if API key isn't configured

---

## 📂 New Files Added

```
src/
├── services/
│   ├── geminiService.ts          # Gemini AI integration
│   └── googleCalendarService.ts  # Google Calendar API
├── components/
│   └── EnhancedCalendar.tsx      # New calendar widget
└── ...

Root:
├── API_SETUP_GUIDE.md            # Detailed API setup
├── QUICK_START.md                # This file
└── .env.example                   # Updated with API keys
```

---

## 🎨 Using the Features

### AI Assistant

The AI now responds intelligently to any question:

```
You: "What's the weather like for a house party?"
AI: <Gemini-powered contextual response>

You: "Help me plan a grocery list for 4 people"
AI: <Intelligent suggestions based on Gemini>
```

### Google Calendar

- **View events**: Automatically shows upcoming house events
- **Beautiful UI**: Each event has color coding and attendee avatars
- **Real-time**: Refresh to get latest events
- **Time display**: Shows "Today", "Tomorrow", or actual dates

---

## 🔒 Security Best Practices

1. **Never commit `.env.local`** - it's gitignored automatically
2. **Restrict API keys** in Google Cloud Console:
   - Set HTTP referrer restrictions
   - Limit to specific APIs
3. **Use environment variables** in deployment platforms:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables

---

## 🚀 Deployment

### With API Keys on Vercel:

```bash
# 1. Deploy
vercel

# 2. Add environment variables in Vercel Dashboard:
# Project Settings → Environment Variables
# Add: VITE_GEMINI_API_KEY, VITE_GOOGLE_API_KEY, etc.

# 3. Redeploy
vercel --prod
```

### With API Keys on Netlify:

```bash
# 1. Deploy
netlify deploy --prod

# 2. Add environment variables in Netlify Dashboard:
# Site Settings → Environment Variables
# Add your keys

# 3. Trigger redeploy from dashboard
```

---

## 🐛 Troubleshooting

**AI not responding with Gemini?**
- Check console for "API key not found" warning
- Verify `.env.local` exists and has correct variable names
- Restart dev server: `npm run dev`

**Calendar not showing events?**
- Check Calendar ID is correct
- Make calendar public in Google Calendar settings
- Verify API is enabled in Google Cloud Console

**Build fails?**
- Run `npm install` again
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build`

---

## 📚 More Information

- **Detailed API Setup**: See [API_SETUP_GUIDE.md](API_SETUP_GUIDE.md)
- **Deployment Guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **README**: See [README.md](README.md)

---

## ✨ What Works Without API Keys

Even without API keys, the app is fully functional with:
- Mock AI responses (contextual and helpful)
- Mock calendar events (example house events)
- All other dashboard features
- Full UI and animations

**But with API keys, you get:**
- Real AI intelligence from Gemini
- Your actual calendar events
- Truly personalized experience

---

## 🎉 You're Ready!

Your enhanced dashboard is ready to use. Enjoy the new AI-powered features!

**Next Steps:**
1. Get your API keys (5 min)
2. Add to `.env.local`
3. Test the features
4. Deploy to Vercel/Netlify
5. Share with your roommates!

---

*Need help? Check the troubleshooting section or review the detailed API setup guide.*
