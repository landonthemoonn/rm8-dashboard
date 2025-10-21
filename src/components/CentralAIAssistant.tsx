import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, Mic, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedPrompts = [
  "Who's turn is it to walk Kepler?",
  "Show me this week's expenses",
  "What chores are overdue?",
  "When's the next house event?",
  "Summarize today's activities",
  "Who owes money to whom?",
];

const getAIResponse = (userMessage: string): string => {
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

export function CentralAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: "👋 Hey there! I'm your RoomieHub AI Assistant. Ask me anything about your house - chores, expenses, Kepler's walks, schedules, and more!",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    const timer = setTimeout(() => {
      const scrollContainer = document.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: getAIResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        role: 'assistant',
        content: "Chat cleared! What would you like to know?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`mx-auto rounded-3xl overflow-hidden transition-all duration-500 ${
        isExpanded ? 'max-w-5xl' : 'max-w-3xl'
      }`}
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        border: '1px solid var(--glass-border)',
        boxShadow: '0 8px 32px 0 rgba(255, 45, 149, 0.3)',
      }}
    >
      {/* AI Orb Visualization */}
      <div
        className="relative h-64 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 45, 149, 0.15) 0%, rgba(0, 100, 255, 0.15) 100%)',
        }}
      >
        {/* Animated Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 45, 149, 0.6), transparent)',
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(0, 100, 255, 0.5), transparent)',
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 107, 181, 0.4), transparent)',
          }}
        />

        {/* Central AI Icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="relative"
          >
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(255, 45, 149, 0.2)',
                border: '2px solid rgba(255, 45, 149, 0.5)',
                boxShadow: '0 0 40px rgba(255, 45, 149, 0.6), inset 0 0 30px rgba(255, 45, 149, 0.3)',
              }}
            >
              <Sparkles className="text-white" size={48} />
            </div>
          </motion.div>
        </div>

        {/* Header Info */}
        <div className="absolute top-6 left-6 flex items-center gap-3 z-10">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-3 h-3 rounded-full bg-green-400"
            style={{
              boxShadow: '0 0 10px rgba(74, 222, 128, 0.8)',
            }}
          />
          <div>
            <h2 className="text-white">RoomieHub AI</h2>
            <p className="text-white/60 text-sm">Your smart home assistant</p>
          </div>
        </div>

        {/* Actions */}
        <div className="absolute top-6 right-6 flex items-center gap-2 z-10">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="rounded-full h-9 w-9 bg-white/10 hover:bg-white/20 text-white border-0"
            >
              {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleClearChat}
              className="rounded-full h-9 w-9 bg-white/10 hover:bg-white/20 text-white border-0"
            >
              <RotateCcw size={16} />
            </Button>
          </motion.div>
        </div>

        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }} />
        </div>
      </div>

      {/* Messages */}
      <div className="p-6">
        <ScrollArea className={`${isExpanded ? 'h-[400px]' : 'h-[300px]'} mb-4`}>
          <div className="space-y-4 pr-4">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-4 ${
                    message.role === 'user'
                      ? 'bg-[var(--neon-pink)] text-white'
                      : 'bg-white/10 text-white border border-white/10'
                  }`}
                  style={
                    message.role === 'user'
                      ? { boxShadow: '0 4px 20px rgba(255, 45, 149, 0.4)' }
                      : {}
                  }
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <span className="text-xs opacity-60 mt-2 block">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-white/10 rounded-2xl px-5 py-4 border border-white/10">
                  <div className="flex items-center gap-1.5">
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2.5 h-2.5 rounded-full bg-[var(--neon-pink)]"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      className="w-2.5 h-2.5 rounded-full bg-[var(--neon-pink)]"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      className="w-2.5 h-2.5 rounded-full bg-[var(--neon-pink)]"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>

        {/* Suggested Prompts */}
        {messages.length <= 2 && (
          <div className="mb-4">
            <p className="text-white/60 text-sm mb-3">💡 Try asking:</p>
            <div className="grid grid-cols-2 gap-2">
              {suggestedPrompts.map((prompt, index) => (
                <motion.div
                  key={prompt}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Badge
                    onClick={() => handlePromptClick(prompt)}
                    className="cursor-pointer w-full justify-start rounded-xl px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm transition-all"
                  >
                    {prompt}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about your home..."
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-full pr-12 py-6"
            />
            <motion.div 
              className="absolute right-3 top-1/2 -translate-y-1/2"
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.9 }}
            >
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full h-8 w-8 bg-white/5 hover:bg-white/10 text-white/60 border-0"
              >
                <Mic size={16} />
              </Button>
            </motion.div>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="rounded-full h-12 w-12 bg-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/80 border-0"
              style={{
                boxShadow: inputValue.trim() ? '0 0 30px rgba(255, 45, 149, 0.6)' : 'none',
              }}
            >
              <Send size={20} />
            </Button>
          </motion.div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--neon-pink);
          border-radius: 10px;
        }
      `}</style>
    </motion.div>
  );
}
