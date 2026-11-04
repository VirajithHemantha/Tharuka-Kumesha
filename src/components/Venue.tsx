import React from 'react';
import { motion } from 'motion/react';

export const Venue: React.FC = () => {
  return (
    <section id="venue" className="w-full py-32 sm:py-48 bg-brand-ivory flex flex-col items-center">
      <div className="w-full max-w-[1200px] px-6 relative flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full max-w-[340px] aspect-[232/332] overflow-hidden shadow-xl"
        >
          <img
            src="/pre/hotel-venue.jpg"
            alt="Grand Ballroom, Hotel Green Court" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="bg-brand-ivory/95 backdrop-blur-sm p-12 sm:p-16 text-center w-[90%] sm:w-auto -mt-16 sm:-mt-24 relative z-10 mx-auto"
        >
          <h3 className="font-serif text-brand-dark text-3xl sm:text-4xl lg:text-5xl font-light mb-2">
            GRAND BALLROOM
          </h3>
          <p className="font-serif text-brand-sage-deep text-lg sm:text-xl italic mb-10">
            Hotel Green Court, Homagama
          </p>

          <a 
            href="https://www.google.com/maps/search/?api=1&query=Hotel+Green+Court+Homagama" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-brand-ivory border border-brand-champagne text-brand-dark font-sans uppercase tracking-[0.2em] text-[10px] sm:text-xs px-10 py-4 hover:bg-brand-champagne/10 transition-colors duration-300"
          >
            VIEW LOCATION
          </a>
        </motion.div>

      </div>
    </section>
  );
};
