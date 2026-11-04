import React from 'react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative w-full h-[100svh] lg:h-screen flex flex-col items-center justify-center overflow-hidden bg-brand-ivory">
      
      {/* User-provided hero background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-background.jpg" 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay to ensure text is readable */}
        <div className="absolute inset-0 bg-brand-ivory/30 mix-blend-overlay" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-brand-sage-deep font-sans uppercase tracking-[0.3em] sm:tracking-[0.4em] text-[9px] sm:text-[11px] font-semibold mb-8 sm:mb-12"
        >
          TOGETHER WITH THEIR FAMILIES
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="flex flex-col items-center mb-8 sm:mb-12"
        >
          <h1 className="font-serif text-brand-dark text-6xl sm:text-7xl lg:text-8xl leading-none font-light tracking-wide">
            Tharuka
          </h1>
          <span className="font-serif text-brand-dark italic text-4xl sm:text-5xl lg:text-6xl font-light my-2">
            &
          </span>
          <h1 className="font-serif text-brand-dark text-6xl sm:text-7xl lg:text-8xl leading-none font-light tracking-wide">
            Kumesha
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex flex-col items-center"
        >
          <p className="font-sans text-brand-dark uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-8 max-w-sm leading-relaxed">
            INVITE YOU TO CELEBRATE<br />
            THE BEGINNING OF THEIR FOREVER
          </p>

          <div className="w-16 h-[1px] bg-brand-sage mb-8" />

          <div className="flex flex-col items-center gap-2 font-sans text-brand-dark uppercase tracking-[0.2em] text-[10px] sm:text-xs">
            <p>WEDNESDAY · 9 DECEMBER 2026</p>
            <div className="w-1 h-1 rounded-full bg-brand-champagne my-2" />
            <p>FROM 9:00 AM ONWARDS</p>
            <div className="w-1 h-1 rounded-full bg-brand-champagne my-2" />
            <p>GRAND BALLROOM · HOTEL GREEN COURT</p>
            <p>HOMAGAMA, SRI LANKA</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <span className="font-sans uppercase tracking-[0.3em] text-brand-sage-deep text-[8px] sm:text-[9px]">
          SCROLL TO EXPLORE
        </span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-brand-sage"
        />
      </motion.div>

    </section>
  );
};
