// Dog Walk Service - Manages walk data with localStorage
export interface DogWalk {
  id: string;
  date: Date;
  walker: string;
  duration: number; // in minutes
  notes?: string;
  poopCount?: number;
  peeCount?: number;
}

export interface WalkSchedule {
  lastWalk?: DogWalk;
  todaysWalks: DogWalk[];
  walkersRotation: string[];
  nextWalker: string;
  hasWalkedToday: boolean;
}

const STORAGE_KEY = 'dog_walks';
const WALKERS_KEY = 'dog_walkers';

// Default walkers - will be set during onboarding
const DEFAULT_WALKERS: string[] = [];

// Get all walks from localStorage
export const getAllWalks = (): DogWalk[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const walks = JSON.parse(stored);
    return walks.map((w: any) => ({
      ...w,
      date: new Date(w.date)
    }));
  } catch (error) {
    console.error('Error loading walks:', error);
    return [];
  }
};

// Get walkers rotation
export const getWalkers = (): string[] => {
  try {
    const stored = localStorage.getItem(WALKERS_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_WALKERS;
  } catch (error) {
    return DEFAULT_WALKERS;
  }
};

// Save walkers rotation
export const saveWalkers = (walkers: string[]): void => {
  localStorage.setItem(WALKERS_KEY, JSON.stringify(walkers));
};

// Add a new walk
export const addWalk = (walk: Omit<DogWalk, 'id'>): DogWalk => {
  const walks = getAllWalks();
  const newWalk: DogWalk = {
    ...walk,
    id: Date.now().toString(),
    date: new Date(walk.date)
  };

  walks.push(newWalk);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(walks));

  return newWalk;
};

// Quick add walk (current time, auto-detect next walker)
export const quickAddWalk = (walker?: string, duration: number = 20): DogWalk => {
  const schedule = getWalkSchedule();
  const selectedWalker = walker || schedule.nextWalker;

  return addWalk({
    date: new Date(),
    walker: selectedWalker,
    duration,
    notes: 'Quick log'
  });
};

// Delete a walk
export const deleteWalk = (id: string): void => {
  const walks = getAllWalks().filter(w => w.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(walks));
};

// Get today's walk schedule
export const getWalkSchedule = (): WalkSchedule => {
  const walks = getAllWalks();
  const walkers = getWalkers();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todaysWalks = walks.filter(w => {
    const walkDate = new Date(w.date);
    walkDate.setHours(0, 0, 0, 0);
    return walkDate.getTime() === today.getTime();
  });

  // Sort by most recent
  todaysWalks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const lastWalk = walks.length > 0
    ? walks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
    : undefined;

  // Calculate next walker based on rotation
  let nextWalker = walkers[0];
  if (lastWalk) {
    const lastWalkerIndex = walkers.indexOf(lastWalk.walker);
    if (lastWalkerIndex !== -1) {
      nextWalker = walkers[(lastWalkerIndex + 1) % walkers.length];
    }
  }

  return {
    lastWalk,
    todaysWalks,
    walkersRotation: walkers,
    nextWalker,
    hasWalkedToday: todaysWalks.length > 0
  };
};

// Get walk stats
export const getWalkStats = () => {
  const walks = getAllWalks();
  const schedule = getWalkSchedule();

  // Last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentWalks = walks.filter(w => new Date(w.date) >= sevenDaysAgo);

  const totalWalks = recentWalks.length;
  const avgDuration = totalWalks > 0
    ? Math.round(recentWalks.reduce((sum, w) => sum + w.duration, 0) / totalWalks)
    : 0;

  // Walks by person
  const walksByPerson: Record<string, number> = {};
  recentWalks.forEach(w => {
    walksByPerson[w.walker] = (walksByPerson[w.walker] || 0) + 1;
  });

  return {
    totalWalks,
    avgDuration,
    walksByPerson,
    todaysWalks: schedule.todaysWalks.length
  };
};

// No mock data - starts clean!

// Format time ago
export const timeAgo = (date: Date): string => {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 172800) return 'yesterday';
  return `${Math.floor(seconds / 86400)} days ago`;
};
