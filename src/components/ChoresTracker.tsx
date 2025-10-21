import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { GripVertical, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';

interface Chore {
  id: number;
  task: string;
  assignee: string;
  completed: boolean;
  color: string;
}

interface ChoresTrackerProps {
  isDialogOpen: boolean;
  onDialogClose: () => void;
}

interface DraggableChoreItemProps {
  chore: Chore;
  index: number;
  moveChore: (dragIndex: number, hoverIndex: number) => void;
  toggleChore: (id: number) => void;
}

function DraggableChoreItem({ chore, index, moveChore, toggleChore }: DraggableChoreItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'CHORE',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveChore(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'CHORE',
    item: () => {
      return { id: chore.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <motion.div
      ref={ref}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: isDragging ? 0.5 : 1 }}
      exit={{ x: 20, opacity: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ x: 4, scale: 1.01 }}
      className="flex items-center gap-3 p-4 rounded-2xl cursor-move"
      style={{
        background: chore.completed ? `${chore.color}10` : 'rgba(255, 255, 255, 0.05)',
        border: `1px solid ${chore.color}30`,
        transition: 'all 0.3s ease',
      }}
      data-handler-id={handlerId}
    >
      <GripVertical className="text-white/30" size={16} />
      
      <Checkbox
        checked={chore.completed}
        onCheckedChange={() => toggleChore(chore.id)}
        className="border-2 data-[state=checked]:bg-[var(--neon-pink)] data-[state=checked]:border-[var(--neon-pink)]"
        style={{
          borderColor: chore.color,
        }}
      />

      <div className="flex-1">
        <p
          className={`text-white transition-all duration-300 ${
            chore.completed ? 'line-through opacity-50' : ''
          }`}
        >
          {chore.task}
        </p>
        <p className="text-white/50 text-sm">{chore.assignee}</p>
      </div>

      {chore.completed && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-2xl"
        >
          ✓
        </motion.div>
      )}
    </motion.div>
  );
}

export function ChoresTracker({ isDialogOpen, onDialogClose }: ChoresTrackerProps) {
  const [chores, setChores] = useState<Chore[]>([
    { id: 1, task: 'Clean kitchen counters', assignee: 'Alex', completed: true, color: '#ff2d95' },
    { id: 2, task: 'Take out trash', assignee: 'Jordan', completed: true, color: '#ff6bb5' },
    { id: 3, task: 'Vacuum living room', assignee: 'Sam', completed: false, color: '#ffa0d0' },
    { id: 4, task: 'Water plants', assignee: 'Alex', completed: false, color: '#ff2d95' },
    { id: 5, task: 'Clean bathroom', assignee: 'Jordan', completed: false, color: '#ff6bb5' },
  ]);
  const [newChore, setNewChore] = useState({ task: '', assignee: '' });

  const roommates = ['Alex', 'Jordan', 'Sam'];
  const colors = { Alex: '#ff2d95', Jordan: '#ff6bb5', Sam: '#ffa0d0' };

  const completedCount = chores.filter((c) => c.completed).length;
  const progressPercentage = (completedCount / chores.length) * 100;

  const toggleChore = (id: number) => {
    setChores((prev) =>
      prev.map((chore) =>
        chore.id === id ? { ...chore, completed: !chore.completed } : chore
      )
    );
  };

  const moveChore = (dragIndex: number, hoverIndex: number) => {
    setChores((prevChores) => {
      const newChores = [...prevChores];
      const draggedChore = newChores[dragIndex];
      newChores.splice(dragIndex, 1);
      newChores.splice(hoverIndex, 0, draggedChore);
      return newChores;
    });
  };

  const addChore = () => {
    if (newChore.task && newChore.assignee) {
      const chore: Chore = {
        id: Date.now(),
        task: newChore.task,
        assignee: newChore.assignee,
        completed: false,
        color: colors[newChore.assignee as keyof typeof colors],
      };
      setChores([...chores, chore]);
      setNewChore({ task: '', assignee: '' });
      onDialogClose();
    }
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl p-6 h-full"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 8px 32px 0 var(--neon-pink-glow)',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white">Chores Tracker</h2>
          <div className="flex items-center gap-2">
            <div
              className="relative w-16 h-16 rounded-full"
              style={{
                background: 'conic-gradient(var(--neon-pink) ' + progressPercentage + '%, transparent ' + progressPercentage + '%)',
              }}
            >
              <div className="absolute inset-1 rounded-full bg-[var(--glass-bg)] flex items-center justify-center">
                <span className="text-white text-sm">{completedCount}/{chores.length}</span>
              </div>
            </div>
          </div>
        </div>

        <DndProvider backend={HTML5Backend}>
          <div className="space-y-3">
            <AnimatePresence>
              {chores.map((chore, index) => (
                <DraggableChoreItem
                  key={chore.id}
                  chore={chore}
                  index={index}
                  moveChore={moveChore}
                  toggleChore={toggleChore}
                />
              ))}
            </AnimatePresence>
          </div>
        </DndProvider>

        <div className="mt-6">
          <Progress
            value={progressPercentage}
            className="h-2 bg-white/10"
            style={{
              ['--progress-background' as string]: 'linear-gradient(90deg, var(--neon-pink), #ff8cc5)',
            }}
          />
        </div>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={onDialogClose}>
        <DialogContent className="bg-[var(--glass-bg)] border-[var(--glass-border)] text-white backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-white">Add New Chore</DialogTitle>
            <DialogDescription className="text-white/70">
              Create a new chore and assign it to a roommate.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Input
              placeholder="Chore description"
              value={newChore.task}
              onChange={(e) => setNewChore({ ...newChore, task: e.target.value })}
              className="bg-white/10 border-white/20 text-white"
            />
            <Select
              value={newChore.assignee}
              onValueChange={(value) => setNewChore({ ...newChore, assignee: value })}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Assign to roommate" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--glass-bg)] border-[var(--glass-border)] text-white backdrop-blur-xl">
                {roommates.map((roommate) => (
                  <SelectItem key={roommate} value={roommate}>
                    {roommate}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={addChore}
              className="w-full bg-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/80"
            >
              Add Chore
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
