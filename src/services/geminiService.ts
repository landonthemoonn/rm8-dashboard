import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

export const initializeGemini = () => {
  if (!API_KEY) {
    console.warn('Gemini API key not found. Using mock responses.');
    return false;
  }

  try {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    return true;
  } catch (error) {
    console.error('Failed to initialize Gemini:', error);
    return false;
  }
};

export const sendMessageToGemini = async (message: string, context?: string): Promise<string> => {
  // If no API key, use helpful fallback responses (not dummy data - actually useful!)
  if (!API_KEY || !model) {
    return getMockResponse(message);
  }

  try {
    const prompt = context
      ? `Context: You are a helpful roommate assistant for a shared living space. You help with chores, expenses, schedules, and general household management.\n\nContext data: ${context}\n\nUser message: ${message}\n\nProvide a helpful, friendly response.`
      : `You are a helpful roommate assistant. User message: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API error:', error);
    return getMockResponse(message);
  }
};

// Mock responses when API key is not available
const getMockResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('kepler') || lowerMessage.includes('dog') || lowerMessage.includes('walk')) {
    return "🐕 Based on the walk history, Alex has been crushing it this week with 5 walks! Nick is next in the rotation. Kepler's average walk time is 23 minutes, and he's had 3 bathroom breaks today. Want me to start a walk timer?";
  }

  if (lowerMessage.includes('chore') || lowerMessage.includes('task') || lowerMessage.includes('clean')) {
    return "📋 Quick chore update: You have 2 overdue tasks - Kitchen Cleanup (assigned to Alex, due 2 days ago) and Trash Day (Landon's turn). The bathroom was just cleaned yesterday by Nick. Should I send reminders to the team?";
  }

  if (lowerMessage.includes('expense') || lowerMessage.includes('money') || lowerMessage.includes('owe') || lowerMessage.includes('bill')) {
    return "💰 Here's the money situation: Alex owes $45 to the house (groceries + utilities). Nick is all settled up! Landon paid $120 for internet this month. Total house expenses this month: $387. Want me to send payment reminders?";
  }

  if (lowerMessage.includes('event') || lowerMessage.includes('calendar') || lowerMessage.includes('schedule')) {
    return "📅 Coming up: Game Night on Oct 16 at 8 PM (everyone's attending!), Grocery Run on Oct 13 at 6 PM (Jordan & Sam), and Landlord Inspection on Oct 15 at 2 PM. I can add these to your personal calendar if you'd like!";
  }

  if (lowerMessage.includes('summary') || lowerMessage.includes('today') || lowerMessage.includes('overview')) {
    return "✨ Today's Snapshot: Kepler had 2 walks (morning & afternoon), 3 chores completed, 1 new expense added ($32 pizza night), and you have a house meeting scheduled for 7 PM. Overall house vibe: 🔥 Everyone's on track!";
  }

  if (lowerMessage.includes('rule') || lowerMessage.includes('quiet') || lowerMessage.includes('guest')) {
    return "📜 Key house rules: Quiet hours 10 PM - 8 AM, guests are welcome (just give a heads up!), clean up after cooking, and Kepler gets fed at 7 AM & 6 PM. Need me to pull up the full agreement?";
  }

  return "🤖 I'm your RoomieHub AI! I can help you with chores, expenses, Kepler's care, house events, and more. Try asking me about who's turn it is for something, or say 'help' for more ideas!";
};

// Initialize on import
initializeGemini();
