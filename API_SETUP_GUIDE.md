# API Setup Guide

This guide will help you set up the Gemini AI and Google Calendar integrations for your dashboard.

## 🤖 Part 1: Google Gemini AI Setup

The AI Assistant now uses Google's Gemini API for intelligent responses.

### Step 1: Get Your Gemini API Key

1. Go to **[Google AI Studio](https://makersuite.google.com/app/apikey)**
2. Click "Get API Key" or "Create API Key"
3. Select "Create API key in new project" (or use existing project)
4. Copy the API key (it starts with `AIza...`)

### Step 2: Add to Your Project

1. Create a file named `.env.local` in your project root:
   ```bash
   touch .env.local
   ```

2. Add your API key:
   ```env
   VITE_GEMINI_API_KEY=AIzaSy...your_actual_key_here
   ```

3. That's it! The AI will now use Gemini for responses.

### Without API Key

If you don't add an API key, the app will work with fallback mock responses (current behavior).

---

## 📅 Part 2: Google Calendar Integration

Connect your Google Calendar to sync real events.

### Option A: Read-Only Access (Simple - No Backend Needed)

This is perfect for viewing calendar events on your dashboard.

#### Step 1: Enable Google Calendar API

1. Go to **[Google Cloud Console](https://console.cloud.google.com/)**
2. Create a new project or select existing one
3. Navigate to **"APIs & Services" → "Library"**
4. Search for "Google Calendar API"
5. Click **"Enable"**

#### Step 2: Create API Key

1. Go to **"APIs & Services" → "Credentials"**
2. Click **"+ CREATE CREDENTIALS"** → "API Key"
3. Copy your API key
4. (Recommended) Click "Edit" and restrict the key:
   - Application restrictions: HTTP referrers
   - API restrictions: Google Calendar API only

#### Step 3: Make Your Calendar Public (Optional)

To read events without OAuth:

1. Open **[Google Calendar](https://calendar.google.com/)**
2. Click settings (gear icon) → **Settings**
3. Select your calendar from the left sidebar
4. Scroll to **"Access permissions"**
5. Check **"Make available to public"**
6. Copy the **Calendar ID** (usually your email or ends with `@group.calendar.google.com`)

#### Step 4: Add to Your Project

Add to your `.env.local`:
```env
VITE_GOOGLE_API_KEY=AIzaSy...your_actual_key_here
VITE_GOOGLE_CALENDAR_ID=your_calendar_id@gmail.com
```

### Option B: Full Access (Advanced - Requires Backend)

For creating/editing events, you need OAuth2 which requires a backend server.

**This is beyond the scope of the current setup**, but here's what you'd need:

1. Create OAuth 2.0 Client ID credentials
2. Set up a backend server to handle OAuth flow
3. Store and refresh access tokens securely
4. Make authenticated requests to Calendar API

---

## 🔧 Quick Setup Steps (TL;DR)

### For AI Only:

```bash
# 1. Get Gemini API key from https://makersuite.google.com/app/apikey
# 2. Create .env.local file
echo "VITE_GEMINI_API_KEY=your_key_here" > .env.local
# 3. Restart dev server
npm run dev
```

### For AI + Calendar:

```bash
# 1. Get both API keys
# 2. Create .env.local file
cat > .env.local << 'EOF'
VITE_GEMINI_API_KEY=AIza...your_gemini_key
VITE_GOOGLE_API_KEY=AIza...your_google_key
VITE_GOOGLE_CALENDAR_ID=your_calendar@gmail.com
VITE_ENABLE_AI_ASSISTANT=true
VITE_ENABLE_CALENDAR_SYNC=true
EOF

# 3. Restart dev server
npm run dev
```

---

## 🎯 Testing Your Setup

### Test Gemini AI:

1. Open the app
2. Open the AI Assistant
3. Send a message like "Tell me a joke"
4. You should get a Gemini-powered response!

### Test Calendar Integration:

1. Look for the "Shared Calendar" section
2. You should see your upcoming events
3. If using mock data, you'll see example events

---

## 🚨 Troubleshooting

### "API key not found" Warning

- Check your `.env.local` file exists
- Verify the variable names start with `VITE_`
- Restart your dev server after adding env variables

### Calendar Events Not Showing

- Verify your Calendar ID is correct
- Make sure the calendar is public (or you're using OAuth)
- Check browser console for errors
- Try the Calendar ID `primary` for your main calendar

### CORS Errors

- Google Calendar API may have CORS restrictions
- Add your domain to API restrictions in Google Cloud Console
- For localhost, use: `http://localhost:3000`

### Rate Limiting

- Free tier has limits:
  - Gemini: 60 requests/minute
  - Calendar API: Varies by quota
- For production, consider upgrading or implementing caching

---

## 💡 Pro Tips

1. **Never commit `.env.local` to git** - it's already in `.gitignore`
2. **Use environment variables in Vercel/Netlify** for production
3. **Restrict API keys** in Google Cloud Console for security
4. **Monitor usage** in Google Cloud Console
5. **Consider caching** calendar events to reduce API calls

---

## 📚 Helpful Links

- [Gemini API Docs](https://ai.google.dev/docs)
- [Google Calendar API Docs](https://developers.google.com/calendar/api)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

## 🎉 You're All Set!

Your dashboard now has:
- ✅ Real AI-powered assistant
- ✅ Google Calendar integration
- ✅ Production-ready setup

Enjoy your enhanced roommate dashboard! 🏠
