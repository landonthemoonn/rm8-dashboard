import { motion } from 'framer-motion';
import { Plus, Dog, DollarSign, ListChecks } from 'lucide-react';

interface FloatingActionButtonsProps {
  onAddWalk: () => void;
  onAddExpense: () => void;
  onAddChore: () => void;
}

const actions = [
  { icon: Dog, label: 'Add Walk', color: '#ff2d95', action: 'walk' },
  { icon: DollarSign, label: 'Add Expense', color: '#ff6bb5', action: 'expense' },
  { icon: ListChecks, label: 'Add Chore', color: '#ffa0d0', action: 'chore' },
];

export function FloatingActionButtons({ onAddWalk, onAddExpense, onAddChore }: FloatingActionButtonsProps) {
  const handleAction = (action: string) => {
    switch (action) {
      case 'walk':
        onAddWalk();
        break;
      case 'expense':
        onAddExpense();
        break;
      case 'chore':
        onAddChore();
        break;
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
    >
      <div
        className="flex items-center gap-4 px-6 py-4 rounded-full"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          boxShadow: '0 8px 32px 0 var(--neon-pink-glow)',
        }}
      >
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.label}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.6 + index * 0.1,
                type: 'spring',
                stiffness: 500,
                damping: 15,
              }}
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAction(action.action)}
              className="relative group"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    `0 0 20px ${action.color}60`,
                    `0 0 40px ${action.color}80`,
                    `0 0 20px ${action.color}60`,
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: 'easeInOut',
                  delay: index * 0.3,
                }}
                className="p-4 rounded-full cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${action.color}, ${action.color}cc)`,
                }}
              >
                <Icon className="text-white" size={24} />
              </motion.div>

              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: -10 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg whitespace-nowrap pointer-events-none"
                style={{
                  background: 'var(--glass-bg)',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${action.color}40`,
                  color: action.color,
                }}
              >
                {action.label}
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
