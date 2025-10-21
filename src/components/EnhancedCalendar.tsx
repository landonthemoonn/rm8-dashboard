import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, Plus, Clock, Users, MapPin } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  getUpcomingEvents,
  formatEventTime,
  formatEventDate,
  type CalendarEvent
} from '../services/googleCalendarService';

export function EnhancedCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const upcomingEvents = await getUpcomingEvents(10);
      setEvents(upcomingEvents);
    } catch (error) {
      console.error('Error loading calendar events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEventColor = (color?: string) => {
    const colors: Record<string, string> = {
      '#FF2D95': 'from-pink-500 to-pink-600',
      '#4CAF50': 'from-green-500 to-green-600',
      '#2196F3': 'from-blue-500 to-blue-600',
      '#FF9800': 'from-orange-500 to-orange-600',
    };
    return colors[color || ''] || 'from-purple-500 to-purple-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="bg-white/5 backdrop-blur-xl border-white/10 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                <CalendarIcon className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Shared Calendar</h2>
                <p className="text-white/60 text-sm">Upcoming house events</p>
              </div>
            </div>
            <Button
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              size="sm"
            >
              <Plus size={16} className="mr-2" />
              Add Event
            </Button>
          </div>
        </div>

        {/* Events List */}
        <div className="p-6 space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pink-500 border-t-transparent"></div>
              <p className="text-white/60 mt-4">Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-12">
              <CalendarIcon className="mx-auto text-white/20" size={48} />
              <p className="text-white/60 mt-4">No upcoming events</p>
              <Button
                className="mt-4 bg-white/10 hover:bg-white/20"
                size="sm"
              >
                Add your first event
              </Button>
            </div>
          ) : (
            events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white/5 hover:bg-white/10 rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all cursor-pointer">
                  <div className="flex items-start gap-4">
                    {/* Date Badge */}
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${getEventColor(event.color)} flex flex-col items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-xs font-semibold">
                        {event.start.toLocaleDateString([], { month: 'short' })}
                      </span>
                      <span className="text-white text-2xl font-bold">
                        {event.start.getDate()}
                      </span>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-semibold text-lg mb-1 truncate">
                        {event.title}
                      </h3>

                      {event.description && (
                        <p className="text-white/60 text-sm mb-3 line-clamp-2">
                          {event.description}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          <span>
                            {formatEventTime(event.start)} - {formatEventTime(event.end)}
                          </span>
                        </div>

                        {event.attendees && event.attendees.length > 0 && (
                          <div className="flex items-center gap-2">
                            <Users size={14} />
                            <span>{event.attendees.length} attendees</span>
                          </div>
                        )}
                      </div>

                      {/* Attendees */}
                      {event.attendees && event.attendees.length > 0 && (
                        <div className="flex items-center gap-2 mt-3">
                          <div className="flex -space-x-2">
                            {event.attendees.slice(0, 3).map((_, i) => (
                              <div
                                key={i}
                                className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 border-2 border-gray-900 flex items-center justify-center text-xs text-white font-semibold"
                              >
                                {String.fromCharCode(65 + i)}
                              </div>
                            ))}
                            {event.attendees.length > 3 && (
                              <div className="w-6 h-6 rounded-full bg-white/10 border-2 border-gray-900 flex items-center justify-center text-xs text-white/60">
                                +{event.attendees.length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Time Until */}
                    <div className="flex-shrink-0">
                      <Badge className="bg-white/10 text-white border-white/20">
                        {formatEventDate(event.start)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Footer */}
        {events.length > 0 && (
          <div className="p-4 border-t border-white/10 text-center">
            <Button
              variant="ghost"
              className="text-white/60 hover:text-white hover:bg-white/5"
              onClick={loadEvents}
            >
              Refresh Events
            </Button>
          </div>
        )}
      </Card>

      {/* Integration Info */}
      <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <p className="text-blue-300 text-sm">
          <strong>💡 Tip:</strong> Add your Google Calendar API key in the environment variables to sync your real calendar events!
        </p>
      </div>
    </motion.div>
  );
}
