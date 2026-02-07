import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Background from './components/Background';
import RoseVisual from './components/RoseVisual';
import Modal from './components/Modal';
import MusicControl from './components/MusicControl';
import { SECTIONS, MUSIC_URL } from './constants';
import { SectionId } from './types';
import confetti from 'canvas-confetti';

const App: React.FC = () => {
  const [isBloomed, setIsBloomed] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<SectionId | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleBloom = () => {
    if (!isBloomed) {
      setIsBloomed(true);
      setIsAudioPlaying(true);
    }
  };

  const handleSectionClick = (id: SectionId) => {
    setActiveSectionId(id);
    triggerSectionEffect(id);
  };

  const triggerSectionEffect = (id: SectionId) => {
    switch (id) {
      case SectionId.SPECIAL:
        triggerSpecialEffect();
        break;
      case SectionId.MOMENTS:
        triggerMomentsEffect();
        break;
      case SectionId.FEEL:
        triggerFeelEffect();
        break;
      case SectionId.TODAY:
        triggerTodayEffect();
        break;
      case SectionId.FOREVER:
        triggerForeverEffect();
        break;
    }
  };

  // 1. Special: Golden Stars Burst
  const triggerSpecialEffect = () => {
    const defaults = { spread: 360, ticks: 50, gravity: 0, decay: 0.94, startVelocity: 30, shapes: ['star'] };
    
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      colors: ['#FFD700', '#FFA500', '#F0E68C', '#ffffff'],
      origin: { y: 0.6 } // Center-ish
    });

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ['circle'],
      colors: ['#FFD700'],
      origin: { y: 0.6 }
    });
  };

  // 2. Moments: Soft Pastel Drift (Like falling memories)
  const triggerMomentsEffect = () => {
    const end = Date.now() + 2000;
    const colors = ['#f9a8d4', '#d8b4fe', '#818cf8', '#fde047'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        shapes: ['circle'],
        scalar: 0.8,
        drift: 0.5,
        gravity: 0.5
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        shapes: ['circle'],
        scalar: 0.8,
        drift: -0.5,
        gravity: 0.5
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  // 3. Feel: Deep Heartbeat Fountain
  const triggerFeelEffect = () => {
    const duration = 1500;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 20 * (timeLeft / duration);
      // Rising from bottom center
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 100,
        origin: { x: 0.5, y: 0.8 },
        colors: ['#be123c', '#fb7185', '#e11d48'],
        shapes: ['circle'], // Standard shape but deep red
        gravity: 0.6,
        scalar: 1.2
      });
    }, 200);
  };

  // 4. Today: Joyous Side Cannons (Existing but brighter)
  const triggerTodayEffect = () => {
    const duration = 2000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#fb7185', '#f43f5e', '#ffe4e6']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#fb7185', '#f43f5e', '#ffe4e6']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  // 5. Forever: Fireworks Celebration
  const triggerForeverEffect = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 40 * (timeLeft / duration);
      
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, 
        particleCount,
        origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const activeContent = SECTIONS.find(s => s.id === activeSectionId);

  // Calculate petal button positions
  const getPetalPosition = (index: number, total: number) => {
    const radius = 180; // Distance from center
    const angleStep = 360 / total;
    const angle = -90 + (index * angleStep);
    const radian = (angle * Math.PI) / 180;
    
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius,
    };
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-rose-50 selection:bg-rose-200">
      
      <Background />
      
      {/* Audio Control */}
      <AnimatePresence>
        {isBloomed && (
          <MusicControl 
            isPlaying={isAudioPlaying} 
            onToggle={() => setIsAudioPlaying(!isAudioPlaying)} 
            audioUrl={MUSIC_URL}
          />
        )}
      </AnimatePresence>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-[600px] w-full max-w-4xl mx-auto p-4">
        
        {/* Header Text Area - Increased margin-bottom to avoid overlap */}
        <div className="z-20 text-center mb-24 pointer-events-none">
          <motion.h1 
            className="text-4xl md:text-6xl font-handwriting text-rose-800 mb-6 drop-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: isBloomed ? 1.05 : 1,
              textShadow: isBloomed ? "0 0 25px rgba(244, 63, 94, 0.4)" : "none"
            }}
            transition={{ duration: 1.5 }}
          >
            For Anagha
          </motion.h1>

          <div className="space-y-3">
            <motion.p 
              className="text-lg md:text-2xl font-serif-heading text-rose-700 italic leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                color: isBloomed ? "#be123c" : "#be123c"
              }}
              transition={{ delay: 1.5, duration: 1.5 }}
            >
              Some flowers bloom once a year…
            </motion.p>
            
            <motion.p 
              className="text-lg md:text-2xl font-serif-heading text-rose-700 italic leading-relaxed"
              initial={{ opacity: 0, y: 15 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                textShadow: isBloomed ? "0 0 15px rgba(251, 113, 133, 0.3)" : "none"
              }}
              transition={{ delay: 3.5, duration: 1.5 }}
            >
              but this one blooms every time I think of you.
            </motion.p>
          </div>
        </div>

        {/* Central Rose Area */}
        <div className="relative flex items-center justify-center">
          <RoseVisual 
            isBloomed={isBloomed} 
            onClick={handleBloom}
            className="z-20 transition-transform duration-1000"
          />

          {/* Navigation Petals */}
          <AnimatePresence>
            {isBloomed && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {SECTIONS.map((section, index) => {
                  const pos = getPetalPosition(index, SECTIONS.length);
                  return (
                    <motion.button
                      key={section.id}
                      onClick={() => handleSectionClick(section.id)}
                      className="absolute pointer-events-auto group"
                      initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                      animate={{ 
                        opacity: 1, 
                        x: pos.x, 
                        y: pos.y, 
                        scale: 1 
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ 
                        delay: 0.5 + (index * 0.2), 
                        type: "spring", 
                        stiffness: 100 
                      }}
                      whileHover={{ scale: 1.15, zIndex: 50 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Petal Shape Button */}
                      <div className="relative flex flex-col items-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-white/40 backdrop-blur-md rounded-full shadow-[0_4px_20px_rgba(244,63,94,0.2)] border border-rose-200 flex items-center justify-center group-hover:bg-rose-50 group-hover:border-rose-300 transition-colors">
                           <span className="text-2xl">🌸</span>
                        </div>
                        <motion.span 
                          className="absolute top-full mt-2 w-max px-3 py-1 bg-white/80 rounded-full text-xs font-semibold text-rose-800 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {section.petalLabel}
                        </motion.span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Instruction Text - Fade out on bloom */}
        <AnimatePresence>
          {!isBloomed && (
            <motion.div
              className="absolute bottom-[-60px] md:bottom-[-80px] text-rose-400 text-sm font-body tracking-widest uppercase animate-pulse pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 5.5, duration: 1 }}
            >
              Touch the rose 🌹
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Footer */}
      <footer className="fixed bottom-4 w-full text-center text-rose-300 text-sm font-body opacity-60 hover:opacity-100 transition-opacity duration-500">
        bubu loves you ♡
      </footer>

      {/* Content Modal */}
      <Modal 
        isOpen={!!activeSectionId} 
        onClose={() => setActiveSectionId(null)}
        title={activeContent?.title || ''}
      >
        {activeContent?.content}
      </Modal>

    </div>
  );
};

export default App;