import React from 'react';
import { motion } from 'motion/react';

export const OurBeginning: React.FC = () => {
  return (
    <section className="w-full py-32 sm:py-48 bg-brand-cream flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-2xl flex flex-col items-center"
      >
        <span className="font-sans uppercase tracking-[0.4em] text-brand-sage-deep text-[10px] mb-8 font-semibold">
          OUR BEGINNING
        </span>
        
        <h2 className="font-serif text-brand-dark text-4xl sm:text-5xl lg:text-6xl leading-[1.3] font-light mb-12">
          “Two hearts, one journey,<br className="hidden sm:block" />
          one beautiful beginning.”
        </h2>

      </motion.div>
    </section>
  );
};
