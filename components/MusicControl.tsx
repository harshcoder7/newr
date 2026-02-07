import React, { useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

interface MusicControlProps {
  isPlaying: boolean;
  onToggle: () => void;
  audioUrl: string;
}

const MusicControl: React.FC<MusicControlProps> = ({ isPlaying, onToggle, audioUrl }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }

    if (isPlaying) {
      // Small delay to ensure interaction policies are met if called immediately after click
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Audio play failed (likely policy):", error);
        });
      }
    } else {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isPlaying, audioUrl]);

  return (
    <motion.button
      onClick={onToggle}
      className="fixed top-6 right-6 z-50 p-3 bg-white/50 backdrop-blur-md rounded-full shadow-lg border border-rose-100 text-rose-600 hover:bg-white hover:text-rose-800 transition-all"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
    </motion.button>
  );
};

export default MusicControl;