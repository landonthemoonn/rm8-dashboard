import { Home, ListChecks, DollarSign, Dog, Settings, Moon, Sun, Calendar, CheckSquare, Sparkles, CalendarClock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface NavigationProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onCalendarClick: () => void;
  onWeeklyCheckIn: () => void;
  onAIAssistant: () => void;
  onSchedulesClick: () => void;
}

export function Navigation({ darkMode, onToggleDarkMode, activeTab, onTabChange, onCalendarClick, onWeeklyCheckIn, onAIAssistant, onSchedulesClick }: NavigationProps) {
  const navItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: ListChecks, label: 'Tasks', id: 'tasks' },
    { icon: DollarSign, label: 'Finances', id: 'finances' },
    { icon: Dog, label: 'Kepler Care', id: 'dogwalks' },
    { icon: Settings, label: 'Agreement', id: 'settings' },
  ];

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl space-y-3">
      {/* Quick Action Buttons Row */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex items-center justify-center gap-3"
      >
        <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onWeeklyCheckIn}
            className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 px-6 py-6 shadow-lg"
            style={{
              boxShadow: '0 4px 20px rgba(34, 197, 94, 0.4)',
            }}
          >
            <CheckSquare size={18} className="mr-2" />
            Weekly Check-In
            <Badge className="ml-2 bg-white/20 border-0 text-white text-xs">New</Badge>
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onAIAssistant}
            className="rounded-full bg-gradient-to-r from-[var(--neon-pink)] to-purple-500 hover:from-[var(--neon-pink)]/80 hover:to-purple-600 text-white border-0 px-6 py-6 shadow-lg"
            style={{
              boxShadow: '0 4px 20px rgba(255, 45, 149, 0.5)',
            }}
          >
            <Sparkles size={18} className="mr-2" />
            AI Assistant
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onSchedulesClick}
            className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 px-6 py-6 shadow-lg"
            style={{
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
            }}
          >
            <CalendarClock size={18} className="mr-2" />
            Schedules
          </Button>
        </motion.div>
      </motion.div>

      {/* Main Navigation Bar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      >
        <div
          className="rounded-3xl px-6 py-4 flex items-center justify-between"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 8px 32px 0 rgba(255, 45, 149, 0.15)',
          }}
        >
          <div className="flex items-center gap-8">
            <motion.div
              className="text-white"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <h1 className="bg-gradient-to-r from-[var(--neon-pink)] to-pink-300 bg-clip-text text-transparent">
                RoomieHub
              </h1>
            </motion.div>

            <div className="flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <motion.button
                    key={item.label}
                    onClick={() => onTabChange(item.id)}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative p-3 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? 'bg-[var(--neon-pink)] shadow-lg'
                        : 'hover:bg-white/10'
                    }`}
                    style={
                      isActive
                        ? {
                            boxShadow:
                              '0 0 20px var(--neon-pink-glow), 0 0 40px var(--neon-pink-glow)',
                          }
                        : {}
                    }
                    aria-label={item.label}
                  >
                    <item.icon
                      className={isActive ? 'text-white' : 'text-white/70'}
                      size={20}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={onCalendarClick}
                className="rounded-full bg-white/10 hover:bg-white/20 text-white border-0"
                aria-label="Quick Calendar"
              >
                <Calendar size={20} />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleDarkMode}
                className="rounded-full bg-white/10 hover:bg-white/20 text-white border-0"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
