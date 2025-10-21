import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Check, Plus, X } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { useUser, type User as UserType } from '../contexts/UserContext';

export function UserSelector() {
  const { currentUser, setCurrentUser, allUsers } = useUser();
  const [isOpen, setIsOpen] = useState(!currentUser); // Auto-open if no user selected
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserName, setNewUserName] = useState('');

  const handleSelectUser = (user: UserType) => {
    setCurrentUser(user);
    setIsOpen(false);
  };

  const handleAddUser = () => {
    if (newUserName.trim()) {
      const colors = ['#FF2D95', '#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#E91E63'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];

      setCurrentUser({
        name: newUserName.trim(),
        color: randomColor
      });

      setNewUserName('');
      setShowAddUser(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Current User Display */}
      <div className="fixed top-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 text-white px-4 py-2 rounded-full flex items-center gap-3"
        >
          {currentUser ? (
            <>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ background: currentUser.color || '#FF2D95' }}
              >
                {currentUser.name[0]}
              </div>
              <span className="font-semibold">{currentUser.name}</span>
            </>
          ) : (
            <>
              <User size={20} />
              <span>Select User</span>
            </>
          )}
        </Button>
      </div>

      {/* User Selection Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-gradient-to-br from-gray-900 to-gray-800 border-white/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Who are you?</DialogTitle>
            <DialogDescription className="text-white/70">
              Select your name to log activities and track your contributions
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-3">
            <AnimatePresence>
              {allUsers.map((user, index) => (
                <motion.div
                  key={user.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Button
                    onClick={() => handleSelectUser(user)}
                    className={`w-full justify-start gap-4 h-16 ${
                      currentUser?.name === user.name
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ background: user.color || '#FF2D95' }}
                    >
                      {user.name[0]}
                    </div>
                    <span className="text-lg font-semibold flex-1 text-left">
                      {user.name}
                    </span>
                    {currentUser?.name === user.name && (
                      <Check size={20} className="text-white" />
                    )}
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Add New User */}
            {showAddUser ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex gap-2"
              >
                <Input
                  autoFocus
                  placeholder="Enter your name"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddUser()}
                  className="bg-white/5 border-white/10 text-white"
                />
                <Button
                  onClick={handleAddUser}
                  className="bg-gradient-to-r from-pink-500 to-purple-500"
                >
                  <Check size={18} />
                </Button>
                <Button
                  onClick={() => {
                    setShowAddUser(false);
                    setNewUserName('');
                  }}
                  variant="ghost"
                  className="text-white/60 hover:text-white"
                >
                  <X size={18} />
                </Button>
              </motion.div>
            ) : (
              <Button
                onClick={() => setShowAddUser(true)}
                variant="outline"
                className="w-full h-16 bg-white/5 hover:bg-white/10 border-white/20 border-dashed text-white/70 hover:text-white"
              >
                <Plus size={20} className="mr-2" />
                Add New Roommate
              </Button>
            )}
          </div>

          {!currentUser && (
            <div className="text-center text-white/60 text-sm">
              👆 Select your name to get started
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
