import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { 
  Search, 
  Clock, 
  Flag,
  TrendingUp,
  Users,
  Zap,
  Award,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { TessaMessage } from '../components/Tessa';

const Dashboard: React.FC = () => {
  const [countAnimation, setCountAnimation] = React.useState(false);

  React.useEffect(() => {
    setCountAnimation(true);
  }, []);

  // Mock data
  const weeklyData = [
    { name: 'Mon', audits: 12, flags: 3 },
    { name: 'Tue', audits: 19, flags: 5 },
    { name: 'Wed', audits: 15, flags: 2 },
    { name: 'Thu', audits: 22, flags: 4 },
    { name: 'Fri', audits: 18, flags: 3 },
    { name: 'Sat', audits: 8, flags: 1 },
    { name: 'Sun', audits: 5, flags: 0 },
  ];

  const flagDistribution = [
    { name: 'Price Objections', value: 35, color: '#FF6B6B' },
    { name: 'Missed Follow-ups', value: 25, color: '#4ECDC4' },
    { name: 'Poor Closing', value: 20, color: '#45B7D1' },
    { name: 'Compliance Issues', value: 15, color: '#FFA07A' },
    { name: 'Other', value: 5, color: '#98D8C8' },
  ];

  const topReps = [
    { name: 'Arjun R.', score: 94, calls: 28, flags: 2 },
    { name: 'Sarah M.', score: 91, calls: 25, flags: 3 },
    { name: 'Mike T.', score: 88, calls: 22, flags: 4 },
    { name: 'Lisa K.', score: 85, calls: 20, flags: 5 },
  ];

  const AnimatedCounter: React.FC<{ end: number; suffix?: string; duration?: number }> = ({ 
    end, 
    suffix = '', 
    duration = 2 
  }) => {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
      if (!countAnimation) return;
      
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, [end, duration, countAnimation]);

    return <span>{count.toLocaleString()}{suffix}</span>;
  };

  return (
    <div className="p-6 pb-20 md:pb-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
          >
            Sales Audit Dashboard
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor your team's performance with AI-powered insights
          </p>
        </div>

        {/* Tessa's Insight */}
        <TessaMessage>
          <strong>Today's Hot Take:</strong> Your team's performance is on fire! 🔥 
          Arjun's leading with a 94% score, and overall flag rates dropped 15% this week. 
          Keep up the momentum!
        </TessaMessage>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-dark-800 rounded-xl p-6 border border-gray-200 dark:border-dark-700 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                <AnimatedCounter end={1247} />
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Audits</p>
              <p className="text-xs text-green-600 dark:text-green-400">+12% from last month</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-dark-800 rounded-xl p-6 border border-gray-200 dark:border-dark-700 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <Zap className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                <AnimatedCounter end={892} />h
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Hours Audited</p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400">Lightning fast ⚡</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-dark-800 rounded-xl p-6 border border-gray-200 dark:border-dark-700 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                <Flag className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                <AnimatedCounter end={89} />
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Flags Raised</p>
              <p className="text-xs text-red-600 dark:text-red-400">-15% this week 📉</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-dark-800 rounded-xl p-6 border border-gray-200 dark:border-dark-700 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-lime-100 dark:bg-lime-900/30 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-lime-600 dark:text-lime-400" />
              </div>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">3h 47m</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Longest Call</p>
              <p className="text-xs text-lime-600 dark:text-lime-400">That's dedication! 💪</p>
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Audit Volume */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-dark-800 rounded-xl p-6 border border-gray-200 dark:border-dark-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Weekly Audit Volume
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#F9FAFB'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="audits" 
                  stroke="#8B5FFF" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5FFF', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Flag Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-dark-800 rounded-xl p-6 border border-gray-200 dark:border-dark-700"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Common Issues
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={flagDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {flagDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-dark-800 rounded-xl p-6 border border-gray-200 dark:border-dark-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Top Performers This Month
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Users className="w-4 h-4" />
              <span>Sales Team Leaderboard</span>
            </div>
          </div>

          <div className="space-y-4">
            {topReps.map((rep, index) => (
              <motion.div
                key={rep.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-full text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{rep.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {rep.calls} calls • {rep.flags} flags
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{rep.score}%</p>
                  <div className="w-16 h-2 bg-gray-200 dark:bg-dark-600 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${rep.score}%` }}
                      transition={{ delay: 1 + index * 0.1, duration: 1 }}
                      className="h-full bg-gradient-to-r from-primary-500 to-cyan-500"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;