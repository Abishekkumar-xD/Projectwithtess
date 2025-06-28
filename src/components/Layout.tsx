import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Upload, 
  Clock, 
  FileText, 
  Sun, 
  Moon,
  User,
  LogOut,
  Settings,
  Bell,
  Sparkles,
  Award,
  HelpCircle,
  MessageCircle
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { TessaAvatar, TessaSidebar } from './TessaAvatar';
import { GlassCard } from './GlassCard';

const Layout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [showProfile, setShowProfile] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showTessaSidebar, setShowTessaSidebar] = React.useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Upload Calls', href: '/upload', icon: Upload },
    { name: 'Audit Progress', href: '/progress', icon: Clock },
    { name: 'Reports', href: '/reports', icon: FileText },
  ];

  const notifications = [
    { id: 1, message: "Audit complete for Lead ABC-001", time: "2 min ago", type: "success" },
    { id: 2, message: "New call uploaded by Sarah J.", time: "5 min ago", type: "info" },
    { id: 3, message: "Flag detected in Call ENT-445", time: "10 min ago", type: "warning" },
  ];

  return (
    <div className="min-h-screen bg-black transition-all duration-500">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/80 border-b border-gray-800">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <motion.div 
                className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Project W
                </h1>
                <p className="text-xs text-gray-400">AI Sales Auditor</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="relative group"
                  >
                    <motion.div
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-gray-800/60 text-blue-400 shadow-lg'
                          : 'text-gray-400 hover:bg-gray-800/40 hover:text-gray-200'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </motion.div>
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              {/* Talk to Tessa */}
              <motion.button
                onClick={() => setShowTessaSidebar(true)}
                className="p-2 text-gray-400 hover:bg-gray-800/40 hover:text-purple-400 rounded-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Talk to Tessa"
              >
                <MessageCircle className="w-5 h-5" />
              </motion.button>

              {/* Notifications */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-400 hover:bg-gray-800/40 hover:text-blue-400 rounded-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell className="w-5 h-5" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                </motion.button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-2 w-80 bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-800">
                        <h3 className="font-semibold text-white">Notifications</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {notifications.map((notification) => (
                          <motion.div
                            key={notification.id}
                            className="px-4 py-3 hover:bg-gray-800/50 transition-colors"
                            whileHover={{ x: 4 }}
                          >
                            <p className="text-sm text-gray-200">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-2 text-gray-400 hover:bg-gray-800/40 hover:text-yellow-400 rounded-xl transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Profile Dropdown */}
              <div className="relative">
                <motion.button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center gap-2 p-2 text-gray-400 hover:bg-gray-800/40 hover:text-white rounded-xl transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </motion.button>

                <AnimatePresence>
                  {showProfile && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-2 w-72 bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-gray-800">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">Sales Manager</p>
                            <p className="text-sm text-gray-400">manager@company.com</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <motion.button 
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50 transition-colors"
                          whileHover={{ x: 4 }}
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </motion.button>
                        <motion.button 
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50 transition-colors"
                          whileHover={{ x: 4 }}
                        >
                          <HelpCircle className="w-4 h-4" />
                          Help & Support
                        </motion.button>
                        <motion.button 
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 transition-colors"
                          whileHover={{ x: 4 }}
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </motion.button>
                      </div>

                      <div className="px-4 py-3 border-t border-gray-800">
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Sparkles className="w-3 h-3" />
                          <span className="italic">"Switch to light mode only if you're feeling sunny." - Tessa</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative">
        <Outlet />
      </main>

      {/* Tessa Assistant */}
      <TessaAvatar mood="idle" />

      {/* Tessa Sidebar */}
      <TessaSidebar isOpen={showTessaSidebar} onClose={() => setShowTessaSidebar(false)} />

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-gray-800 z-40">
        <div className="flex items-center justify-around py-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className="relative"
              >
                <motion.div
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                    isActive
                      ? 'text-blue-400'
                      : 'text-gray-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.name}</span>
                </motion.div>
                {isActive && (
                  <motion.div
                    className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"
                    layoutId="activeMobileTab"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;