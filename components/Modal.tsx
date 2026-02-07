import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-rose-950/20 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              className="bg-white/90 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden pointer-events-auto border border-rose-100 relative"
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              {/* Header Pattern */}
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-300 via-rose-500 to-rose-300" />
              
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
              >
                <X size={24} />
              </button>

              <div className="p-8">
                {/* Decorative Heart */}
                <div className="flex justify-center mb-4">
                   <motion.div
                     animate={{ scale: [1, 1.2, 1] }}
                     transition={{ duration: 2, repeat: Infinity }}
                   >
                     <Heart className="text-rose-500 fill-rose-500" size={32} />
                   </motion.div>
                </div>

                <h2 className="text-3xl text-center font-serif-heading text-rose-800 mb-6">{title}</h2>
                
                <div className="font-body text-slate-700">
                  {children}
                </div>
              </div>
              
              {/* Bottom Decoration */}
              <div className="h-12 bg-rose-50 flex items-center justify-center">
                 <span className="text-rose-300 text-sm font-handwriting text-xl">with love</span>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;