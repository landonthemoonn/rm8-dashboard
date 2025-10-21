import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Plus, ExternalLink, Users, Download } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { format } from 'date-fns';

interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  time?: string;
  description?: string;
  type: 'house' | 'personal';
  attendees: string[];
  color: string;
  createdBy: string;
}

const roommates = [
  { id: 'alex', name: 'Alex', color: '#ff2d95' },
  { id: 'jordan', name: 'Jordan', color: '#ff6bb5' },
  { id: 'sam', name: 'Sam', color: '#ffa0d0' },
];

export function SharedCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: 'Landlord Inspection',
      date: new Date(2025, 9, 15, 14, 0),
      time: '2:00 PM',
      description: 'Annual apartment inspection',
      type: 'house',
      attendees: ['alex', 'jordan', 'sam'],
      color: '#ff2d95',
      createdBy: 'Alex',
    },
    {
      id: 2,
      title: 'Grocery Run',
      date: new Date(2025, 9, 13, 18, 0),
      time: '6:00 PM',
      description: 'Weekly Costco trip',
      type: 'house',
      attendees: ['jordan', 'sam'],
      color: '#ff6bb5',
      createdBy: 'Jordan',
    },
    {
      id: 3,
      title: 'Game Night',
      date: new Date(2025, 9, 16, 20, 0),
      time: '8:00 PM',
      description: 'Board games and pizza!',
      type: 'house',
      attendees: ['alex', 'jordan', 'sam'],
      color: '#ffa0d0',
      createdBy: 'Sam',
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: new Date(),
    time: '',
    description: '',
    type: 'house' as 'house' | 'personal',
    attendees: [] as string[],
    createdBy: '',
  });

  const eventsForSelectedDate = selectedDate
    ? events.filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getDate() === selectedDate.getDate() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getFullYear() === selectedDate.getFullYear()
        );
      })
    : [];

  const addEvent = () => {
    if (newEvent.title && newEvent.createdBy) {
      const creator = roommates.find((r) => r.id === newEvent.createdBy);
      if (!creator) return;

      const event: CalendarEvent = {
        id: Date.now(),
        title: newEvent.title,
        date: newEvent.date,
        time: newEvent.time,
        description: newEvent.description,
        type: newEvent.type,
        attendees: newEvent.attendees,
        color: creator.color,
        createdBy: creator.name,
      };

      setEvents([...events, event]);
      setNewEvent({
        title: '',
        date: new Date(),
        time: '',
        description: '',
        type: 'house',
        attendees: [],
        createdBy: '',
      });
      setDialogOpen(false);
    }
  };

  const handleGoogleCalendarSync = () => {
    alert('In production, this would sync with Google Calendar API to add events to your personal calendar!');
  };

  const handleExportCalendar = () => {
    alert('In production, this would export the calendar as an .ics file for import into any calendar app!');
  };

  // Get dates with events for calendar highlighting
  const datesWithEvents = events.map((e) => e.date);

  return (
    <>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="rounded-3xl p-6"
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
            <h2 className="text-white">Shared Calendar</h2>
          </div>

          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                variant="outline"
                onClick={handleGoogleCalendarSync}
                className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ExternalLink size={14} className="mr-1" />
                Sync Google
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                variant="outline"
                onClick={handleExportCalendar}
                className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Download size={14} className="mr-1" />
                Export
              </Button>
            </motion.div>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calendar */}
          <div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-xl bg-white/5 border border-white/10 p-3"
              modifiers={{
                hasEvent: datesWithEvents,
              }}
              modifiersStyles={{
                hasEvent: {
                  background: 'rgba(255, 45, 149, 0.2)',
                  borderRadius: '8px',
                },
              }}
            />
          </div>

          {/* Events List */}
          <div>
            <h3 className="text-white mb-4">
              {selectedDate
                ? format(selectedDate, 'EEEE, MMMM d')
                : 'Select a date'}
            </h3>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {eventsForSelectedDate.length > 0 ? (
                eventsForSelectedDate.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="rounded-2xl p-4"
                    style={{
                      background: `${event.color}15`,
                      border: `1px solid ${event.color}30`,
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-white">{event.title}</h4>
                      {event.type === 'house' && (
                        <Badge
                          className="rounded-full px-2 py-1 border-0"
                          style={{
                            background: `${event.color}30`,
                            color: event.color,
                          }}
                        >
                          <Users size={12} className="mr-1" />
                          House
                        </Badge>
                      )}
                    </div>

                    {event.time && (
                      <p className="text-white/70 text-sm mb-2">🕐 {event.time}</p>
                    )}

                    {event.description && (
                      <p className="text-white/60 text-sm mb-3">{event.description}</p>
                    )}

                    <div className="flex items-center gap-2">
                      <span className="text-white/50 text-xs">
                        Created by {event.createdBy}
                      </span>
                      {event.attendees.length > 0 && (
                        <>
                          <span className="text-white/30">•</span>
                          <span className="text-white/50 text-xs">
                            {event.attendees.length} attending
                          </span>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-white/50 text-sm">No events scheduled</p>
                </div>
              )}
            </div>
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

      {/* Add Event Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[var(--glass-bg)] border-[var(--glass-border)] text-white backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-white">Add Calendar Event</DialogTitle>
            <DialogDescription className="text-white/70">
              Create a new event for the shared calendar
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Input
              placeholder="Event title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                type="date"
                value={newEvent.date.toISOString().split('T')[0]}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: new Date(e.target.value) })
                }
                className="bg-white/10 border-white/20 text-white"
              />
              <Input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <Textarea
              placeholder="Description (optional)"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              className="bg-white/10 border-white/20 text-white min-h-[80px]"
            />

            <Select
              value={newEvent.type}
              onValueChange={(value) =>
                setNewEvent({ ...newEvent, type: value as 'house' | 'personal' })
              }
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Event type" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--glass-bg)] border-[var(--glass-border)] text-white backdrop-blur-xl">
                <SelectItem value="house">🏠 House Event</SelectItem>
                <SelectItem value="personal">👤 Personal</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={newEvent.createdBy}
              onValueChange={(value) => setNewEvent({ ...newEvent, createdBy: value })}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Created by" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--glass-bg)] border-[var(--glass-border)] text-white backdrop-blur-xl">
                {roommates.map((roommate) => (
                  <SelectItem key={roommate.id} value={roommate.id}>
                    {roommate.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={addEvent}
              disabled={!newEvent.title || !newEvent.createdBy}
              className="w-full bg-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/80"
            >
              Create Event
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
