import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, MapPin, Calendar, MessageSquare, Check, X, Camera } from 'lucide-react';
import { format } from 'date-fns';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Input } from '../ui/input';
import type { Walk } from '../DogWalkingApp';

interface WalkHistoryProps {
  walks: Walk[];
}

const roommates = [
  { id: 'alex', name: 'Alex', color: '#ff2d95', avatar: 'https://images.unsplash.com/photo-1701463387028-3947648f1337?w=150&h=150&fit=crop' },
  { id: 'jordan', name: 'Jordan', color: '#ff6bb5', avatar: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=150&h=150&fit=crop' },
  { id: 'sam', name: 'Sam', color: '#ffa0d0', avatar: 'https://images.unsplash.com/photo-1676989880361-091e12efc056?w=150&h=150&fit=crop' },
];

export function WalkHistory({ walks }: WalkHistoryProps) {
  const [filterWalker, setFilterWalker] = useState<string>('');

  const filteredWalks = filterWalker
    ? walks.filter((walk) => walk.walkerId === filterWalker)
    : walks;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
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
        <h2 className="text-white">Walk History</h2>
        <div className="flex items-center gap-2">
          {roommates.map((roommate) => (
            <motion.button
              key={roommate.id}
              onClick={() => setFilterWalker(filterWalker === roommate.id ? '' : roommate.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-full transition-all ${
                filterWalker === roommate.id ? 'ring-2' : 'opacity-50'
              }`}
              style={{
                background: `${roommate.color}20`,
                ringColor: roommate.color,
              }}
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={roommate.avatar} />
                <AvatarFallback>{roommate.name[0]}</AvatarFallback>
              </Avatar>
            </motion.button>
          ))}
          {filterWalker && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterWalker('')}
              className="p-2 rounded-full bg-white/10 text-white"
            >
              <X size={16} />
            </motion.button>
          )}
        </div>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          <AnimatePresence>
            {filteredWalks.map((walk, index) => (
              <WalkCard key={walk.id} walk={walk} index={index} />
            ))}
          </AnimatePresence>

          {filteredWalks.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-white/50">No walks found</p>
            </motion.div>
          )}
        </div>
      </ScrollArea>
    </motion.div>
  );
}

interface WalkCardProps {
  walk: Walk;
  index: number;
}

function WalkCard({ walk, index }: WalkCardProps) {
  const roommate = roommates.find((r) => r.id === walk.walkerId);

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 20, opacity: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, x: 4 }}
      className="relative rounded-2xl p-4 overflow-hidden group"
      style={{
        background: `${walk.walkerColor}10`,
        border: `1px solid ${walk.walkerColor}30`,
      }}
    >
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(135deg, ${walk.walkerColor}20, transparent)`,
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-2" style={{ borderColor: walk.walkerColor }}>
              <AvatarImage src={roommate?.avatar} />
              <AvatarFallback>{walk.walkerName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white">{walk.walkerName}</p>
              <p className="text-white/60 text-sm">
                {walk.endTime && format(walk.endTime, 'MMM d, h:mm a')}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {walk.pooped && (
              <Badge
                className="rounded-full px-2 py-1 border-0"
                style={{
                  background: '#34C75920',
                  color: '#34C759',
                }}
              >
                💩
              </Badge>
            )}
            {walk.photo && (
              <Badge
                className="rounded-full px-2 py-1 border-0"
                style={{
                  background: `${walk.walkerColor}30`,
                  color: walk.walkerColor,
                }}
              >
                <Camera size={12} />
              </Badge>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <Clock size={14} />
            <span>{walk.duration} min</span>
          </div>
          {walk.distance && (
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <MapPin size={14} />
              <span>{walk.distance} mi</span>
            </div>
          )}
          {walk.route && (
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Calendar size={14} />
              <span className="truncate">{walk.route}</span>
            </div>
          )}
        </div>

        {/* Notes */}
        {walk.notes && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-white/5">
            <MessageSquare size={14} className="text-white/50 mt-1 flex-shrink-0" />
            <p className="text-white/80 text-sm">{walk.notes}</p>
          </div>
        )}

        {/* Photo (if exists) */}
        {walk.photo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 rounded-xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1596787693095-1731f91546f8?w=400&h=300&fit=crop"
              alt="Walk photo"
              className="w-full h-48 object-cover"
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
