import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Google Apps Script Web App (writes RSVPs to the wedding Google Sheet).
const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwG3cDUuM-91QvYJ134wacU8nlaCeMbHigDbAf8oNbQ96Q2xvkusl01fPUwV-dCg3nq/exec';

const emptyForm = { name: '', guests: '', attendance: '', message: '' };

export const RSVPSection: React.FC<{ guestName?: string }> = ({ guestName = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ ...emptyForm, name: guestName });

  const update = (field: keyof typeof emptyForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const body = new URLSearchParams({ sheet: 'RSVP', ...form });
      // no-cors: Apps Script doesn't send CORS headers; the row is still written.
      await fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body });
      setStatus('success');
      setForm({ ...emptyForm, name: guestName });
      setTimeout(() => {
        setIsOpen(false);
        setStatus('idle');
      }, 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="rsvp" className="w-full py-32 sm:py-48 bg-brand-cream flex flex-col items-center text-center px-6">
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-2xl flex flex-col items-center"
      >
        <span className="font-sans uppercase tracking-[0.4em] text-brand-sage-deep text-[10px] font-semibold mb-8">
          KINDLY JOIN US
        </span>
        
        <p className="font-serif text-brand-dark text-3xl sm:text-4xl lg:text-5xl leading-snug font-light mb-12">
          Your presence would mean the world to us as we celebrate this beautiful beginning together.
        </p>

        <span className="font-sans uppercase tracking-[0.2em] text-brand-sage-deep text-xs mb-12">
          RSVP BY 20 NOVEMBER 2026
        </span>

        <button 
          onClick={() => setIsOpen(true)}
          className="bg-brand-sage-deep text-brand-ivory font-sans uppercase tracking-[0.2em] text-[10px] sm:text-xs px-12 py-5 hover:bg-brand-champagne hover:text-brand-dark transition-colors duration-500"
        >
          RSVP NOW
        </button>
      </motion.div>

      {/* RSVP Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-ivory/95 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="bg-brand-white p-8 sm:p-12 w-full max-w-lg border border-brand-champagne/30 shadow-2xl relative"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-brand-sage-deep hover:text-brand-dark font-sans text-xl"
              >
                ✕
              </button>
              
              {status === 'success' ? (
                <div className="py-12 text-center">
                  <h3 className="font-serif text-brand-dark text-3xl mb-4">Thank You</h3>
                  <p className="font-sans text-brand-sage-deep text-sm">Your response has been received.</p>
                </div>
              ) : (
                <>
                  <h3 className="font-sans uppercase tracking-[0.3em] text-brand-sage-deep text-[10px] font-semibold mb-8 text-center">
                    WE WOULD LOVE TO HEAR FROM YOU
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    {guestName ? (
                      <div className="text-center border-b border-brand-champagne/50 pb-5">
                        <p className="font-sans text-brand-sage-deep text-[10px] uppercase tracking-[0.25em] mb-2">Responding as</p>
                        <p className="font-serif italic text-brand-dark text-2xl">{guestName}</p>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="text"
                          required
                          placeholder="Guest Name"
                          value={form.name}
                          onChange={update('name')}
                          className="w-full bg-transparent border-b border-brand-champagne/50 py-3 font-serif text-lg text-brand-dark placeholder:text-brand-sage-deep focus:outline-none focus:border-brand-sage-deep transition-colors rounded-none"
                        />
                      </div>
                    )}
                    
                    <div>
                      <select 
                        required
                        value={form.guests}
                        onChange={update('guests')}
                        className="w-full bg-transparent border-b border-brand-champagne/50 py-3 font-serif text-lg text-brand-dark focus:outline-none focus:border-brand-sage-deep transition-colors rounded-none appearance-none"
                      >
                        <option value="" disabled>Number of Guests</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>

                    <div className="pt-2">
                      <p className="font-sans text-brand-sage-deep text-xs uppercase tracking-[0.1em] mb-3">Attendance</p>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 font-serif text-brand-dark cursor-pointer">
                          <input type="radio" name="attendance" value="Joyfully Accepts" checked={form.attendance === 'Joyfully Accepts'} onChange={update('attendance')} required className="accent-brand-sage-deep" />
                          Joyfully Accepts
                        </label>
                        <label className="flex items-center gap-2 font-serif text-brand-dark cursor-pointer">
                          <input type="radio" name="attendance" value="Regretfully Declines" checked={form.attendance === 'Regretfully Declines'} onChange={update('attendance')} required className="accent-brand-sage-deep" />
                          Regretfully Declines
                        </label>
                      </div>
                    </div>

                    <div>
                      <textarea 
                        placeholder="Message (Optional)"
                        value={form.message}
                        onChange={update('message')}
                        rows={3}
                        className="w-full bg-transparent border-b border-brand-champagne/50 py-3 font-serif text-lg text-brand-dark placeholder:text-brand-sage-deep focus:outline-none focus:border-brand-sage-deep transition-colors rounded-none resize-none mt-4"
                      />
                    </div>

                    {status === 'error' && (
                      <p className="font-sans text-red-700 text-xs text-center">
                        Something went wrong. Please check your connection and try again.
                      </p>
                    )}

                    <button 
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full mt-8 bg-brand-sage-deep text-brand-ivory font-sans uppercase tracking-[0.2em] text-[10px] sm:text-xs py-5 hover:bg-brand-champagne hover:text-brand-dark transition-colors duration-500 disabled:opacity-60 disabled:cursor-wait"
                    >
                      {status === 'sending' ? 'SENDING…' : 'CONFIRM RSVP'}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
