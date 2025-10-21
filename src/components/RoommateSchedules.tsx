import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Briefcase, Book, Coffee, Moon, Sun, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface ScheduleEvent {
  id: number;
  person: string;
  personColor: string;
  title: string;
  startTime: string;
  endTime: string;
  type: 'work' | 'class' | 'meeting' | 'personal' | 'therapy' | 'group' | 'other';
  day: string;
  recurring: boolean;
  notes?: string;
}

const roommates = [
  { id: 'nick', name: 'Nick', color: '#ff2d95' },
  { id: 'alex', name: 'Alex', color: '#ff6bb5' },
  { id: 'landon', name: 'Landon', color: '#ffa0d0' },
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const eventTypeConfig = {
  work: { icon: Briefcase, label: 'Work', color: '#3b82f6' },
  class: { icon: Book, label: 'Class', color: '#8b5cf6' },
  meeting: { icon: Coffee, label: 'Meeting', color: '#10b981' },
  personal: { icon: Sun, label: 'Personal', color: '#f59e0b' },
  therapy: { icon: Coffee, label: 'Therapy', color: '#ec4899' },
  group: { icon: Coffee, label: 'Group', color: '#06b6d4' },
  other: { icon: Clock, label: 'Other', color: '#6b7280' },
};

export function RoommateSchedules() {
  const [selectedDay, setSelectedDay] = useState(days[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [scheduleEvents, setScheduleEvents] = useState<ScheduleEvent[]>([
    // Nick's Schedule
    { id: 1, person: 'Nick', personColor: '#ff2d95', title: 'Work', startTime: '09:00', endTime: '17:00', type: 'work', day: 'Monday', recurring: true },
    { id: 2, person: 'Nick', personColor: '#ff2d95', title: 'Work', startTime: '09:00', endTime: '17:00', type: 'work', day: 'Tuesday', recurring: true },
    { id: 3, person: 'Nick', personColor: '#ff2d95', title: 'Work', startTime: '09:00', endTime: '17:00', type: 'work', day: 'Wednesday', recurring: true },
    { id: 4, person: 'Nick', personColor: '#ff2d95', title: 'Work', startTime: '09:00', endTime: '17:00', type: 'work', day: 'Thursday', recurring: true },
    { id: 5, person: 'Nick', personColor: '#ff2d95', title: 'Work', startTime: '09:00', endTime: '17:00', type: 'work', day: 'Friday', recurring: true },
    
    // Alex's Schedule
    { id: 6, person: 'Alex', personColor: '#ff6bb5', title: 'Work', startTime: '10:00', endTime: '18:00', type: 'work', day: 'Monday', recurring: true },
    { id: 7, person: 'Alex', personColor: '#ff6bb5', title: 'Work', startTime: '10:00', endTime: '18:00', type: 'work', day: 'Wednesday', recurring: true },
    { id: 8, person: 'Alex', personColor: '#ff6bb5', title: 'Work', startTime: '10:00', endTime: '18:00', type: 'work', day: 'Friday', recurring: true },
    { id: 9, person: 'Alex', personColor: '#ff6bb5', title: 'Gym', startTime: '19:00', endTime: '20:30', type: 'personal', day: 'Tuesday', recurring: true },
    { id: 10, person: 'Alex', personColor: '#ff6bb5', title: 'Gym', startTime: '19:00', endTime: '20:30', type: 'personal', day: 'Thursday', recurring: true },
    
    // Landon's Schedule
    { id: 11, person: 'Landon', personColor: '#ffa0d0', title: 'Job Search', startTime: '09:00', endTime: '12:00', type: 'work', day: 'Monday', recurring: true, notes: 'Applications & networking' },
    { id: 12, person: 'Landon', personColor: '#ffa0d0', title: 'Express Yourself Group', startTime: '18:00', endTime: '19:30', type: 'group', day: 'Monday', recurring: true },
    { id: 13, person: 'Landon', personColor: '#ffa0d0', title: 'Therapy', startTime: '14:00', endTime: '15:00', type: 'therapy', day: 'Tuesday', recurring: true },
    { id: 14, person: 'Landon', personColor: '#ffa0d0', title: 'Job Search', startTime: '09:00', endTime: '12:00', type: 'work', day: 'Wednesday', recurring: true },
    { id: 15, person: 'Landon', personColor: '#ffa0d0', title: 'Therapy', startTime: '14:00', endTime: '15:00', type: 'therapy', day: 'Thursday', recurring: true },
    { id: 16, person: 'Landon', personColor: '#ffa0d0', title: 'Job Search', startTime: '09:00', endTime: '12:00', type: 'work', day: 'Friday', recurring: true },
    { id: 17, person: 'Landon', personColor: '#ffa0d0', title: 'Texas Trip', startTime: '00:00', endTime: '23:59', type: 'personal', day: 'Monday', recurring: false, notes: 'Oct 14-21' },
  ]);

  const [newEvent, setNewEvent] = useState({
    person: '',
    title: '',
    startTime: '',
    endTime: '',
    type: 'other' as ScheduleEvent['type'],
    day: selectedDay,
    recurring: true,
    notes: '',
  });

  const addEvent = () => {
    if (newEvent.person && newEvent.title && newEvent.startTime && newEvent.endTime) {
      const person = roommates.find((r) => r.id === newEvent.person);
      if (!person) return;

      const event: ScheduleEvent = {
        id: Date.now(),
        person: person.name,
        personColor: person.color,
        title: newEvent.title,
        startTime: newEvent.startTime,
        endTime: newEvent.endTime,
        type: newEvent.type,
        day: newEvent.day,
        recurring: newEvent.recurring,
        notes: newEvent.notes,
      };

      setScheduleEvents([...scheduleEvents, event]);
      setNewEvent({
        person: '',
        title: '',
        startTime: '',
        endTime: '',
        type: 'other',
        day: selectedDay,
        recurring: true,
        notes: '',
      });
      setDialogOpen(false);
    }
  };

  const eventsForSelectedDay = scheduleEvents.filter((event) => event.day === selectedDay);

  const nextDay = () => {
    const currentIndex = days.indexOf(selectedDay);
    const nextIndex = (currentIndex + 1) % days.length;
    setSelectedDay(days[nextIndex]);
  };

  const prevDay = () => {
    const currentIndex = days.indexOf(selectedDay);
    const prevIndex = currentIndex === 0 ? days.length - 1 : currentIndex - 1;
    setSelectedDay(days[prevIndex]);
  };

  // Group events by person for timeline view
  const eventsByPerson = roommates.map((roommate) => ({
    ...roommate,
    events: eventsForSelectedDay
      .filter((event) => event.person === roommate.name)
      .sort((a, b) => a.startTime.localeCompare(b.startTime)),
  }));

  return (
    <>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-3xl p-6 mb-6"
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
            <Calendar className="text-[var(--neon-pink)]" size={24} />
            <h2 className="text-white">Weekly Schedules</h2>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="sm"
              onClick={() => setDialogOpen(true)}
              className="rounded-full bg-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/80 border-0"
            >
              <Plus size={14} className="mr-1" />
              Add Event
            </Button>
          </motion.div>
        </div>

        {/* Day Selector */}
        <div className="flex items-center justify-between mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevDay}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {days.map((day) => (
              <motion.button
                key={day}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-xl transition-all ${
                  selectedDay === day
                    ? 'bg-[var(--neon-pink)] text-white shadow-lg'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
                style={
                  selectedDay === day
                    ? {
                        boxShadow: '0 0 20px var(--neon-pink-glow)',
                      }
                    : {}
                }
              >
                <div className="text-sm">{day.slice(0, 3)}</div>
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextDay}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        {/* Timeline View */}
        <div className="space-y-6">
          {eventsByPerson.map((person, personIndex) => (
            <motion.div
              key={person.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: personIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: person.color,
                    boxShadow: `0 0 10px ${person.color}`,
                  }}
                />
                <h3 className="text-white">{person.name}</h3>
                <span className="text-white/50 text-sm">
                  {person.events.length} {person.events.length === 1 ? 'event' : 'events'}
                </span>
              </div>

              <div className="space-y-2 pl-6">
                {person.events.length > 0 ? (
                  person.events.map((event, eventIndex) => {
                    const typeConfig = eventTypeConfig[event.type];
                    const Icon = typeConfig.icon;

                    return (
                      <motion.div
                        key={event.id}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: personIndex * 0.1 + eventIndex * 0.05 }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        className="rounded-xl p-4 relative overflow-hidden group"
                        style={{
                          background: `${person.color}15`,
                          border: `1px solid ${person.color}30`,
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            background: `linear-gradient(135deg, ${person.color}20, transparent)`,
                          }}
                        />

                        <div className="relative z-10 flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div
                              className="p-2 rounded-lg mt-0.5"
                              style={{
                                background: `${typeConfig.color}30`,
                              }}
                            >
                              <Icon size={16} style={{ color: typeConfig.color }} />
                            </div>

                            <div className="flex-1">
                              <h4 className="text-white mb-1">{event.title}</h4>
                              <div className="flex items-center gap-3 text-sm text-white/70">
                                <span className="flex items-center gap-1">
                                  <Clock size={12} />
                                  {event.startTime} - {event.endTime}
                                </span>
                                {event.recurring && (
                                  <Badge className="bg-white/10 text-white/60 border-0 text-xs">
                                    Recurring
                                  </Badge>
                                )}
                              </div>
                              {event.notes && (
                                <p className="text-white/60 text-sm mt-2">{event.notes}</p>
                              )}
                            </div>
                          </div>

                          <Badge
                            className="border-0 text-xs"
                            style={{
                              background: `${typeConfig.color}30`,
                              color: typeConfig.color,
                            }}
                          >
                            {typeConfig.label}
                          </Badge>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-center py-6 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-white/50 text-sm">No events scheduled</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Add Event Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[var(--glass-bg)] border-[var(--glass-border)] text-white backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-white">Add Schedule Event</DialogTitle>
            <DialogDescription className="text-white/70">
              Add a new event to someone's schedule
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Select
              value={newEvent.person}
              onValueChange={(value) => setNewEvent({ ...newEvent, person: value })}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select person" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--glass-bg)] border-[var(--glass-border)] text-white backdrop-blur-xl">
                {roommates.map((roommate) => (
                  <SelectItem key={roommate.id} value={roommate.id}>
                    {roommate.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Event title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-white/70 text-sm mb-2 block">Start Time</label>
                <Input
                  type="time"
                  value={newEvent.startTime}
                  onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              <div>
                <label className="text-white/70 text-sm mb-2 block">End Time</label>
                <Input
                  type="time"
                  value={newEvent.endTime}
                  onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>

            <Select
              value={newEvent.day}
              onValueChange={(value) => setNewEvent({ ...newEvent, day: value })}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--glass-bg)] border-[var(--glass-border)] text-white backdrop-blur-xl">
                {days.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={newEvent.type}
              onValueChange={(value) =>
                setNewEvent({ ...newEvent, type: value as ScheduleEvent['type'] })
              }
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Event type" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--glass-bg)] border-[var(--glass-border)] text-white backdrop-blur-xl">
                {Object.entries(eventTypeConfig).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Textarea
              placeholder="Notes (optional)"
              value={newEvent.notes}
              onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
              className="bg-white/10 border-white/20 text-white min-h-[60px]"
            />

            <Button
              onClick={addEvent}
              disabled={!newEvent.person || !newEvent.title || !newEvent.startTime || !newEvent.endTime}
              className="w-full bg-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/80"
            >
              Add Event
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
