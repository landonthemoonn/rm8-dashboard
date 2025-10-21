import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, X, Mic, Trash2, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import aiVisualization from 'figma:asset/1bb0f5f7427caf9f441d6df770f8114011261dde.png';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
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
  
  // Kepler/Dog walking related
  if (lowerMessage.includes('kepler') || lowerMessage.includes('dog') || lowerMessage.includes('walk')) {
    return "🐕 Based on the walk history, Alex has been crushing it this week with 5 walks! Nick is next in the rotation. Kepler's average walk time is 23 minutes, and he's had 3 bathroom breaks today. Want me to start a walk timer?";
  }
  
  // Chores related
  if (lowerMessage.includes('chore') || lowerMessage.includes('task') || lowerMessage.includes('clean')) {
    return "📋 Quick chore update: You have 2 overdue tasks - Kitchen Cleanup (assigned to Alex, due 2 days ago) and Trash Day (Landon's turn). The bathroom was just cleaned yesterday by Nick. Should I send reminders to the team?";
  }
  
  // Expenses/Money related
  if (lowerMessage.includes('expense') || lowerMessage.includes('money') || lowerMessage.includes('owe') || lowerMessage.includes('bill')) {
    return "💰 Here's the money situation: Alex owes $45 to the house (groceries + utilities). Nick is all settled up! Landon paid $120 for internet this month. Total house expenses this month: $387. Want me to send payment reminders?";
  }
  
  // Calendar/Events related
  if (lowerMessage.includes('event') || lowerMessage.includes('calendar') || lowerMessage.includes('schedule')) {
    return "📅 Coming up: Game Night on Oct 16 at 8 PM (everyone's attending!), Grocery Run on Oct 13 at 6 PM (Jordan & Sam), and Landlord Inspection on Oct 15 at 2 PM. I can add these to your personal calendar if you'd like!";
  }
  
  // Summary/Overview
  if (lowerMessage.includes('summary') || lowerMessage.includes('today') || lowerMessage.includes('overview')) {
    return "✨ Today's Snapshot: Kepler had 2 walks (morning & afternoon), 3 chores completed, 1 new expense added ($32 pizza night), and you have a house meeting scheduled for 7 PM. Overall house vibe: 🔥 Everyone's on track!";
  }
  
  // House rules
  if (lowerMessage.includes('rule') || lowerMessage.includes('quiet') || lowerMessage.includes('guest')) {
    return "📜 Key house rules: Quiet hours 10 PM - 8 AM, guests are welcome (just give a heads up!), clean up after cooking, and Kepler gets fed at 7 AM & 6 PM. Need me to pull up the full agreement?";
  }
  
  // Default helpful response
  return "🤖 I'm your RoomieHub AI! I can help you with chores, expenses, Kepler's care, house events, and more. Try asking me about who's turn it is for something, or say 'help' for more ideas!";
};

export function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: "👋 Hey there! I'm your RoomieHub AI Assistant. I know everything about your house - chores, expenses, Kepler's walks, and more. What can I help you with?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
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

    // Simulate AI thinking
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
    setTimeout(() => handleSendMessage(), 100);
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-24 right-6 z-50 w-[400px] max-h-[600px] rounded-3xl overflow-hidden shadow-2xl"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 8px 32px 0 rgba(255, 45, 149, 0.3)',
          }}
        >
          {/* Header */}
          <div
            className="p-4 border-b"
            style={{
              borderColor: 'var(--glass-border)',
              background: 'linear-gradient(135deg, rgba(255, 45, 149, 0.1) 0%, rgba(255, 107, 181, 0.05) 100%)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <Sparkles className="text-[var(--neon-pink)]" size={24} />
                </motion.div>
                <div>
                  <h3 className="text-white">RoomieHub AI</h3>
                  <div className="flex items-center gap-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-green-400"
                    />
                    <span className="text-white/60 text-xs">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleClearChat}
                    className="rounded-full h-8 w-8 bg-white/5 hover:bg-white/10 text-white border-0"
                  >
                    <RotateCcw size={14} />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={onClose}
                    className="rounded-full h-8 w-8 bg-white/5 hover:bg-white/10 text-white border-0"
                  >
                    <X size={16} />
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* AI Visualization */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative h-32 flex items-center justify-center overflow-hidden rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 45, 149, 0.1) 0%, rgba(0, 100, 255, 0.1) 100%)',
              }}
            >
              <img
                src={aiVisualization}
                alt="AI Visualization"
                className="h-full w-auto object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
          </div>

          {/* Messages */}
          <ScrollArea ref={scrollAreaRef} className="h-[280px] p-4">
            <div className="space-y-3">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-[var(--neon-pink)] text-white'
                        : 'bg-white/10 text-white border border-white/10'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <span className="text-xs opacity-60 mt-1 block">
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
                  <div className="bg-white/10 rounded-2xl px-4 py-3 border border-white/10">
                    <div className="flex items-center gap-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 rounded-full bg-[var(--neon-pink)]"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 rounded-full bg-[var(--neon-pink)]"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 rounded-full bg-[var(--neon-pink)]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Suggested Prompts */}
          {messages.length <= 2 && (
            <div className="px-4 pb-3">
              <p className="text-white/60 text-xs mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedPrompts.slice(0, 3).map((prompt, index) => (
                  <motion.div
                    key={prompt}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Badge
                      onClick={() => handlePromptClick(prompt)}
                      className="cursor-pointer rounded-full px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs"
                    >
                      {prompt}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div
            className="p-4 border-t"
            style={{
              borderColor: 'var(--glass-border)',
              background: 'rgba(0, 0, 0, 0.2)',
            }}
          >
            <div className="flex items-center gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-full"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="rounded-full bg-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/80 border-0"
                  style={{
                    boxShadow: inputValue.trim() ? '0 0 20px rgba(255, 45, 149, 0.5)' : 'none',
                  }}
                >
                  <Send size={16} />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function AIAssistantButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-40 rounded-full p-5 shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, var(--neon-pink) 0%, #ff6bb5 100%)',
        boxShadow: '0 8px 32px 0 rgba(255, 45, 149, 0.5)',
      }}
    >
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <Sparkles className="text-white" size={28} />
      </motion.div>
      
      {/* Pulse animation */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeOut',
        }}
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 45, 149, 0.8), transparent)',
        }}
      />
    </motion.button>
  );
}
