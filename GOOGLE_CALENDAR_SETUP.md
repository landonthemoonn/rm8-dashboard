# 📅 Google Calendar Setup Guide for RM8 Dashboard

This guide will help you set up a shared Google Calendar (`rm8dashboard@gmail.com`) that all your roommates can use.

---

## 🎯 **What You'll Accomplish**

- ✅ Create a shared `rm8dashboard@gmail.com` account
- ✅ Set up a shared roommate calendar
- ✅ Allow all roommates to view/add events
- ✅ Connect it to your dashboard
- ✅ Sync everyone's personal calendars (optional)

---

## 📝 **Part 1: Create the Shared Gmail Account**

### Step 1: Create Gmail Account

1. Go to https://accounts.google.com/signup
2. Fill in:
   - **First name:** RM8
   - **Last name:** Dashboard
   - **Username:** rm8dashboard (or variation if taken)
   - **Password:** Create a strong password (save it securely!)
3. Skip phone number (or add a recovery email)
4. Complete setup

🎉 **You now have:** `rm8dashboard@gmail.com`

---

## 📅 **Part 2: Set Up the Shared Calendar**

### Step 2: Create the Main House Calendar

1. **Sign in** to https://calendar.google.com with `rm8dashboard@gmail.com`
2. On the left sidebar, click **"+"** next to "Other calendars"
3. Select **"Create new calendar"**
4. Fill in:
   - **Name:** RM8 House Events
   - **Description:** Shared calendar for roommate activities, chores, and events
   - **Time zone:** Your timezone
5. Click **"Create calendar"**

### Step 3: Make Calendar Public (Option A - Simple)

**For a household dashboard, you can make it public:**

1. In calendar settings, find "Access permissions"
2. Check **"Make available to public"**
3. ✅ Anyone with the link can view events

**Security Note:** Events are public but only you can edit. Perfect for read-only dashboard display.

### Step 4: Share with Roommates (Option B - Private but Shared)

**For more privacy, share with specific people:**

1. In calendar settings, find "Share with specific people"
2. Click **"+ Add people"**
3. Add each roommate's email:
   - alex@gmail.com
   - nick@gmail.com
   - landon@gmail.com
   - etc.
4. Set permissions for each:
   - **"Make changes to events"** - They can add/edit
   - **"See all event details"** - View only
5. Click **"Send"**

---

## 🔑 **Part 3: Get Your Calendar ID**

### Step 5: Find Calendar ID

1. Go to calendar settings
2. Scroll to **"Integrate calendar"**
3. Copy the **Calendar ID** (looks like: `rm8dashboard@gmail.com` or `abc123@group.calendar.google.com`)
4. **Save this!** You'll need it for the dashboard

---

## 🛠️ **Part 4: Get API Keys**

### Step 6: Create Google Cloud Project

1. Go to https://console.cloud.google.com/
2. Click **"Select a project"** → **"NEW PROJECT"**
3. Name it: `RM8 Dashboard`
4. Click **"Create"**

### Step 7: Enable Calendar API

1. In the project, go to **"APIs & Services"** → **"Library"**
2. Search for **"Google Calendar API"**
3. Click on it and click **"Enable"**

### Step 8: Create API Key

1. Go to **"APIs & Services"** → **"Credentials"**
2. Click **"+ CREATE CREDENTIALS"** → **"API Key"**
3. Copy the API key (starts with `AIza...`)
4. Click **"Edit API key"** to restrict it:
   - **Application restrictions:** HTTP referrers
   - Add: `http://localhost:3000/*`, `https://yourdomain.com/*`
   - **API restrictions:** Select "Google Calendar API"
5. Click **"Save"**

---

## 💻 **Part 5: Add to Your Dashboard**

### Step 9: Configure Environment Variables

Create `.env.local` in your dashboard project:

```env
# Google Calendar Integration
VITE_GOOGLE_API_KEY=AIza_your_api_key_here
VITE_GOOGLE_CALENDAR_ID=rm8dashboard@gmail.com
VITE_ENABLE_CALENDAR_SYNC=true
```

### Step 10: Restart and Test

```bash
npm run dev
```

Open http://localhost:3000 and check the calendar section!

---

## 👥 **Part 6: Invite Roommates to Add Events**

### Option A: Via Google Calendar

Each roommate can:
1. Open https://calendar.google.com
2. Accept the calendar share invite
3. Add events directly to "RM8 House Events" calendar

### Option B: Via Dashboard (Future Enhancement)

The dashboard will automatically show events from the shared calendar!

---

## 🔗 **Part 7: Link Personal Calendars (Optional)**

Want to see everyone's availability?

### Step 11: Subscribe to Each Other's Calendars

Each roommate can share their personal calendar:

1. In Google Calendar settings
2. Select personal calendar
3. Under "Access permissions":
   - Check **"Make available to public"** OR
   - Share with specific roommates
4. Copy the calendar ID
5. Others can add it via **"Add calendar"** → **"From URL"**

---

## 🎨 **What You Can Track**

Perfect events for your shared calendar:

- 🎉 **House Events:** Game nights, parties, dinners
- 🧹 **Chores:** Cleaning schedules, trash days
- 🐕 **Pet Care:** Vet appointments, grooming
- 🛒 **Shopping Trips:** Grocery runs, Costco trips
- 🏠 **House Maintenance:** Landlord visits, repairs
- 🎂 **Birthdays:** Roommate celebrations
- 📦 **Deliveries:** Package arrivals
- 🚗 **Shared Car:** Usage schedule

---

## 🔒 **Security Best Practices**

1. **Password:** Use a strong password for `rm8dashboard@gmail.com`
2. **Share credentials:** Keep the login info in a secure shared password manager (1Password, LastPass)
3. **API Keys:** Never commit `.env.local` to git (it's gitignored)
4. **Restrict API:** Always restrict API keys in Google Cloud Console
5. **Review access:** Periodically check who has calendar access

---

## 🚀 **Quick Setup Summary (TL;DR)**

```bash
# 1. Create account
# Go to gmail.com/signup
# Username: rm8dashboard

# 2. Create calendar
# Go to calendar.google.com
# Create "RM8 House Events"

# 3. Get API key
# console.cloud.google.com
# Enable Calendar API → Create API Key

# 4. Configure dashboard
cat > .env.local << 'EOF'
VITE_GOOGLE_API_KEY=your_api_key
VITE_GOOGLE_CALENDAR_ID=rm8dashboard@gmail.com
EOF

# 5. Run
npm run dev
```

---

## 🐛 **Troubleshooting**

### Can't see events in dashboard?

- ✅ Check calendar is public OR you've added the API key with OAuth
- ✅ Verify Calendar ID is correct
- ✅ Make sure Calendar API is enabled
- ✅ Check browser console for errors

### Roommates can't add events?

- ✅ Make sure you shared calendar with their emails
- ✅ They need to accept the share invite
- ✅ Check their permission level (Make changes to events)

### API quota exceeded?

- Free tier: 1,000,000 requests/day
- Dashboard only reads events, very low usage
- Implement caching if needed

---

## 🎉 **You're Done!**

Your shared calendar is now set up! All roommates can:

- ✅ View events on the dashboard
- ✅ Add events via Google Calendar
- ✅ Get notifications for upcoming events
- ✅ Sync to personal calendars

**Pro Tips:**
- Set up recurring events for regular chores
- Use color coding for different event types
- Add location/notes to events for more details
- Enable notifications for important events

---

## 📚 **Additional Resources**

- [Google Calendar Help](https://support.google.com/calendar)
- [Google Calendar API Docs](https://developers.google.com/calendar/api)
- [Dashboard API Setup](./API_SETUP_GUIDE.md)

---

**Need help?** Check the troubleshooting section or refer back to this guide anytime!
