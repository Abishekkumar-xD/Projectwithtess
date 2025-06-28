import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Filter,
  Calendar,
  Search,
  RefreshCw,
  Play,
  Pause,
  FileAudio,
  FileVideo,
  Eye
} from 'lucide-react';
import { TessaMessage } from '../components/Tessa';

interface AuditJob {
  id: string;
  fileName: string;
  fileType: 'audio' | 'video';
  duration: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  startTime: string;
  estimatedCompletion?: string;
  rep: string;
  leadId: string;
}

const Progress: React.FC = () => {
  const [audits, setAudits] = useState<AuditJob[]>([]);
  const [filter, setFilter] = useState<'all' | 'processing' | 'completed' | 'failed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('today');

  // Mock data with realistic audits
  useEffect(() => {
    const mockAudits: AuditJob[] = [
      {
        id: '1',
        fileName: 'sales_call_john_prospect_abc.mp3',
        fileType: 'audio',
        duration: '45:32',
        status: 'processing',
        progress: 67,
        startTime: '2 minutes ago',
        estimatedCompletion: '3 minutes',
        rep: 'John Smith',
        leadId: 'ABC-001'
      },
      {
        id: '2',
        fileName: 'demo_call_sarah_enterprise_client.mp4',
        fileType: 'video',
        duration: '1:23:45',
        status: 'processing',
        progress: 23,
        startTime: '8 minutes ago',
        estimatedCompletion: '12 minutes',
        rep: 'Sarah Johnson',
        leadId: 'ENT-445'
      },
      {
        id: '3',
        fileName: 'follow_up_mike_conversion.wav',
        fileType: 'audio',
        duration: '28:15',
        status: 'completed',
        progress: 100,
        startTime: '1 hour ago',
        rep: 'Mike Wilson',
        leadId: 'CON-782'
      },
      {
        id: '4',
        fileName: 'cold_call_lisa_outbound.mp3',
        fileType: 'audio',
        duration: '15:42',
        status: 'failed',
        progress: 0,
        startTime: '2 hours ago',
        rep: 'Lisa Chen',
        leadId: 'OUT-923'
      },
      {
        id: '5',
        fileName: 'discovery_call_team_meeting.mp4',
        fileType: 'video',
        duration: '56:28',
        status: 'queued',
        progress: 0,
        startTime: '5 minutes ago',
        rep: 'Team Lead',
        leadId: 'DIS-156'
      }
    ];

    setAudits(mockAudits);

    // Simulate progress updates for processing audits
    const interval = setInterval(() => {
      setAudits(prev => prev.map(audit => {
        if (audit.status === 'processing' && audit.progress < 100) {
          const newProgress = Math.min(audit.progress + Math.random() * 5, 100);
          if (newProgress >= 100) {
            return { ...audit, progress: 100, status: 'completed', estimatedCompletion: undefined };
          }
          return { ...audit, progress: newProgress };
        }
        return audit;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const filteredAudits = audits.filter(audit => {
    const matchesFilter = filter === 'all' || audit.status === filter;
    const matchesSearch = audit.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audit.rep.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audit.leadId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: AuditJob['status']) => {
    switch (status) {
      case 'queued': return 'text-yellow-600 dark:text-yellow-400';
      case 'processing': return 'text-blue-600 dark:text-blue-400';
      case 'completed': return 'text-green-600 dark:text-green-400';
      case 'failed': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: AuditJob['status']) => {
    switch (status) {
      case 'queued': return <Clock className="w-4 h-4" />;
      case 'processing': return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'failed': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getFileIcon = (fileType: 'audio' | 'video') => {
    return fileType === 'audio' ? FileAudio : FileVideo;
  };

  const getTessaComment = (audit: AuditJob) => {
    if (audit.status === 'processing') {
      if (audit.duration.includes('1:')) {
        return "Chugging through a beast of a call... ☕";
      }
      return "Sharpening my ears for this one! 👂";
    }
    if (audit.status === 'completed') {
      return "Another one bites the dust! ✅";
    }
    if (audit.status === 'failed') {
      return "Oops, this one gave me trouble 😅";
    }
    return "Patiently waiting in line...";
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
            Audit Progress
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor your ongoing and completed audits
          </p>
        </div>

        {/* Tessa's Insight */}
        <TessaMessage>
          <strong>Processing Status Update:</strong> I'm currently working on 2 calls and just finished analyzing 
          Mike's follow-up. That enterprise demo is a marathon - grab some coffee! ☕ 
          <em className="block mt-1 text-xs opacity-75">ETA updates are my best guess, but I'm pretty good at this! 😏</em>
        </TessaMessage>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Queued', count: audits.filter(a => a.status === 'queued').length, color: 'yellow' },
            { label: 'Processing', count: audits.filter(a => a.status === 'processing').length, color: 'blue' },
            { label: 'Completed', count: audits.filter(a => a.status === 'completed').length, color: 'green' },
            { label: 'Failed', count: audits.filter(a => a.status === 'failed').length, color: 'red' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-dark-800 rounded-xl p-4 border border-gray-200 dark:border-dark-700"
            >
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.count}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 border border-gray-200 dark:border-dark-700 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by filename, rep, or lead ID..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Status</option>
                <option value="queued">Queued</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            {/* Date Filter */}
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>

            {/* Refresh */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Audit List */}
        <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-dark-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Active Audits ({filteredAudits.length})
            </h3>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-dark-700">
            <AnimatePresence>
              {filteredAudits.map((audit) => {
                const FileIcon = getFileIcon(audit.fileType);
                return (
                  <motion.div
                    key={audit.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-6 hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      {/* File Icon */}
                      <div className="w-12 h-12 bg-gray-100 dark:bg-dark-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {audit.fileName}
                            </h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1">
                              <span>Rep: {audit.rep}</span>
                              <span>•</span>
                              <span>Lead: {audit.leadId}</span>
                              <span>•</span>
                              <span>Duration: {audit.duration}</span>
                            </div>
                          </div>
                          
                          {audit.status === 'completed' && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-2 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-medium hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              View Report
                            </motion.button>
                          )}
                        </div>

                        {/* Status and Progress */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className={`flex items-center gap-2 ${getStatusColor(audit.status)}`}>
                              {getStatusIcon(audit.status)}
                              <span className="text-sm font-medium capitalize">
                                {audit.status === 'processing' && audit.estimatedCompletion 
                                  ? `Processing (${audit.estimatedCompletion} remaining)`
                                  : audit.status
                                }
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Started {audit.startTime}
                            </span>
                          </div>

                          {/* Progress Bar */}
                          {(audit.status === 'processing' || audit.status === 'completed') && (
                            <div className="space-y-2">
                              <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-2">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${audit.progress}%` }}
                                  className="h-2 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-full"
                                />
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-gray-600 dark:text-gray-400">
                                  {Math.round(audit.progress)}% complete
                                </span>
                                <span className="text-gray-500 dark:text-gray-500 italic">
                                  "{getTessaComment(audit)}"
                                </span>
                              </div>
                            </div>
                          )}

                          {audit.status === 'failed' && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-red-600 dark:text-red-400">
                                Processing failed. Please try re-uploading.
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                              >
                                Retry
                              </motion.button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredAudits.length === 0 && (
            <div className="p-12 text-center">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No audits found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm || filter !== 'all' 
                  ? 'Try adjusting your filters or search terms'
                  : 'Upload some sales calls to get started!'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Progress;