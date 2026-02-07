import React from 'react';
import { motion } from 'framer-motion';

interface RoseVisualProps {
  isBloomed: boolean;
  onClick?: () => void;
  className?: string;
}

const RoseVisual: React.FC<RoseVisualProps> = ({ isBloomed, onClick, className = '' }) => {
  // Animation variants
  const centerVariant = {
    closed: { scale: 0.8, rotate: 0 },
    open: { scale: 1, rotate: 360, transition: { duration: 3, ease: "easeInOut" } }
  };

  const petalVariant = (angle: number, distance: number, delay: number) => ({
    closed: { 
      rotate: 0, 
      scale: 0.5, 
      x: 0, 
      y: 0, 
      opacity: 1 
    },
    open: { 
      rotate: angle, 
      scale: 1.1, 
      x: Math.cos(angle * (Math.PI / 180)) * distance, 
      y: Math.sin(angle * (Math.PI / 180)) * distance,
      opacity: 1,
      transition: { duration: 2.5, delay: delay, ease: "backOut" }
    }
  });

  return (
    <motion.div 
      className={`relative w-64 h-64 cursor-pointer ${className}`} 
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Glow effect behind */}
        <motion.div 
          className="absolute w-40 h-40 bg-rose-400 rounded-full blur-[50px] opacity-40"
          animate={{ 
            scale: isBloomed ? [1, 1.2, 1] : 1,
            opacity: isBloomed ? 0.6 : 0.3
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Outer Petals Layer 2 (Background) */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <motion.div
            key={`outer-${i}`}
            className="absolute w-24 h-24 bg-rose-500 rounded-full shadow-md origin-center border border-rose-400/30"
            style={{ borderRadius: "50% 50% 50% 0" }}
            variants={petalVariant(angle + 36, 40, 0.2)}
            initial="closed"
            animate={isBloomed ? "open" : "closed"}
          />
        ))}

        {/* Inner Petals Layer 1 */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <motion.div
            key={`inner-${i}`}
            className="absolute w-20 h-20 bg-rose-600 rounded-full shadow-inner origin-center border-t border-rose-300/40"
            style={{ 
              borderRadius: "50% 50% 0 50%",
              background: "radial-gradient(circle at 30% 30%, #f43f5e, #be123c)"
            }}
            variants={petalVariant(angle, 25, 0.5)}
            initial="closed"
            animate={isBloomed ? "open" : "closed"}
          />
        ))}

        {/* Center Bud / Core */}
        <motion.div
          className="absolute w-16 h-16 z-20"
          variants={centerVariant}
          initial="closed"
          animate={isBloomed ? "open" : "closed"}
        >
          {/* Detailed Center */}
          <div className="w-full h-full relative">
             <div className="absolute inset-0 bg-rose-800 rounded-full transform rotate-45" style={{ borderRadius: "50% 0 50% 50%" }}></div>
             <div className="absolute inset-1 bg-rose-700 rounded-full transform rotate-[60deg]" style={{ borderRadius: "50% 50% 0 50%" }}></div>
             <div className="absolute inset-2 bg-rose-900 rounded-full transform rotate-[120deg] opacity-80" style={{ borderRadius: "0 50% 50% 50%" }}></div>
          </div>
        </motion.div>

        {/* Stem (Visible only slightly) */}
        <motion.div 
          className="absolute top-1/2 left-1/2 w-2 h-40 bg-green-700 origin-top -z-10 rounded-full"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1, rotate: 5 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{ x: '-50%' }}
        />
        
        {/* Leaves */}
        <motion.div
          className="absolute top-[60%] left-[-20px] w-12 h-6 bg-green-600 rounded-full -z-10"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: -30 }}
          transition={{ delay: 1, duration: 1 }}
          style={{ borderRadius: "0 50% 0 50%" }}
        />
        <motion.div
          className="absolute top-[70%] right-[-20px] w-10 h-6 bg-green-600 rounded-full -z-10"
          initial={{ scale: 0, rotate: 45 }}
          animate={{ scale: 1, rotate: 30 }}
          transition={{ delay: 1.2, duration: 1 }}
          style={{ borderRadius: "50% 0 50% 0" }}
        />
      </div>
    </motion.div>
  );
};

export default RoseVisual;