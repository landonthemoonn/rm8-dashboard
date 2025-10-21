import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from 'react-responsive-masonry';
import { StickyNote, Plus, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

interface Note {
  id: number;
  content: string;
  color: string;
}

const noteColors = ['#ff2d95', '#ff6bb5', '#ffa0d0', '#ff8cc5', '#ff5ea8'];

export function NotesWidget() {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, content: 'Remember to buy more coffee ☕', color: '#ff2d95' },
    { id: 2, content: 'Movie night this Friday! 🎬', color: '#ff6bb5' },
    { id: 3, content: 'Landlord coming for inspection on Tuesday', color: '#ffa0d0' },
    { id: 4, content: 'WiFi password: RoomieHub2025', color: '#ff8cc5' },
    { id: 5, content: "Let's do a deep clean this weekend", color: '#ff5ea8' },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState('');

  const addNote = () => {
    if (newNoteContent.trim()) {
      const newNote: Note = {
        id: Date.now(),
        content: newNoteContent,
        color: noteColors[Math.floor(Math.random() * noteColors.length)],
      };
      setNotes([...notes, newNote]);
      setNewNoteContent('');
      setIsOpen(false);
    }
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
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
        <div className="flex items-center gap-2">
          <StickyNote className="text-[var(--neon-pink)]" size={24} />
          <h2 className="text-white">Reminders & Notes</h2>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="icon"
                className="rounded-full bg-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/80 border-0"
                style={{
                  boxShadow: '0 0 20px var(--neon-pink-glow)',
                }}
              >
                <Plus size={20} />
              </Button>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="bg-[var(--glass-bg)] border-[var(--glass-border)] text-white backdrop-blur-xl">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Note</DialogTitle>
              <DialogDescription className="text-white/70">
                Create a quick note or reminder for your roommates.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <Textarea
                placeholder="Write your note..."
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
                className="bg-white/10 border-white/20 text-white min-h-[120px]"
              />
              <Button
                onClick={addNote}
                className="w-full bg-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/80"
              >
                Add Note
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <Masonry columnsCount={2} gutter="12px">
          <AnimatePresence>
            {notes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: 0,
                  rotate: Math.random() * 4 - 2,
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  delay: index * 0.05,
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  y: -4,
                  boxShadow: `0 10px 40px ${note.color}60`,
                }}
                className="relative p-4 rounded-2xl cursor-pointer group"
                style={{
                  background: `${note.color}20`,
                  border: `1px solid ${note.color}40`,
                }}
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      `0 0 20px ${note.color}30`,
                      `0 0 30px ${note.color}50`,
                      `0 0 20px ${note.color}30`,
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                />

                <motion.button
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteNote(note.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="text-white" size={14} />
                </motion.button>

                <p className="text-white text-sm leading-relaxed pr-6">{note.content}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </Masonry>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--neon-pink);
          border-radius: 10px;
        }
      `}</style>
    </motion.div>
  );
}
