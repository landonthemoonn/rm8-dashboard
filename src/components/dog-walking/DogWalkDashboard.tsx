import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, MapPin, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import type { Walk } from '../DogWalkingApp';

interface DogWalkDashboardProps {
  lastWalk: Walk | null;
  onStartWalk: (walkerId: string, walkerName: string, walkerColor: string) => void;
}

const roommates = [
  { id: 'alex', name: 'Alex', color: '#ff2d95', avatar: 'https://images.unsplash.com/photo-1701463387028-3947648f1337?w=150&h=150&fit=crop' },
  { id: 'jordan', name: 'Jordan', color: '#ff6bb5', avatar: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=150&h=150&fit=crop' },
  { id: 'sam', name: 'Sam', color: '#ffa0d0', avatar: 'https://images.unsplash.com/photo-1676989880361-091e12efc056?w=150&h=150&fit=crop' },
];

export function DogWalkDashboard({ lastWalk, onStartWalk }: DogWalkDashboardProps) {
  const [startDialogOpen, setStartDialogOpen] = useState(false);
  const [selectedWalker, setSelectedWalker] = useState('');

  const handleStartWalk = () => {
    const walker = roommates.find((r) => r.id === selectedWalker);
    if (walker) {
      onStartWalk(walker.id, walker.name, walker.color);
      setStartDialogOpen(false);
      setSelectedWalker('');
    }
  };

  const getWalkStatus = () => {
    if (!lastWalk) return { text: 'No walks yet', color: '#ff3b30', status: 'overdue' };
    
    const hoursSinceLastWalk = (Date.now() - lastWalk.endTime!.getTime()) / (1000 * 60 * 60);
    
    if (hoursSinceLastWalk < 3) return { text: 'All good!', color: '#34C759', status: 'good' };
    if (hoursSinceLastWalk < 5) return { text: 'Due soon', color: '#FFD60A', status: 'warning' };
    return { text: 'Overdue!', color: '#ff3b30', status: 'overdue' };
  };

  const status = getWalkStatus();

  return (
    <>
      <div className="space-y-6">
        {/* Dog Hero Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl p-8 relative overflow-hidden"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 8px 32px 0 var(--neon-pink-glow)',
          }}
        >
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(255, 45, 149, 0.3), transparent)',
                'radial-gradient(circle at 80% 50%, rgba(255, 107, 181, 0.3), transparent)',
                'radial-gradient(circle at 20% 50%, rgba(255, 45, 149, 0.3), transparent)',
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            {/* Dog Avatar */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="relative"
            >
              <div
                className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20"
                style={{
                  boxShadow: '0 0 40px rgba(255, 45, 149, 0.4)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1678830496126-0f7b94575215?w=150&h=150&fit=crop"
                  alt="Kepler"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-sm"
                style={{
                  background: status.color,
                  boxShadow: `0 0 20px ${status.color}80`,
                }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-white">{status.text}</span>
              </motion.div>
            </motion.div>

            {/* Walk Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-white text-3xl mb-2">Kepler 🐕</h2>
              {lastWalk ? (
                <>
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                    <Avatar className="w-8 h-8 border-2" style={{ borderColor: lastWalk.walkerColor }}>
                      <AvatarImage src={roommates.find(r => r.id === lastWalk.walkerId)?.avatar} />
                      <AvatarFallback>{lastWalk.walkerName[0]}</AvatarFallback>
                    </Avatar>
                    <p className="text-white/80">
                      <span style={{ color: lastWalk.walkerColor }}>{lastWalk.walkerName}</span> walked Kepler
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-white/60 text-sm justify-center md:justify-start">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{formatDistanceToNow(lastWalk.endTime!, { addSuffix: true })}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{lastWalk.duration} min</span>
                    </div>
                    {lastWalk.distance && (
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{lastWalk.distance} mi</span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-white/60">No walks recorded yet. Time for the first walk!</p>
              )}
            </div>

            {/* Start Walk Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={() => setStartDialogOpen(true)}
                className="rounded-full px-8 py-6 bg-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/80 text-white border-0"
                style={{
                  boxShadow: '0 0 30px var(--neon-pink-glow)',
                }}
              >
                <Play className="mr-2" size={24} />
                Start Walk
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lastWalk && (
            <>
              <StatCard
                label="Last Route"
                value={lastWalk.route || 'Unknown'}
                icon={MapPin}
                color={lastWalk.walkerColor}
              />
              <StatCard
                label="Duration"
                value={`${lastWalk.duration} min`}
                icon={Clock}
                color="#ff6bb5"
              />
              <StatCard
                label="Distance"
                value={lastWalk.distance ? `${lastWalk.distance} mi` : 'N/A'}
                icon={Calendar}
                color="#ffa0d0"
              />
            </>
          )}
        </div>
      </div>

      {/* Start Walk Dialog */}
      <Dialog open={startDialogOpen} onOpenChange={setStartDialogOpen}>
        <DialogContent className="bg-[var(--glass-bg)] border-[var(--glass-border)] text-white backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-white">Start a Walk</DialogTitle>
            <DialogDescription className="text-white/70">
              Select who's taking Kepler out for a walk
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Select value={selectedWalker} onValueChange={setSelectedWalker}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Who's walking?" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--glass-bg)] border-[var(--glass-border)] text-white backdrop-blur-xl">
                {roommates.map((roommate) => (
                  <SelectItem key={roommate.id} value={roommate.id}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ background: roommate.color }}
                      />
                      {roommate.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={handleStartWalk}
              disabled={!selectedWalker}
              className="w-full bg-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/80"
            >
              <Play className="mr-2" size={20} />
              Start Timer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

function StatCard({ label, value, icon: Icon, color }: StatCardProps) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="rounded-2xl p-4"
      style={{
        background: `${color}15`,
        border: `1px solid ${color}30`,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="p-3 rounded-xl"
          style={{
            background: `${color}30`,
            boxShadow: `0 0 20px ${color}40`,
          }}
        >
          <Icon size={20} style={{ color }} />
        </div>
        <div>
          <p className="text-white/60 text-sm">{label}</p>
          <p className="text-white">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}
