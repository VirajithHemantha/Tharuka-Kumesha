import React, { useState } from "react";
import { motion, AnimatePresence } from 'motion/react';

export function EnvelopeOpening({ onComplete, onMusicStart }: { onComplete: () => void, onMusicStart?: () => void }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleStart = () => {
    setIsOpening(true);
    if (onMusicStart) onMusicStart();
    
    // Complete after a short transition
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {!isOpening && (
        <motion.div 
          exit={{ opacity: 0 }} 
          transition={{ duration: 1 }}
          className="fixed inset-0 bg-brand-ivory z-[100] flex items-center justify-center overflow-hidden"
        >
          <img
            src="/intro.jpg"
            alt="Intro Background"
            className="absolute w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="font-serif text-brand-ivory text-4xl sm:text-5xl lg:text-6xl mb-12 font-light drop-shadow-md"
            >
              You are welcome
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-col items-center"
            >
              <div className="w-[1px] h-16 sm:h-24 bg-gradient-to-b from-transparent to-brand-champagne/50 mb-8" />
              <button
                onClick={handleStart}
                className="px-12 py-4 bg-transparent border-[1.5px] border-brand-ivory text-brand-ivory font-sans font-medium uppercase tracking-[0.4em] text-xs sm:text-sm [text-shadow:0_1px_4px_rgba(0,0,0,0.5)] hover:bg-brand-ivory/15 transition-colors duration-500 rounded-full"
              >
                Open Invitation
              </button>
              <div className="w-[1px] h-16 sm:h-24 bg-gradient-to-t from-transparent to-brand-champagne/50 mt-8" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
