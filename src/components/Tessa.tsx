import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Coffee, Target, Zap } from 'lucide-react';

interface TessaProps {
  message?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  showAvatar?: boolean;
}

const tessaQuotes = [
  "Another one bites the dust... Audit complete! 🎯",
  "Whoa! That's the longest sales call I've ever heard. Coffee, anyone? ☕",
  "That rep crushed it — not a single red flag. Tessa approves ✅",
  "Putting on my detective glasses... 🕵️‍♀️",
  "Time to separate the pros from the... well, not-so-pros 😏",
  "I live for this stuff! Let's audit some calls! 🚀",
  "Another day, another perfectly analyzed conversation 💯",
  "Some calls are diamonds, others are... educational 📚"
];

export const Tessa: React.FC<TessaProps> = ({ 
  message, 
  position = 'bottom-right',
  showAvatar = true 
}) => {
  const [currentMessage, setCurrentMessage] = useState(message || '');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setCurrentMessage(message);
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 4000);
      return () => clearTimeout(timer);
    } else {
      // Random Tessa quote every 30 seconds
      const interval = setInterval(() => {
        const randomQuote = tessaQuotes[Math.floor(Math.random() * tessaQuotes.length)];
        setCurrentMessage(randomQuote);
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 3000);
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [message]);

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 flex items-end gap-3`}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: position.includes('right') ? 20 : -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: position.includes('right') ? 20 : -20 }}
            className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-2xl px-4 py-3 shadow-xl max-w-xs"
          >
            <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
              {currentMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {showAvatar && (
        <motion.div
          className="relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg animate-pulse-glow cursor-pointer">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-lime-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export const TessaMessage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary-50 to-cyan-50 dark:from-primary-900/20 dark:to-cyan-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4 mb-4"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300">
          {children}
        </div>
      </div>
    </motion.div>
  );
};