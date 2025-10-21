import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, Info, CheckCircle, AlertTriangle, Plus, Pin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Banner {
  id: number;
  type: 'info' | 'warning' | 'success' | 'urgent';
  message: string;
  author: string;
  authorColor: string;
  timestamp: Date;
  pinned: boolean;
}

const bannerConfig = {
  info: {
    icon: Info,
    gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    bg: 'rgba(59, 130, 246, 0.15)',
    border: 'rgba(59, 130, 246, 0.3)',
  },
  warning: {
    icon: AlertTriangle,
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    bg: 'rgba(245, 158, 11, 0.15)',
    border: 'rgba(245, 158, 11, 0.3)',
  },
  success: {
    icon: CheckCircle,
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    bg: 'rgba(16, 185, 129, 0.15)',
    border: 'rgba(16, 185, 129, 0.3)',
  },
  urgent: {
    icon: AlertCircle,
    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
    bg: 'rgba(239, 68, 68, 0.15)',
    border: 'rgba(239, 68, 68, 0.3)',
  },
};

const roommates = [
  { id: 'alex', name: 'Alex', color: '#ff2d95' },
  { id: 'jordan', name: 'Jordan', color: '#ff6bb5' },
  { id: 'sam', name: 'Sam', color: '#ffa0d0' },
];

export function NotificationBanners() {
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: 1,
      type: 'urgent',
      message: 'Landlord inspection tomorrow at 2 PM - please clean your areas!',
      author: 'Alex',
      authorColor: '#ff2d95',
      timestamp: new Date(),
      pinned: true,
    },
    {
      id: 2,
      type: 'info',
      message: 'WiFi will be down tonight from 11 PM - 1 AM for router update',
      author: 'Jordan',
      authorColor: '#ff6bb5',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      pinned: false,
    },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newBanner, setNewBanner] = useState({
    type: 'info' as Banner['type'],
    message: '',
    author: '',
  });

  const dismissBanner = (id: number) => {
    setBanners(banners.filter((b) => b.id !== id));
  };

  const togglePin = (id: number) => {
    setBanners(
      banners.map((b) => (b.id === id ? { ...b, pinned: !b.pinned } : b))
    );
  };

  const addBanner = () => {
    if (newBanner.message && newBanner.author) {
      const author = roommates.find((r) => r.id === newBanner.author);
      if (!author) return;

      const banner: Banner = {
        id: Date.now(),
        type: newBanner.type,
        message: newBanner.message,
        author: author.name,
        authorColor: author.color,
        timestamp: new Date(),
        pinned: false,
      };
      setBanners([banner, ...banners]);
      setNewBanner({ type: 'info', message: '', author: '' });
      setDialogOpen(false);
    }
  };

  const sortedBanners = [...banners].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  return (
    <>
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-white text-sm">📌 Notifications</h3>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="sm"
              onClick={() => setDialogOpen(true)}
              className="rounded-full bg-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/80 border-0"
            >
              <Plus size={14} className="mr-1" />
              Add Note
            </Button>
          </motion.div>
        </div>

        <AnimatePresence>
          {sortedBanners.map((banner, index) => {
            const config = bannerConfig[banner.type];
            const Icon = config.icon;

            return (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="relative rounded-2xl p-4 overflow-hidden group"
                style={{
                  background: config.bg,
                  border: `1px solid ${config.border}`,
                }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `${config.gradient}20`,
                  }}
                />

                <div className="relative z-10 flex items-start gap-3">
                  <div
                    className="p-2 rounded-xl flex-shrink-0"
                    style={{
                      background: config.gradient,
                      boxShadow: `0 0 20px ${config.border}`,
                    }}
                  >
                    <Icon className="text-white" size={18} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-white">{banner.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          background: `${banner.authorColor}30`,
                          color: banner.authorColor,
                        }}
                      >
                        {banner.author}
                      </span>
                      <span className="text-white/50 text-xs">
                        {banner.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => togglePin(banner.id)}
                      className={`p-2 rounded-full transition-colors ${
                        banner.pinned
                          ? 'bg-white/20 text-white'
                          : 'text-white/50 hover:bg-white/10'
                      }`}
                    >
                      <Pin size={14} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => dismissBanner(banner.id)}
                      className="p-2 rounded-full text-white/50 hover:bg-white/10 hover:text-white"
                    >
                      <X size={14} />
                    </motion.button>
                  </div>
                </div>

                {banner.pinned && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2"
                  >
                    <Pin size={12} className="text-white/30" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>

        {sortedBanners.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-6 rounded-2xl"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
            }}
          >
            <p className="text-white/50 text-sm">No notifications</p>
          </motion.div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-[var(--glass-bg)] border-[var(--glass-border)] text-white backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-white">Add Notification</DialogTitle>
            <DialogDescription className="text-white/70">
              Post an important note for all roommates
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <Select
              value={newBanner.type}
              onValueChange={(value) =>
                setNewBanner({ ...newBanner, type: value as Banner['type'] })
              }
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Priority level" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--glass-bg)] border-[var(--glass-border)] text-white backdrop-blur-xl">
                <SelectItem value="info">📘 Info</SelectItem>
                <SelectItem value="warning">⚠️ Warning</SelectItem>
                <SelectItem value="success">✅ Success</SelectItem>
                <SelectItem value="urgent">🚨 Urgent</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={newBanner.author}
              onValueChange={(value) => setNewBanner({ ...newBanner, author: value })}
            >
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Your name" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--glass-bg)] border-[var(--glass-border)] text-white backdrop-blur-xl">
                {roommates.map((roommate) => (
                  <SelectItem key={roommate.id} value={roommate.id}>
                    {roommate.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Textarea
              placeholder="Write your message..."
              value={newBanner.message}
              onChange={(e) => setNewBanner({ ...newBanner, message: e.target.value })}
              className="bg-white/10 border-white/20 text-white min-h-[100px]"
            />

            <Button
              onClick={addBanner}
              disabled={!newBanner.message || !newBanner.author}
              className="w-full bg-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/80"
            >
              Post Notification
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
