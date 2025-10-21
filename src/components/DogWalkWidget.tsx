import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dog, Plus, Check, Clock, Calendar, User, TrendingUp, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  getWalkSchedule,
  quickAddWalk,
  addWalk,
  getWalkStats,
  timeAgo,
  type DogWalk
} from '../services/dogWalkService';

export function DogWalkWidget() {
  const [schedule, setSchedule] = useState(getWalkSchedule());
  const [stats, setStats] = useState(getWalkStats());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    walker: '',
    duration: 20,
    notes: '',
    poopCount: 0,
    peeCount: 0
  });
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setSchedule(getWalkSchedule());
    setStats(getWalkStats());
  };

  const handleQuickLog = () => {
    quickAddWalk();
    setJustAdded(true);
    refreshData();

    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleDetailedLog = () => {
    setFormData({
      ...formData,
      walker: schedule.nextWalker
    });
    setIsDialogOpen(true);
  };

  const handleSubmitWalk = () => {
    addWalk({
      date: new Date(),
      walker: formData.walker || schedule.nextWalker,
      duration: formData.duration,
      notes: formData.notes,
      poopCount: formData.poopCount || undefined,
      peeCount: formData.peeCount || undefined
    });

    setIsDialogOpen(false);
    setJustAdded(true);
    refreshData();

    setTimeout(() => setJustAdded(false), 2000);

    // Reset form
    setFormData({
      walker: '',
      duration: 20,
      notes: '',
      poopCount: 0,
      peeCount: 0
    });
  };

  return (
    <div className="space-y-4">
      {/* Main Status Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative"
      >
        <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border-white/20 overflow-hidden">
          {/* Header with Dog Icon */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={schedule.hasWalkedToday ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    schedule.hasWalkedToday
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                      : 'bg-gradient-to-br from-orange-400 to-red-500'
                  }`}
                >
                  <Dog className="text-white" size={32} />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Kepler's Walks</h2>
                  <p className="text-white/70">
                    {schedule.hasWalkedToday ? (
                      <span className="flex items-center gap-2">
                        <Check size={16} className="text-green-400" />
                        Walked {schedule.todaysWalks.length} time{schedule.todaysWalks.length > 1 ? 's' : ''} today!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Clock size={16} className="text-orange-400" />
                        Needs a walk today
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Quick Add Button */}
              <AnimatePresence mode="wait">
                {justAdded ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2"
                  >
                    <Check size={20} />
                    Walk Logged!
                  </motion.div>
                ) : (
                  <motion.div
                    key="button"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex gap-2"
                  >
                    <Button
                      onClick={handleQuickLog}
                      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold px-6 py-6 text-lg"
                    >
                      <Zap className="mr-2" size={20} />
                      Quick Log Walk
                    </Button>
                    <Button
                      onClick={handleDetailedLog}
                      variant="outline"
                      className="bg-white/10 hover:bg-white/20 border-white/20 text-white px-6 py-6"
                    >
                      <Plus className="mr-2" size={20} />
                      Details
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Status Grid */}
          <div className="grid grid-cols-3 gap-4 p-6">
            {/* Last Walk */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                <Clock size={16} />
                Last Walk
              </div>
              <p className="text-white text-xl font-bold">
                {schedule.lastWalk ? timeAgo(schedule.lastWalk.date) : 'Never'}
              </p>
              {schedule.lastWalk && (
                <p className="text-white/60 text-sm mt-1">
                  by {schedule.lastWalk.walker}
                </p>
              )}
            </div>

            {/* Next Walker */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                <User size={16} />
                Next Up
              </div>
              <p className="text-white text-xl font-bold">{schedule.nextWalker}</p>
              <p className="text-white/60 text-sm mt-1">Your turn!</p>
            </div>

            {/* This Week */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                <TrendingUp size={16} />
                This Week
              </div>
              <p className="text-white text-xl font-bold">{stats.totalWalks} walks</p>
              <p className="text-white/60 text-sm mt-1">Avg: {stats.avgDuration} min</p>
            </div>
          </div>

          {/* Today's Walks */}
          {schedule.todaysWalks.length > 0 && (
            <div className="px-6 pb-6">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Calendar size={18} />
                Today's Walks
              </h3>
              <div className="space-y-2">
                {schedule.todaysWalks.map((walk, index) => (
                  <motion.div
                    key={walk.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/5 rounded-lg p-3 border border-white/10 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold">
                        {walk.walker[0]}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{walk.walker}</p>
                        <p className="text-white/60 text-sm">
                          {new Date(walk.date).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                          {walk.notes && ` • ${walk.notes}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-white/10 text-white border-white/20">
                        {walk.duration} min
                      </Badge>
                      {walk.poopCount !== undefined && walk.poopCount > 0 && (
                        <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                          💩 {walk.poopCount}
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Walk Rotation */}
          <div className="px-6 pb-6">
            <h3 className="text-white font-semibold mb-3">Walker Rotation</h3>
            <div className="flex flex-wrap gap-2">
              {schedule.walkersRotation.map((walker, index) => (
                <Badge
                  key={walker}
                  className={`px-4 py-2 ${
                    walker === schedule.nextWalker
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0'
                      : 'bg-white/5 text-white/70 border-white/10'
                  }`}
                >
                  {walker} {walker === schedule.nextWalker && '⭐'}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Add Walk Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-900 border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl">Log a Walk</DialogTitle>
            <DialogDescription className="text-white/60">
              Add details about Kepler's walk
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="walker" className="text-white">Who walked Kepler?</Label>
              <Input
                id="walker"
                placeholder={schedule.nextWalker}
                value={formData.walker}
                onChange={(e) => setFormData({ ...formData, walker: e.target.value })}
                className="bg-white/5 border-white/10 text-white mt-2"
              />
            </div>

            <div>
              <Label htmlFor="duration" className="text-white">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 20 })}
                className="bg-white/5 border-white/10 text-white mt-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="poop" className="text-white">💩 Poop count</Label>
                <Input
                  id="poop"
                  type="number"
                  min="0"
                  value={formData.poopCount}
                  onChange={(e) => setFormData({ ...formData, poopCount: parseInt(e.target.value) || 0 })}
                  className="bg-white/5 border-white/10 text-white mt-2"
                />
              </div>
              <div>
                <Label htmlFor="pee" className="text-white">💧 Pee count</Label>
                <Input
                  id="pee"
                  type="number"
                  min="0"
                  value={formData.peeCount}
                  onChange={(e) => setFormData({ ...formData, peeCount: parseInt(e.target.value) || 0 })}
                  className="bg-white/5 border-white/10 text-white mt-2"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes" className="text-white">Notes (optional)</Label>
              <Input
                id="notes"
                placeholder="e.g., Visited the park, played with other dogs"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="bg-white/5 border-white/10 text-white mt-2"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setIsDialogOpen(false)}
              className="text-white/60 hover:text-white hover:bg-white/5"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitWalk}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
            >
              <Check className="mr-2" size={18} />
              Log Walk
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
