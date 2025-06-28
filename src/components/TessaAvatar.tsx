import React, { useState, useEffect, useRef } from 'react';
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
  Award,
  Volume2,
  VolumeX
} from 'lucide-react';

interface TessaAvatarProps {
  mood?: 'thinking' | 'happy' | 'sarcastic' | 'celebrating' | 'working' | 'concerned' | 'idle' | 'shocked';
  message?: string;
  showBubble?: boolean;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  size?: 'sm' | 'md' | 'lg';
  onUploadStart?: boolean;
  onAuditComplete?: boolean;
  onHighFlags?: boolean;
  onFastAudit?: boolean;
}

const tessaQuotes = {
  idle: [
    "Need help? Or just vibing? 😎",
    "I've seen worse dashboards... not many, but a few 🤔",
    "What's the flag count today, champ? 📊",
    "Ready to crack some calls? Let's go! 🕵️‍♀️",
    "Another day, another audit. Let's make it count! ⚡",
    "Tessa's on duty. What's the tea today? ☕"
  ],
  thinking: [
    "Hmm, let me put on my detective hat... 🕵️‍♀️",
    "Something's not adding up here...",
    "Analyzing the evidence... 🔍",
    "My spidey senses are tingling..."
  ],
  happy: [
    "Tessa stamp of approval! No red flags! 🎉",
    "That's how you pitch, baby! 🌟",
    "Smooth as silk! Love to see it 💫",
    "This rep deserves a gold star! ⭐"
  ],
  sarcastic: [
    "Flagged again? Let me guess... monotone voice? 😏",
    "This pitch? Brutal. But hey, we learn 🤷‍♀️",
    "Did they forget they were on a sales call? 🤔",
    "I've heard more enthusiasm at a funeral... ☠️"
  ],
  celebrating: [
    "Boom! Another audit in the books! 🎉",
    "We're on fire today! 🔥",
    "That's what I call teamwork! 💪",
    "Victory dance time! 💃"
  ],
  working: [
    "Uploading... and silently judging your pitch 📤",
    "Crunching through this call like popcorn... 🍿",
    "My circuits are buzzing with activity! ⚡",
    "Processing at light speed! 🚀"
  ],
  concerned: [
    "Houston, we have a problem... 🚨",
    "This needs some TLC, stat! 💊",
    "Red flags are waving everywhere! 🚩",
    "Time for some coaching magic! ✨"
  ],
  shocked: [
    "Whoa! That's the longest sales call I've ever heard ⏰",
    "Coffee, anyone? This is a marathon! ☕",
    "Longest pitch of the week? You owe that client a coffee ☕",
    "That's... impressive. In a concerning way 😅"
  ]
};

const specialMessages = {
  uploadStart: "Uploading... and silently judging your pitch 📤",
  auditComplete: "Tessa stamp of approval! No red flags! 🎉",
  highFlags: "Flagged again? Let me guess... monotone voice? 😏",
  fastAudit: "That's lightning quick! Are you part AI too? ⚡",
  longestCall: "Longest pitch of the week? You owe that client a coffee ☕",
  filterApplied: "Let's see what this week's drama was... 🎭"
};

export const TessaAvatar: React.FC<TessaAvatarProps> = ({
  mood = 'idle',
  message,
  showBubble = true,
  position = 'bottom-right',
  size = 'lg',
  onUploadStart,
  onAuditComplete,
  onHighFlags,
  onFastAudit
}) => {
  const [currentMessage, setCurrentMessage] = useState(message || '');
  const [isVisible, setIsVisible] = useState(false);
  const [currentMood, setCurrentMood] = useState(mood);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle special events
  useEffect(() => {
    if (onUploadStart) {
      setCurrentMessage(specialMessages.uploadStart);
      setCurrentMood('working');
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 4000);
    } else if (onAuditComplete) {
      setCurrentMessage(specialMessages.auditComplete);
      setCurrentMood('celebrating');
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 5000);
    } else if (onHighFlags) {
      setCurrentMessage(specialMessages.highFlags);
      setCurrentMood('sarcastic');
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 4000);
    } else if (onFastAudit) {
      setCurrentMessage(specialMessages.fastAudit);
      setCurrentMood('happy');
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 4000);
    }
  }, [onUploadStart, onAuditComplete, onHighFlags, onFastAudit]);

  useEffect(() => {
    if (message) {
      setCurrentMessage(message);
      setIsVisible(true);
      const timer = setTimeout(() => setIsVisible(false), 4000);
      return () => clearTimeout(timer);
    } else {
      // Random Tessa quote every 30 seconds when idle
      const interval = setInterval(() => {
        if (currentMood === 'idle') {
          const quotes = tessaQuotes[currentMood];
          const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
          setCurrentMessage(randomQuote);
          setIsVisible(true);
          setTimeout(() => setIsVisible(false), 3500);
        }
      }, 30000);
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
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24'
  };

  const getMoodIcon = () => {
    switch (currentMood) {
      case 'thinking': return <Search className="w-6 h-6 text-white" />;
      case 'happy': return <CheckCircle className="w-6 h-6 text-white" />;
      case 'sarcastic': return <Eye className="w-6 h-6 text-white" />;
      case 'celebrating': return <Star className="w-6 h-6 text-white" />;
      case 'working': return <Zap className="w-6 h-6 text-white" />;
      case 'concerned': return <AlertTriangle className="w-6 h-6 text-white" />;
      case 'shocked': return <Clock className="w-6 h-6 text-white" />;
      case 'idle': return <Sparkles className="w-6 h-6 text-white" />;
      default: return <Sparkles className="w-6 h-6 text-white" />;
    }
  };

  const getMoodColor = () => {
    switch (currentMood) {
      case 'thinking': return 'from-blue-500 to-blue-600';
      case 'happy': return 'from-green-500 to-green-600';
      case 'sarcastic': return 'from-purple-500 to-purple-600';
      case 'celebrating': return 'from-yellow-500 to-orange-500';
      case 'working': return 'from-cyan-500 to-blue-500';
      case 'concerned': return 'from-red-500 to-red-600';
      case 'shocked': return 'from-orange-500 to-red-500';
      case 'idle': return 'from-gray-600 to-gray-700';
      default: return 'from-blue-500 to-purple-600';
    }
  };

  const getMoodAnimation = () => {
    switch (currentMood) {
      case 'thinking': return 'animate-pulse';
      case 'happy': return 'animate-bounce';
      case 'celebrating': return 'animate-ping';
      case 'working': return 'animate-spin';
      case 'shocked': return 'animate-pulse';
      default: return '';
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
            className="relative bg-black/90 backdrop-blur-xl border border-gray-800 rounded-2xl px-4 py-3 shadow-2xl max-w-xs"
          >
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-black/90 rotate-45 border-r border-b border-gray-800"></div>
            <p className="text-sm text-white font-medium leading-relaxed">
              {currentMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        className="relative cursor-pointer group"
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
        {/* Video Avatar - Placeholder for now, will be replaced with actual MP4 */}
        <div className={`${sizeClasses[size]} bg-gradient-to-br ${getMoodColor()} rounded-full flex items-center justify-center shadow-2xl border-2 border-gray-800 ${getMoodAnimation()}`}>
          {getMoodIcon()}
        </div>
        
        {/* Status indicator */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-black">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        </div>

        {/* Audio toggle */}
        <motion.button
          className="absolute -top-2 -left-2 w-6 h-6 bg-black/80 rounded-full flex items-center justify-center border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            setIsMuted(!isMuted);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMuted ? <VolumeX className="w-3 h-3 text-white" /> : <Volume2 className="w-3 h-3 text-white" />}
        </motion.button>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
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
        return 'from-green-900/20 to-green-800/20 border-green-800';
      case 'warning':
        return 'from-yellow-900/20 to-orange-800/20 border-yellow-800';
      case 'tip':
        return 'from-purple-900/20 to-purple-800/20 border-purple-800';
      default:
        return 'from-blue-900/20 to-blue-800/20 border-blue-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`bg-gradient-to-r ${getTypeStyles()} backdrop-blur-sm border rounded-2xl p-4 mb-6 shadow-2xl`}
    >
      <div className="flex items-start gap-3">
        <motion.div 
          className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>
        <div className="text-sm text-gray-300 leading-relaxed">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

// Tessa Sidebar Component for "Talk to Tessa" feature
export const TessaSidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const insights = [
    "Your team's favorite filler word: 'basically' 🤔",
    "Most flagged rep this week: Alex — again? 😅",
    "Average call duration increased by 12% this month 📈",
    "Success rate is up 8% since last quarter! 🎉"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="fixed right-0 top-0 h-full w-80 bg-black/95 backdrop-blur-xl border-l border-gray-800 z-50 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Talk to Tessa</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-900/50 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Recent Insights</h4>
                <div className="space-y-2">
                  {insights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-sm text-gray-300 p-2 bg-gray-800/50 rounded-lg"
                    >
                      {insight}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-4">
                <h4 className="text-white font-semibold mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-gray-300 p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors">
                    📊 Generate Weekly Report
                  </button>
                  <button className="w-full text-left text-sm text-gray-300 p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors">
                    🎯 Set Audit Goals
                  </button>
                  <button className="w-full text-left text-sm text-gray-300 p-2 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors">
                    🔔 Configure Notifications
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};