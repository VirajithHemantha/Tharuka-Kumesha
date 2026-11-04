import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Toaster } from 'sonner';

import { EnvelopeOpening } from './components/EnvelopeOpening';
import { Hero } from './components/Hero';
import { OurBeginning } from './components/OurBeginning';
import { OurMoments } from './components/OurMoments';
import { TheDate } from './components/TheDate';
import { CelebrationDetails } from './components/CelebrationDetails';
import { Venue } from './components/Venue';

import { RSVPSection } from './components/RSVPSection';
import { FloatingNav } from './components/FloatingNav';
import { MusicControl } from './components/MusicControl';
import { FloatingPetals } from './components/FloatingPetals';
import { readGuestFromUrl } from './guest';

const guestName = readGuestFromUrl();

export default function App() {
  const [showInvitation, setShowInvitation] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/bg-music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    audioRef.current.preload = 'auto';

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleMusicStart = () => {
    setIsMusicPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  if (!showInvitation) {
    return (
      <EnvelopeOpening
        onComplete={() => setShowInvitation(true)}
        onMusicStart={handleMusicStart}
        guestName={guestName}
      />
    );
  }

  return (
    <div className="font-sans text-brand-dark bg-brand-ivory bg-texture-noise overflow-hidden relative">
      <Toaster position="top-center" />
      
      <FloatingNav />
      <MusicControl isMusicPlaying={isMusicPlaying} toggleMusic={toggleMusic} />
      <FloatingPetals />

      <main className="relative z-10 flex flex-col items-center w-full max-w-[1400px] mx-auto">
        <Hero />
        <OurBeginning guestName={guestName} />
        <OurMoments />
        <TheDate />
        <CelebrationDetails />
        <Venue />

        <RSVPSection guestName={guestName} />
      </main>

      {/* Subtle Invite Mint Branding */}
      <footer className="py-24 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] font-sans text-brand-sage-deep opacity-60">
          INVITE MINT
        </p>
        <p className="text-brand-sage-deep text-xs mt-2 font-sans tracking-wider px-6">
          Want a beautiful wedding website like this? Create yours with{' '}
          <a
            target="_blank"
            rel="noreferrer"
            className="text-brand-champagne font-semibold underline underline-offset-2 hover:text-brand-dark transition-colors"
            href="https://wa.me/94707819074"
          >
            invitemint
          </a>
        </p>
      </footer>
    </div>
  );
}
