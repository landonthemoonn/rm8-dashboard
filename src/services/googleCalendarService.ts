// Google Calendar Integration Service
// This uses the Google Calendar API to sync events

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  attendees?: string[];
  color?: string;
}

const CALENDAR_ID = import.meta.env.VITE_GOOGLE_CALENDAR_ID || 'primary';
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || '';

// For client-side, we'll use the Google Calendar API with API key
// For full OAuth flow, you'd need a backend server

export const getUpcomingEvents = async (maxResults = 10): Promise<CalendarEvent[]> => {
  if (!API_KEY) {
    console.warn('Google Calendar API key not found. No events to display.');
    return [];
  }

  try {
    const timeMin = new Date().toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${timeMin}&maxResults=${maxResults}&singleEvents=true&orderBy=startTime`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch calendar events');
    }

    const data = await response.json();
    return data.items.map((item: any) => ({
      id: item.id,
      title: item.summary || 'Untitled Event',
      description: item.description,
      start: new Date(item.start.dateTime || item.start.date),
      end: new Date(item.end.dateTime || item.end.date),
      attendees: item.attendees?.map((a: any) => a.email) || [],
      color: item.colorId,
    }));
  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return [];
  }
};

export const addCalendarEvent = async (event: Omit<CalendarEvent, 'id'>): Promise<boolean> => {
  if (!API_KEY) {
    console.log('Mock: Would add event:', event);
    return true;
  }

  // Note: Adding events requires OAuth2, which needs a backend
  // For now, we'll show how to structure the request
  console.log('To add events, set up OAuth2 authentication');
  return false;
};

// No mock events - clean start!

// Helper to format events for display
export const formatEventTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const formatEventDate = (date: Date): string => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
};
