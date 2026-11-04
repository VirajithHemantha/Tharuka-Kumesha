import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'HOME', href: '#home' },
  { label: 'MOMENTS', href: '#moments' },
  { label: 'THE DAY', href: '#the-day' },
  { label: 'DETAILS', href: '#details' },
  { label: 'VENUE', href: '#venue' },
  { label: 'RSVP', href: '#rsvp' },
];

export const FloatingNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero a bit
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navigation (Top discreet) */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:block fixed top-0 left-0 w-full z-40 bg-brand-ivory/90 backdrop-blur-md border-b border-brand-champagne/30"
      >
        <div className="max-w-[1400px] mx-auto px-12 h-20 flex items-center justify-between">
          <span className="font-serif text-brand-dark text-2xl italic tracking-wide">T & K</span>
          <div className="flex items-center gap-10">
            {navItems.map(item => (
              <button 
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="font-sans uppercase tracking-[0.2em] text-[10px] text-brand-sage-deep hover:text-brand-dark transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Floating Menu Button */}
      <AnimatePresence>
        {isVisible && !isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="lg:hidden fixed top-6 right-6 z-50 w-12 h-12 bg-brand-ivory/90 backdrop-blur-md border border-brand-champagne/50 rounded-full flex items-center justify-center shadow-sm"
          >
            <Menu className="w-5 h-5 text-brand-sage-deep" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-brand-ivory flex flex-col items-center justify-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center"
            >
              <X className="w-6 h-6 text-brand-sage-deep" />
            </button>

            <div className="flex flex-col items-center gap-10">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollTo(item.href)}
                  className="font-sans uppercase tracking-[0.3em] text-xs text-brand-sage-deep hover:text-brand-dark transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
