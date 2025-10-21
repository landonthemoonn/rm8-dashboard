import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, User, Plus, Trash2, CalendarDays } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format, isSameDay, parseISO } from 'date-fns';

interface Walk {
  id: number;
  time: string;
  assignee: string;
  notes: string;
  date: Date;
  color: string;
}

interface DogWalkScheduleProps {
  isDialogOpen: boolean;
  onDialogClose: () => void;
}

export function DogWalkSchedule({ isDialogOpen, onDialogClose }: DogWalkScheduleProps) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [walks, setWalks] = useState<Walk[]>([
    { id: 1, time: '08:00', assignee: 'Alex', notes: 'Morning walk', date: today, color: '#ff2d95' },
    { id: 2, time: '14:00', assignee: 'Jordan', notes: 'Quick park visit', date: today, color: '#ff6bb5' },
    { id: 3, time: '19:00', assignee: 'Sam', notes: 'Long evening walk', date: today, color: '#ffa0d0' },
    { id: 4, time: '09:00', assignee: 'Jordan', notes: 'Weekend morning walk', date: tomorrow, color: '#ff6bb5' },
  ]);
  const [newWalk, setNewWalk] = useState({ time: '', assignee: '', notes: '', date: new Date() });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);

  const roommates = ['Alex', 'Jordan', 'Sam'];
  const colors = { Alex: '#ff2d95', Jordan: '#ff6bb5', Sam: '#ffa0d0' };

  const addWalk = () => {
    if (newWalk.time && newWalk.assignee && newWalk.date) {
      const walk: Walk = {
        id: Date.now(),
        time: newWalk.time,
        assignee: newWalk.assignee,
        notes: newWalk.notes,
        date: newWalk.date,
        color: colors[newWalk.assignee as keyof typeof colors],
      };
      setWalks([...walks, walk].sort((a, b) => {
        const dateCompare = a.date.getTime() - b.date.getTime();
        if (dateCompare !== 0) return dateCompare;
        return a.time.localeCompare(b.time);
      }));
      setNewWalk({ time: '', assignee: '', notes: '', date: new Date() });
      onDialogClose();
    }
  };

  const deleteWalk = (id: number) => {
    setWalks(walks.filter((walk) => walk.id !== id));
  };

  // Filter walks by selected date
  const filteredWalks = selectedDate
    ? walks.filter((walk) => isSameDay(walk.date, selectedDate))
    : walks;

  // Group walks by date
  const groupedWalks = walks.reduce((acc, walk) => {
    const dateKey = format(walk.date, 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(walk);
    return acc;
  }, {} as Record<string, Walk[]>);

  const sortedDates = Object.keys(groupedWalks).sort();

  return (
    <>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-3xl p-6 h-full"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 8px 32px 0 var(--neon-pink-glow)',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <CalendarIcon className="text-[var(--neon-pink)]" size={24} />
            <h2 className="text-white">Dog Walk Schedule</h2>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="bg-white/10 border-[var(--neon-pink)]/30 text-white hover:bg-white/20 transition-transform hover:scale-105 active:scale-95"
              >
                <CalendarDays className="mr-2" size={16} />
                {selectedDate ? format(selectedDate, 'MMM dd') : 'All dates'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[var(--glass-bg)] border-[var(--glass-border)] backdrop-blur-xl">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => setSelectedDate(date)}
                className="rounded-xl"
              />
              <div className="p-2 border-t border-white/10">
                <Button
                  variant="ghost"
                  className="w-full text-white hover:bg-white/10"
                  onClick={() => setSelectedDate(undefined)}
                >
                  Show all dates
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {selectedDate ? (
            // Single date view
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div
                  className="h-1 flex-1 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, var(--neon-pink), transparent)',
                  }}
                />
                <p className="text-white/70 text-sm">{format(selectedDate, 'EEEE, MMMM d')}</p>
                <div
                  className="h-1 flex-1 rounded-full"
                  style={{
                    background: 'linear-gradient(270deg, var(--neon-pink), transparent)',
                  }}
                />
              </div>
              <AnimatePresence>
                {filteredWalks.length === 0 ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white/50 text-center py-8"
                  >
                    No walks scheduled for this day
                  </motion.p>
                ) : (
                  filteredWalks.map((walk, index) => (
                    <WalkCard
                      key={walk.id}
                      walk={walk}
                      index={index}
                      onDelete={deleteWalk}
                    />
                  ))
                )}
              </AnimatePresence>
            </div>
          ) : (
            // All dates grouped view
            sortedDates.map((dateKey) => {
              const date = parseISO(dateKey);
              const dateWalks = groupedWalks[dateKey];
              return (
                <div key={dateKey}>
                  <div className="mb-3 flex items-center gap-2">
                    <div
                      className="h-1 flex-1 rounded-full"
                      style={{
                        background: 'linear-gradient(90deg, var(--neon-pink), transparent)',
                      }}
                    />
                    <p className="text-white/70 text-sm">{format(date, 'EEEE, MMM d')}</p>
                    <div
                      className="h-1 flex-1 rounded-full"
                      style={{
                        background: 'linear-gradient(270deg, var(--neon-pink), transparent)',
                      }}
                    />
                  </div>
                  <div className="space-y-3 mb-4">
                    <AnimatePresence>
                      {dateWalks.map((walk, index) => (
                        <WalkCard
                          key={walk.id}
                          walk={walk}
                          index={index}
                          onDelete={deleteWalk}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })
          )}
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

      <Dialog open={isDialogOpen} onOpenChange={onDialogClose}>
        <DialogContent className="bg-[var(--glass-bg)] border-[var(--glass-border)] text-white backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-white">Add New Walk</DialogTitle>
            <DialogDescription className="text-white/70">
              Schedule a new dog walk with a specific date and time.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <CalendarIcon className="mr-2" size={16} />
                  {newWalk.date ? format(newWalk.date, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[var(--glass-bg)] border-[var(--glass-border)] backdrop-blur-xl">
                <Calendar
                  mode="single"
                  selected={newWalk.date}
                  onSelect={(date) => date && setNewWalk({ ...newWalk, date })}
                  className="rounded-xl"
                />
              </PopoverContent>
            </Popover>
            <Input
              type="time"
              placeholder="Time"
              value={newWalk.time}
              onChange={(e) => setNewWalk({ ...newWalk, time: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
            />
            <Select
              value={newWalk.assignee}
              onValueChange={(value) => setNewWalk({ ...newWalk, assignee: value })}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select roommate" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--glass-bg)] border-[var(--glass-border)] text-white backdrop-blur-xl">
                {roommates.map((roommate) => (
                  <SelectItem key={roommate} value={roommate}>
                    {roommate}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Notes (optional)"
              value={newWalk.notes}
              onChange={(e) => setNewWalk({ ...newWalk, notes: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
            />
            <Button
              onClick={addWalk}
              className="w-full bg-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/80"
            >
              Add Walk
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface WalkCardProps {
  walk: Walk;
  index: number;
  onDelete: (id: number) => void;
}

function WalkCard({ walk, index, onDelete }: WalkCardProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 300 }}
      whileHover={{ scale: 1.02, x: 4 }}
      className="relative p-4 rounded-2xl overflow-hidden group"
      style={{
        background: `${walk.color}15`,
        border: `1px solid ${walk.color}30`,
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${walk.color}20, transparent)`,
        }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-white/70" size={16} />
            <span className="text-white">
              {format(parseISO(`2000-01-01T${walk.time}`), 'h:mm a')}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <User className="text-white/70" size={16} />
            <span
              className="px-2 py-1 rounded-full text-sm"
              style={{
                background: `${walk.color}30`,
                color: walk.color,
              }}
            >
              {walk.assignee}
            </span>
          </div>
          {walk.notes && (
            <p className="text-white/60 text-sm mt-2">{walk.notes}</p>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDelete(walk.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-white/10"
        >
          <Trash2 className="text-red-400" size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
}
