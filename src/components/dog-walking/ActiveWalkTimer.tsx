import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play, Square, Camera, FileText, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import type { Walk } from '../DogWalkingApp';

interface ActiveWalkTimerProps {
  walk: Walk;
  onEnd: (walk: Walk) => void;
  onCancel: () => void;
}

export function ActiveWalkTimer({ walk, onEnd, onCancel }: ActiveWalkTimerProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [notes, setNotes] = useState('');
  const [pooped, setPooped] = useState(false);
  const [route, setRoute] = useState('');
  const [showEndDialog, setShowEndDialog] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEnd = () => {
    const completedWalk: Walk = {
      ...walk,
      endTime: new Date(),
      duration: Math.floor(elapsedSeconds / 60),
      notes,
      pooped,
      route,
      isActive: false,
    };
    onEnd(completedWalk);
  };

  if (showEndDialog) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="rounded-3xl p-8"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 8px 32px 0 var(--neon-pink-glow)',
        }}
      >
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-4 rounded-full bg-[var(--neon-pink)] flex items-center justify-center"
            style={{
              boxShadow: '0 0 40px var(--neon-pink-glow)',
            }}
          >
            <Check size={40} className="text-white" />
          </motion.div>
          <h2 className="text-white text-2xl mb-2">Walk Complete!</h2>
          <p className="text-white/60">Great job, {walk.walkerName}!</p>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="text-white/60 text-sm mb-1">Duration</p>
            <p className="text-white text-2xl">{formatTime(elapsedSeconds)}</p>
          </div>

          <div className="space-y-3">
            <div>
              <Label className="text-white mb-2 block">Route Name (optional)</Label>
              <Input
                placeholder="e.g., Park Loop, Quick Walk"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            <div>
              <Label className="text-white mb-2 block">Notes</Label>
              <Textarea
                placeholder="Any highlights from the walk?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="bg-white/10 border-white/20 text-white min-h-[100px]"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
              <Label className="text-white">Pooped? 💩</Label>
              <Switch
                checked={pooped}
                onCheckedChange={setPooped}
                className="data-[state=checked]:bg-[var(--neon-pink)]"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setShowEndDialog(false)}
              className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Back to Timer
            </Button>
            <Button
              onClick={handleEnd}
              className="flex-1 bg-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/80"
            >
              Save Walk
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="rounded-3xl p-8 relative overflow-hidden"
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid var(--glass-border)',
        boxShadow: '0 8px 32px 0 var(--neon-pink-glow)',
      }}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(255, 45, 149, 0.3), transparent)',
            'radial-gradient(circle at 50% 50%, rgba(255, 107, 181, 0.4), transparent)',
            'radial-gradient(circle at 50% 50%, rgba(255, 45, 149, 0.3), transparent)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center">
          <motion.div
            className="inline-block px-4 py-2 rounded-full mb-4"
            style={{
              background: `${walk.walkerColor}20`,
              border: `1px solid ${walk.walkerColor}40`,
            }}
          >
            <p className="text-white">
              <span style={{ color: walk.walkerColor }}>{walk.walkerName}</span> is walking Kepler
            </p>
          </motion.div>
        </div>

        {/* Timer Display */}
        <div className="text-center">
          <motion.div
            animate={{
              scale: isPaused ? 1 : [1, 1.02, 1],
            }}
            transition={{
              duration: 1,
              repeat: isPaused ? 0 : Infinity,
            }}
            className="text-8xl mb-4"
            style={{
              background: 'linear-gradient(135deg, var(--neon-pink), #ff8cc5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 60px rgba(255, 45, 149, 0.5)',
            }}
          >
            {formatTime(elapsedSeconds)}
          </motion.div>
          <p className="text-white/60">
            {isPaused ? 'Paused' : 'Walking...'}
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsPaused(!isPaused)}
              className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              {isPaused ? <Play size={24} /> : <Pause size={24} />}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={() => setShowEndDialog(true)}
              className="rounded-full px-8 bg-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/80"
              style={{
                boxShadow: '0 0 30px var(--neon-pink-glow)',
              }}
            >
              <Square className="mr-2" size={24} />
              End Walk
            </Button>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="bg-white/5 border-white/10 text-white hover:bg-white/10"
          >
            <Camera className="mr-2" size={20} />
            Add Photo
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowEndDialog(true)}
            className="bg-white/5 border-white/10 text-white hover:bg-white/10"
          >
            <FileText className="mr-2" size={20} />
            Add Note
          </Button>
        </div>

        {/* Cancel */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={onCancel}
            className="text-white/60 hover:text-white hover:bg-white/10"
          >
            Cancel Walk
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
