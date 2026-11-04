import React from 'react';
import { motion } from 'motion/react';

const photos = [
  { src: '/pre/couple-1.jpg', alt: 'Tharuka and Kumesha in the garden' },
  { src: '/pre/couple-2.jpg', alt: 'Tharuka and Kumesha, foreheads touching' },
  { src: '/pre/couple-3.jpg', alt: 'Tharuka and Kumesha smiling together' },
  { src: '/pre/couple-4.jpg', alt: 'Tharuka and Kumesha with the bouquet' },
];

export const OurMoments: React.FC = () => {
  return (
    <section id="moments" className="w-full py-32 sm:py-48 bg-brand-ivory px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1 }}
        className="text-center mb-16 sm:mb-24"
      >
        <span className="font-sans uppercase tracking-[0.4em] text-brand-sage-deep text-[10px] font-semibold">
          OUR MOMENTS
        </span>
        <h2 className="font-serif text-brand-dark text-4xl sm:text-5xl font-light tracking-wide mt-6">
          Tharuka &amp; Kumesha
        </h2>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-2 gap-3 sm:gap-6">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1, delay: (i % 2) * 0.2 }}
            className={`overflow-hidden aspect-[2/3] ${i % 2 === 1 ? 'mt-10 sm:mt-20' : ''}`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-[1500ms] hover:scale-105"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
