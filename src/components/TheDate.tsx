import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const TheDate: React.FC = () => {
  const targetDate = new Date("2026-12-09T09:00:00");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeBlock = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center justify-center w-16 sm:w-24">
      <span className="font-serif text-brand-dark text-3xl sm:text-4xl font-light leading-none mb-2">
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-sans uppercase tracking-[0.2em] text-brand-sage-deep text-[8px] sm:text-[9px] font-semibold">
        {label}
      </span>
    </div>
  );

  return (
    <section id="the-day" className="w-full py-32 sm:py-48 bg-brand-ivory relative overflow-hidden">


      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="md:w-1/2 text-center md:text-right"
          >
            <h2 className="font-serif text-brand-dark text-4xl sm:text-5xl lg:text-6xl font-light">
              THE DAY
            </h2>
          </motion.div>
          
          <div className="hidden md:block w-[1px] h-32 bg-brand-champagne/40" />

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start"
          >
            <div className="font-serif text-brand-dark text-[8rem] sm:text-[10rem] lg:text-[12rem] leading-none mb-4 font-light">
              09
            </div>
            <div className="font-sans uppercase tracking-[0.3em] text-brand-sage-deep text-sm sm:text-base space-y-2">
              <p>DECEMBER 2026</p>
              <p>WEDNESDAY</p>
            </div>
          </motion.div>

        </div>

        {/* Simple Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 sm:mt-32 flex justify-center"
        >
          <div className="flex items-center gap-2 sm:gap-6 border-t border-brand-champagne/40 pt-12">
            <TimeBlock value={timeLeft.days} label="DAYS" />
            <div className="w-[1px] h-8 sm:h-12 bg-brand-champagne/40" />
            <TimeBlock value={timeLeft.hours} label="HOURS" />
            <div className="w-[1px] h-8 sm:h-12 bg-brand-champagne/40" />
            <TimeBlock value={timeLeft.minutes} label="MINUTES" />
            <div className="w-[1px] h-8 sm:h-12 bg-brand-champagne/40" />
            <TimeBlock value={timeLeft.seconds} label="SECONDS" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
