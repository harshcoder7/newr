import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  const [elements, setElements] = useState<number[]>([]);

  useEffect(() => {
    // Create random particles
    const count = 20;
    const arr = Array.from({ length: count }, (_, i) => i);
    setElements(arr);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-white to-rose-100 opacity-80" />
      
      {/* Floating Petals/Circles */}
      {elements.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-rose-300/30 blur-sm"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
            opacity: 0,
            scale: 0.5 + Math.random() * 0.5,
          }}
          animate={{
            y: -100,
            opacity: [0, 0.5, 0],
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
          style={{
            width: 10 + Math.random() * 20,
            height: 10 + Math.random() * 20,
          }}
        />
      ))}
      
      {/* Sparkles */}
      {elements.slice(0, 10).map((i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute bg-yellow-200 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: 2,
            height: 2,
            boxShadow: "0 0 4px #fbbf24",
          }}
        />
      ))}
    </div>
  );
};

export default Background;