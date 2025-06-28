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
  CheckCircle,
  Target,
  Coffee,
  Star
} from 'lucide-react';
import { TessaInsightBubble, TessaAvatar } from '../components/TessaAvatar';
import { GlassCard, StatCard } from '../components/GlassCard';

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
    { name: 'Price Objections', value: 35, color: '#EF4444' },
    { name: 'Missed Follow-ups', value: 25, color: '#F59E0B' },
    { name: 'Poor Closing', value: 20, color: '#0EA5E9' },
    { name: 'Compliance Issues', value: 15, color: '#D946EF' },
    { name: 'Other', value: 5, color: '#22C55E' },
  ];

  const topReps = [
    { name: 'Arjun R.', score: 94, calls: 28, flags: 2, avatar: 'AR', trend: 'up' },
    { name: 'Sarah M.', score: 91, calls: 25, flags: 3, avatar: 'SM', trend: 'up' },
    { name: 'Mike T.', score: 88, calls: 22, flags: 4, avatar: 'MT', trend: 'neutral' },
    { name: 'Lisa K.', score: 85, calls: 20, flags: 5, avatar: 'LK', trend: 'down' },
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
    <div className="p-6 pb-20 md:pb-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor your sales audit performance and insights
          </p>
        </motion.div>

        {/* Tessa's Insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm text-green-800">
                <strong>Performance metrics look good today.</strong> Your team's performance is absolutely crushing it! 
                Arjun's leading with a stellar 94% score, and overall flag rates dropped 15% this week. 
                The momentum is real - keep this energy going!
                <div className="mt-2 text-xs text-green-700">
                  <em>- Tessa AI</em>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <StatCard
              title="Total Audits"
              value={<AnimatedCounter end={1234} />}
              subtitle="+12% from last week"
              icon={<Search className="w-6 h-6 text-white" />}
              trend="up"
              trendValue="+12%"
              color="primary"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <StatCard
              title="Hours Audited"
              value={<><AnimatedCounter end={2456} />h</>}
              subtitle="+8% from last week"
              icon={<Clock className="w-6 h-6 text-white" />}
              color="success"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StatCard
              title="Flags Raised"
              value={<AnimatedCounter end={187} />}
              subtitle="-15% from last week"
              icon={<Flag className="w-6 h-6 text-white" />}
              trend="down"
              trendValue="-15%"
              color="warning"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <StatCard
              title="Active Reps"
              value={<AnimatedCounter end={89} />}
              subtitle="+5% from last week"
              icon={<Users className="w-6 h-6 text-white" />}
              color="accent"
            />
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Audit Volume */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Weekly Audit Volume
                </h3>
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span>+8% vs last week</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="audits" 
                    stroke="#0EA5E9" 
                    strokeWidth={2}
                    dot={{ fill: '#0EA5E9', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#0EA5E9', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </GlassCard>
          </motion.div>

          {/* Issue Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Issue Distribution
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Target className="w-4 h-4" />
                  <span>Focus Areas</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={flagDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {flagDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB', 
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </GlassCard>
          </motion.div>
        </div>

        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                🏆 Top Performers This Month
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
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
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-sm shadow-sm ${
                        index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                        index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
                        index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                        'bg-gradient-to-br from-blue-500 to-purple-500'
                      }`}>
                        {index < 3 ? (
                          <Star className="w-6 h-6" />
                        ) : (
                          rep.avatar
                        )}
                      </div>
                      {index === 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-xs">👑</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{rep.name}</p>
                        {rep.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                        {rep.trend === 'down' && <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />}
                      </div>
                      <p className="text-sm text-gray-600">
                        {rep.calls} calls • {rep.flags} flags
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{rep.score}%</p>
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${rep.score}%` }}
                        transition={{ delay: 1 + index * 0.1, duration: 1, ease: "easeOut" }}
                        className={`h-full ${
                          rep.score >= 90 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                          rep.score >= 80 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                          'bg-gradient-to-r from-yellow-500 to-orange-500'
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Enhanced Tessa */}
      <TessaAvatar 
        mood="celebrating" 
        message="Your dashboard is looking fantastic! The team's really stepping up their game 🚀"
      />
    </div>
  );
};

export default Dashboard;