import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DogWalkDashboard } from './dog-walking/DogWalkDashboard';
import { ActiveWalkTimer } from './dog-walking/ActiveWalkTimer';
import { WalkHistory } from './dog-walking/WalkHistory';
import { WalkStats } from './dog-walking/WalkStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export interface Walk {
  id: number;
  walkerId: string;
  walkerName: string;
  walkerColor: string;
  startTime: Date;
  endTime: Date | null;
  duration: number; // in minutes
  distance?: number; // in miles
  route?: string;
  notes: string;
  pooped: boolean;
  photo?: string;
  isActive: boolean;
}

interface DogWalkingAppProps {
  onStartWalk?: () => void;
}

export function DogWalkingApp({ onStartWalk }: DogWalkingAppProps) {
  const [walks, setWalks] = useState<Walk[]>([
    {
      id: 1,
      walkerId: 'alex',
      walkerName: 'Alex',
      walkerColor: '#ff2d95',
      startTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
      endTime: new Date(Date.now() - 3.5 * 60 * 60 * 1000),
      duration: 30,
      distance: 1.2,
      route: 'Park Loop',
      notes: "Met neighbor's dog Ruby!",
      pooped: true,
      isActive: false,
    },
    {
      id: 2,
      walkerId: 'jordan',
      walkerName: 'Jordan',
      walkerColor: '#ff6bb5',
      startTime: new Date(Date.now() - 8 * 60 * 60 * 1000),
      endTime: new Date(Date.now() - 7.75 * 60 * 60 * 1000),
      duration: 15,
      distance: 0.5,
      route: 'Quick Block Walk',
      notes: 'Morning pee walk',
      pooped: false,
      isActive: false,
    },
    {
      id: 3,
      walkerId: 'sam',
      walkerName: 'Sam',
      walkerColor: '#ffa0d0',
      startTime: new Date(Date.now() - 24 * 60 * 60 * 1000),
      endTime: new Date(Date.now() - 23.5 * 60 * 60 * 1000),
      duration: 45,
      distance: 2.1,
      route: 'Trail Adventure',
      notes: 'Long evening walk, saw a deer!',
      pooped: true,
      isActive: false,
    },
  ]);
  const [activeWalk, setActiveWalk] = useState<Walk | null>(null);

  const startWalk = (walkerId: string, walkerName: string, walkerColor: string) => {
    const newWalk: Walk = {
      id: Date.now(),
      walkerId,
      walkerName,
      walkerColor,
      startTime: new Date(),
      endTime: null,
      duration: 0,
      notes: '',
      pooped: false,
      isActive: true,
    };
    setActiveWalk(newWalk);
  };

  const endWalk = (updatedWalk: Walk) => {
    setWalks([updatedWalk, ...walks]);
    setActiveWalk(null);
  };

  const cancelWalk = () => {
    setActiveWalk(null);
  };

  const lastWalk = walks.length > 0 ? walks[0] : null;

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {activeWalk ? (
          <ActiveWalkTimer
            key="active-walk"
            walk={activeWalk}
            onEnd={endWalk}
            onCancel={cancelWalk}
          />
        ) : (
          <motion.div
            key="main-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/5 border border-white/10 p-1 rounded-2xl">
                <TabsTrigger 
                  value="dashboard"
                  className="rounded-xl data-[state=active]:bg-[var(--neon-pink)] data-[state=active]:text-white"
                >
                  Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="history"
                  className="rounded-xl data-[state=active]:bg-[var(--neon-pink)] data-[state=active]:text-white"
                >
                  History
                </TabsTrigger>
                <TabsTrigger 
                  value="stats"
                  className="rounded-xl data-[state=active]:bg-[var(--neon-pink)] data-[state=active]:text-white"
                >
                  Stats
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="mt-0">
                <DogWalkDashboard
                  lastWalk={lastWalk}
                  onStartWalk={startWalk}
                />
              </TabsContent>

              <TabsContent value="history" className="mt-0">
                <WalkHistory walks={walks} />
              </TabsContent>

              <TabsContent value="stats" className="mt-0">
                <WalkStats walks={walks} />
              </TabsContent>
            </Tabs>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
