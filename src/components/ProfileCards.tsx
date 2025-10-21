import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, Play } from 'lucide-react';

const roommates = [
  {
    id: 1,
    name: 'Nick',
    avatar: 'https://images.unsplash.com/photo-1701463387028-3947648f1337?w=150&h=150&fit=crop',
    color: '#ff2d95',
    mood: '💼 Working',
    role: 'Roommate',
  },
  {
    id: 2,
    name: 'Alex',
    avatar: 'https://images.unsplash.com/photo-1655249481446-25d575f1c054?w=150&h=150&fit=crop',
    color: '#ff6bb5',
    mood: '🏠 Home',
    role: 'Roommate',
  },
  {
    id: 3,
    name: 'Landon',
    avatar: 'https://images.unsplash.com/photo-1676989880361-091e12efc056?w=150&h=150&fit=crop',
    color: '#ffa0d0',
    mood: '🎵 Listening',
    role: 'Roommate',
  },
];

const dog = {
  name: 'Kepler',
  avatar: 'https://images.unsplash.com/photo-1678830496126-0f7b94575215?w=150&h=150&fit=crop',
  nextWalk: '2h',
};

interface ProfileCardsProps {
  onStartWalk?: () => void;
}

export function ProfileCards({ onStartWalk }: ProfileCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {roommates.map((roommate, index) => (
        <motion.div
          key={roommate.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -8, scale: 1.02 }}
          className="rounded-3xl p-6 cursor-pointer relative overflow-hidden"
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `2px solid ${roommate.color}40`,
            boxShadow: `0 8px 32px 0 ${roommate.color}20`,
          }}
        >
          <motion.div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${roommate.color}15, transparent 70%)`,
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-3">
            <div
              className="relative p-1 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${roommate.color}, ${roommate.color}80)`,
                boxShadow: `0 0 20px ${roommate.color}60`,
              }}
            >
              <Avatar className="w-20 h-20 border-2 border-white/20">
                <AvatarImage src={roommate.avatar} alt={roommate.name} />
                <AvatarFallback>{roommate.name[0]}</AvatarFallback>
              </Avatar>
            </div>

            <div className="text-center">
              <h3 className="text-white">{roommate.name}</h3>
              <p className="text-white/60 text-sm">{roommate.role}</p>
            </div>

            <Badge
              className="rounded-full px-3 py-1 border-0"
              style={{
                background: `${roommate.color}20`,
                color: roommate.color,
              }}
            >
              {roommate.mood}
            </Badge>
          </div>
        </motion.div>
      ))}

      {/* Dog Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        whileHover={{ y: -8, scale: 1.02 }}
        className="rounded-3xl p-6 cursor-pointer relative overflow-hidden"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '2px solid #ff8cc540',
          boxShadow: '0 8px 32px 0 #ff8cc520',
        }}
      >
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #ff8cc515, transparent 70%)',
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-3">
          <div
            className="relative p-1 rounded-full"
            style={{
              background: 'linear-gradient(135deg, #ff8cc5, #ff8cc580)',
              boxShadow: '0 0 20px #ff8cc560',
            }}
          >
            <Avatar className="w-20 h-20 border-2 border-white/20">
              <AvatarImage src={dog.avatar} alt={dog.name} />
              <AvatarFallback>🐕</AvatarFallback>
            </Avatar>
          </div>

          <div className="text-center">
            <h3 className="text-white">{dog.name}</h3>
            <p className="text-white/60 text-sm">Good Boy</p>
          </div>

          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Badge
                className="rounded-full px-3 py-1 border-0 flex items-center gap-1"
                style={{
                  background: '#ff8cc520',
                  color: '#ff8cc5',
                }}
              >
                <Clock size={12} />
                Next walk in {dog.nextWalk}
              </Badge>
            </motion.div>
            
            {onStartWalk && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  onClick={onStartWalk}
                  className="rounded-full bg-[#ff8cc5] hover:bg-[#ff8cc5]/80 border-0 text-white"
                  style={{
                    boxShadow: '0 0 15px #ff8cc560',
                  }}
                >
                  <Play size={12} className="mr-1" />
                  Walk Now
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
