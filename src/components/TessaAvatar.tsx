import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Coffee, 
  Sparkles, 
  Eye, 
  CheckCircle, 
  AlertTriangle,
  Clock,
  Zap,
  Heart,
  Star,
  Target,
  Award
} from 'lucide-react';

interface TessaAvatarProps {
  mood?: 'thinking' | 'happy' | 'sarcastic' | 'celebrating' | 'working' | 'concerned';
  message?: string;
  showBubble?: boolean;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'sm' | 'md' | 'lg';
}

const tessaQuotes = {
  thinking: [
    "Hmm, let me put on my detective hat... 🕵️‍♀️",
    "Something's not adding up here...",
    "Analyzing the evidence... 🔍",
    "My spidey senses are tingling..."
  ],
  happy: [
    "That was a stellar performance! ⭐",
    "No red flags here - Tessa approved! ✅",
    "This rep deserves a gold star! 🌟",
    "Smooth as silk! Love to see it 💫"
  ],
  sarcastic: [
    "Well, that was... interesting 😏",
    "Did they forget they were on a sales call? 🤔",
    "I've heard more enthusiasm at a funeral...",
    "Note to self: recommend coffee before calls ☕"
  ],
  celebrating: [
    "Boom! Another audit in the books! 🎉",
    "We're on fire today! 🔥",
    "That's what I call teamwork! 💪",
    "Victory dance time! 💃"
  ],
  working: [
    "Crunching through this call like popcorn... 🍿",
    "My circuits are buzzing with activity! ⚡",
    "Processing at light speed! 🚀",
    "Just another day at the audit office..."
  ],
  concerned: [
    "Houston, we have a problem... 🚨",
    "This needs some TLC, stat! 💊",
    "Red flags are waving everywhere! 🚩",
    "Time for some coaching magic! ✨"
  ]
};

export const TessaAvatar: React.FC<TessaAvatarProps> = ({
  mood = 'thinking',
  message,
  showBubble = true,
  position = 'bottom-right',
  size = 'md'
}) => {
  const [currentMessage, setCurrentMessage] = useState(message || '');
  const [isVisible, setIsVisible] = useState(false);
  const [currentMood, setCurrentMood] = useState(mood);

  useEffect(() => {
    if (message) {
      setCurrentMessage(message);
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 4000);
      return () => clearTimeout(timer);
    } else {
      // Random Tessa quote every 45 seconds
      const interval = setInterval(() => {
        const quotes = tessaQuotes[currentMood];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        setCurrentMessage(randomQuote);
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 3500);
      }, 45000);
      return () => clearInterval(interval);
    }
  }, [message, currentMood]);

  useEffect(() => {
    setCurrentMood(mood);
  }, [mood]);

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const getMoodIcon = () => {
    switch (currentMood) {
      case 'thinking': return <Search className="w-6 h-6 text-white" />;
      case 'happy': return <CheckCircle className="w-6 h-6 text-white" />;
      case 'sarcastic': return <Eye className="w-6 h-6 text-white" />;
      case 'celebrating': return <Star className="w-6 h-6 text-white" />;
      case 'working': return <Zap className="w-6 h-6 text-white" />;
      case 'concerned': return <AlertTriangle className="w-6 h-6 text-white" />;
      default: return <Sparkles className="w-6 h-6 text-white" />;
    }
  };

  const getMoodColor = () => {
    switch (currentMood) {
      case 'thinking': return 'from-primary-500 to-primary-600';
      case 'happy': return 'from-success-500 to-success-600';
      case 'sarcastic': return 'from-accent-500 to-accent-600';
      case 'celebrating': return 'from-yellow-500 to-orange-500';
      case 'working': return 'from-blue-500 to-cyan-500';
      case 'concerned': return 'from-red-500 to-red-600';
      default: return 'from-primary-500 to-accent-500';
    }
  };

  const getMoodAnimation = () => {
    switch (currentMood) {
      case 'thinking': return 'animate-pulse-soft';
      case 'happy': return 'animate-bounce-gentle';
      case 'celebrating': return 'animate-float';
      case 'working': return 'animate-glow';
      default: return 'animate-pulse-soft';
    }
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 flex items-end gap-3`}>
      <AnimatePresence>
        {isVisible && showBubble && (
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.8, 
              x: position.includes('right') ? 20 : -20,
              y: 10
            }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ 
              opacity: 0, 
              scale: 0.8, 
              x: position.includes('right') ? 20 : -20,
              y: 10
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl px-4 py-3 shadow-glass dark:shadow-glass-dark max-w-xs"
          >
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white/90 dark:bg-gray-800/90 rotate-45 border-r border-b border-white/20 dark:border-gray-700/50"></div>
            <p className="text-sm text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
              {currentMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        className="relative cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (!isVisible) {
            const quotes = tessaQuotes[currentMood];
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            setCurrentMessage(randomQuote);
            setIsVisible(true);
            setTimeout(() => setIsVisible(false), 3500);
          }
        }}
      >
        <div className={`${sizeClasses[size]} bg-gradient-to-br ${getMoodColor()} rounded-full flex items-center justify-center shadow-lg ${getMoodAnimation()}`}>
          {getMoodIcon()}
        </div>
        
        {/* Status indicator */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-success-500 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-800">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary-400 rounded-full"
              animate={{
                y: [-20, -40],
                x: [0, Math.random() * 20 - 10],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeOut"
              }}
              style={{
                left: `${20 + i * 20}%`,
                top: '10%',
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export const TessaInsightBubble: React.FC<{ children: React.ReactNode; type?: 'info' | 'success' | 'warning' | 'tip' }> = ({ 
  children, 
  type = 'info' 
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 border-success-200 dark:border-success-800';
      case 'warning':
        return 'from-yellow-50 to-orange-100 dark:from-yellow-900/20 dark:to-orange-800/20 border-yellow-200 dark:border-yellow-800';
      case 'tip':
        return 'from-accent-50 to-accent-100 dark:from-accent-900/20 dark:to-accent-800/20 border-accent-200 dark:border-accent-800';
      default:
        return 'from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border-primary-200 dark:border-primary-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`bg-gradient-to-r ${getTypeStyles()} backdrop-blur-sm border rounded-2xl p-4 mb-6 shadow-soft dark:shadow-soft-dark`}
    >
      <div className="flex items-start gap-3">
        <motion.div 
          className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center flex-shrink-0"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>
        <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          {children}
        </div>
      </div>
    </motion.div>
  );
};