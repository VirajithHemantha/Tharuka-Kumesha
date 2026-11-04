import React from 'react';
import { motion } from 'motion/react';
import { Music, VolumeX } from 'lucide-react';

interface MusicControlProps {
  isMusicPlaying: boolean;
  toggleMusic: () => void;
}

export const MusicControl: React.FC<MusicControlProps> = ({ isMusicPlaying, toggleMusic }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 1 }}
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-brand-ivory border border-brand-champagne rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-300 group"
    >
      {/* Subtle animation around icon when playing */}
      {isMusicPlaying && (
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-brand-champagne/50 rounded-full"
        />
      )}
      
      {isMusicPlaying ? (
        <Music className="w-4 h-4 text-brand-dark" />
      ) : (
        <VolumeX className="w-4 h-4 text-brand-sage-deep opacity-60" />
      )}
    </motion.button>
  );
};
