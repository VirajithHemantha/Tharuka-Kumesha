import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface CountdownProps {
  targetDate: Date;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
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
  }, [targetDate]);

  const TimeBlock = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center justify-center w-20 sm:w-28">
      <span className="font-serif text-brand-dark text-5xl sm:text-7xl font-light leading-none mb-4">
        {String(value).padStart(2, '0')}
      </span>
      <span className="font-sans uppercase tracking-[0.3em] text-brand-sage-deep text-[9px] sm:text-[10px] font-semibold">
        {label}
      </span>
    </div>
  );

  return (
    <section className="w-full py-32 sm:py-48 bg-brand-ivory flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h3 className="font-sans uppercase tracking-[0.4em] text-brand-sage-deep text-[10px] sm:text-xs font-semibold mb-16">
          COUNTING DOWN TO FOREVER
        </h3>

        <div className="flex items-center justify-center gap-4 sm:gap-8">
          <TimeBlock value={timeLeft.days} label="DAYS" />
          <div className="w-[1px] h-16 sm:h-20 bg-brand-champagne/60" />
          <TimeBlock value={timeLeft.hours} label="HOURS" />
          <div className="w-[1px] h-16 sm:h-20 bg-brand-champagne/60" />
          <TimeBlock value={timeLeft.minutes} label="MINUTES" />
          <div className="w-[1px] h-16 sm:h-20 bg-brand-champagne/60" />
          <TimeBlock value={timeLeft.seconds} label="SECONDS" />
        </div>
      </motion.div>
    </section>
  );
};
