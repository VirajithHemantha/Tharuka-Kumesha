import React from 'react';
import { motion } from 'motion/react';

export const CelebrationDetails: React.FC = () => {
  return (
    <section id="details" className="w-full py-32 sm:py-48 bg-brand-cream relative">
      <div className="max-w-4xl mx-auto px-6">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <h2 className="font-serif text-brand-dark text-4xl sm:text-5xl font-light tracking-wide">
            THE CELEBRATION
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-8">
          
          {/* Ceremony */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 flex flex-col items-center text-center w-full"
          >
            <span className="font-sans uppercase tracking-[0.3em] text-brand-sage-deep text-[10px] font-semibold mb-6">
              OPENING
            </span>
            <p className="font-serif text-brand-dark text-3xl font-light mb-6">
              9:00 AM
            </p>
            <div className="w-12 h-[1px] bg-brand-champagne" />
          </motion.div>

          {/* Reception */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex-1 flex flex-col items-center text-center w-full"
          >
            <span className="font-sans uppercase tracking-[0.3em] text-brand-sage-deep text-[10px] font-semibold mb-6">
              PORUWA CEREMONY
            </span>
            <p className="font-serif text-brand-dark text-3xl font-light mb-6">
              9:20 AM
            </p>
            <div className="w-12 h-[1px] bg-brand-champagne" />
          </motion.div>

          {/* Venue */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex-1 flex flex-col items-center text-center w-full"
          >
            <span className="font-sans uppercase tracking-[0.3em] text-brand-sage-deep text-[10px] font-semibold mb-6">
              VENUE
            </span>
            <p className="font-serif text-brand-dark text-2xl font-light mb-2 leading-snug">
              Grand Ballroom
            </p>
            <p className="font-serif text-brand-sage-deep text-lg italic mb-6">
              Hotel Green Court, Homagama
            </p>
            <div className="w-12 h-[1px] bg-brand-champagne" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
