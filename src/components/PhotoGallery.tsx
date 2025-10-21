import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image as ImageIcon, X, ExternalLink, Download } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
import Masonry from 'react-responsive-masonry';

interface Photo {
  id: number;
  url: string;
  uploadedBy: string;
  uploadedByColor: string;
  timestamp: Date;
  caption?: string;
}

export function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=800&fit=crop',
      uploadedBy: 'Alex',
      uploadedByColor: '#ff2d95',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      caption: 'Game night was epic!',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&h=600&fit=crop',
      uploadedBy: 'Jordan',
      uploadedByColor: '#ff6bb5',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      caption: 'New living room setup',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=800&fit=crop',
      uploadedBy: 'Sam',
      uploadedByColor: '#ffa0d0',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      caption: 'Taco Tuesday success!',
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1678830496126-0f7b94575215?w=600&h=600&fit=crop',
      uploadedBy: 'Alex',
      uploadedByColor: '#ff2d95',
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      caption: 'Kepler being cute as always',
    },
  ]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handleGooglePhotosConnect = () => {
    // Mock Google Photos connection
    alert('In production, this would connect to Google Photos API to sync your shared album!');
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="rounded-3xl p-6"
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
            <ImageIcon className="text-[var(--neon-pink)]" size={24} />
            <h2 className="text-white">Photo Gallery</h2>
          </div>

          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                variant="outline"
                onClick={handleGooglePhotosConnect}
                className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ExternalLink size={14} className="mr-1" />
                Google Photos
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                className="rounded-full bg-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/80 border-0"
              >
                <Upload size={14} className="mr-1" />
                Upload
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          <Masonry columnsCount={3} gutter="12px">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedPhoto(photo)}
                className="relative rounded-2xl overflow-hidden cursor-pointer group"
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-auto object-cover"
                />
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end"
                >
                  {photo.caption && (
                    <p className="text-white text-sm mb-2">{photo.caption}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        background: `${photo.uploadedByColor}40`,
                        color: photo.uploadedByColor,
                      }}
                    >
                      {photo.uploadedBy}
                    </span>
                    <span className="text-white/70 text-xs">
                      {photo.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
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

      {/* Photo Viewer Dialog */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl bg-[var(--glass-bg)] border-[var(--glass-border)] backdrop-blur-xl p-0">
          {selectedPhoto && (
            <div className="relative">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              
              <div className="absolute top-4 right-4 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full bg-black/50 text-white backdrop-blur-sm"
                >
                  <Download size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedPhoto(null)}
                  className="p-3 rounded-full bg-black/50 text-white backdrop-blur-sm"
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                {selectedPhoto.caption && (
                  <p className="text-white text-lg mb-3">{selectedPhoto.caption}</p>
                )}
                <div className="flex items-center justify-between">
                  <span
                    className="px-3 py-1.5 rounded-full"
                    style={{
                      background: `${selectedPhoto.uploadedByColor}40`,
                      color: selectedPhoto.uploadedByColor,
                    }}
                  >
                    Uploaded by {selectedPhoto.uploadedBy}
                  </span>
                  <span className="text-white/80">
                    {selectedPhoto.timestamp.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
