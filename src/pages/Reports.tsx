import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Calendar,
  Download,
  Share2,
  Eye,
  Flag,
  Clock,
  User,
  FileText,
  Star,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import { TessaMessage } from '../components/Tessa';

interface Report {
  id: string;
  leadId: string;
  callId: string;
  rep: string;
  duration: string;
  date: string;
  flags: number;
  flagSeverity: 'low' | 'medium' | 'high';
  score: number;
  status: 'completed' | 'reviewed' | 'flagged';
  sentiment: 'positive' | 'neutral' | 'negative';
  keyPoints: string[];
}

const Reports: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'reviewed' | 'flagged'>('all');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Mock reports data
  const reports: Report[] = [
    {
      id: '1',
      leadId: 'ABC-001',
      callId: 'CALL-2024-001',
      rep: 'John Smith',
      duration: '45:32',
      date: '2024-01-15',
      flags: 2,
      flagSeverity: 'medium',
      score: 87,
      status: 'reviewed',
      sentiment: 'positive',
      keyPoints: ['Strong opening', 'Good rapport building', 'Price objection handled well']
    },
    {
      id: '2',
      leadId: 'ENT-445',
      callId: 'CALL-2024-002',
      rep: 'Sarah Johnson',
      duration: '1:23:45',
      date: '2024-01-15',
      flags: 5,
      flagSeverity: 'high',
      score: 62,
      status: 'flagged',
      sentiment: 'negative',
      keyPoints: ['Multiple compliance issues', 'Poor closing technique', 'Customer dissatisfaction']
    },
    {
      id: '3',
      leadId: 'CON-782',
      callId: 'CALL-2024-003',
      rep: 'Mike Wilson',
      duration: '28:15',
      date: '2024-01-14',
      flags: 0,
      flagSeverity: 'low',
      score: 94,
      status: 'completed',
      sentiment: 'positive',
      keyPoints: ['Perfect call execution', 'Excellent listening skills', 'Smooth conversion']
    },
    {
      id: '4',
      leadId: 'OUT-923',
      callId: 'CALL-2024-004',
      rep: 'Lisa Chen',
      duration: '15:42',
      date: '2024-01-14',
      flags: 1,
      flagSeverity: 'low',
      score: 78,
      status: 'completed',
      sentiment: 'neutral',
      keyPoints: ['Good discovery questions', 'Needs work on urgency creation']
    },
    {
      id: '5',
      leadId: 'DIS-156',
      callId: 'CALL-2024-005',
      rep: 'Team Lead',
      duration: '56:28',
      date: '2024-01-13',
      flags: 3,
      flagSeverity: 'medium',
      score: 71,
      status: 'reviewed',
      sentiment: 'neutral',
      keyPoints: ['Strong technical knowledge', 'Missed key buying signals', 'Long-winded explanations']
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.leadId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.callId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.rep.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesSeverity = severityFilter === 'all' || report.flagSeverity === severityFilter;
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case 'reviewed': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case 'flagged': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300';
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
    }
  };

  const getSeverityColor = (severity: Report['flagSeverity']) => {
    switch (severity) {
      case 'low': return 'text-yellow-600 dark:text-yellow-400';
      case 'medium': return 'text-orange-600 dark:text-orange-400';
      case 'high': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getSentimentIcon = (sentiment: Report['sentiment']) => {
    switch (sentiment) {
      case 'positive': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'neutral': return <XCircle className="w-4 h-4 text-yellow-500" />;
      case 'negative': return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  const openReportModal = (report: Report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const averageScore = Math.round(reports.reduce((acc, report) => acc + report.score, 0) / reports.length);
  const totalFlags = reports.reduce((acc, report) => acc + report.flags, 0);

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
            Sales Reports
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive analysis of your sales calls and team performance
          </p>
        </div>

        {/* Tessa's Monthly Recap */}
        <TessaMessage>
          <strong>January Recap:</strong> 168 audits completed, 19% flagged for review. 
          Top performer: Mike Wilson with a stellar 94% average! 🌟 
          Sarah's enterprise call needs some love - 5 flags detected. Let\'s get that sorted! 
          <div className="mt-2 text-xs opacity-75">
            <em>Pro tip: Check the "Flagged" filter to prioritize your coaching sessions 📚</em>
          </div>
        </TessaMessage>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-dark-800 rounded-xl p-4 border border-gray-200 dark:border-dark-700"
          >
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-primary-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{reports.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Reports</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-dark-800 rounded-xl p-4 border border-gray-200 dark:border-dark-700"
          >
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{averageScore}%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Score</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-dark-800 rounded-xl p-4 border border-gray-200 dark:border-dark-700"
          >
            <div className="flex items-center gap-3">
              <Flag className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalFlags}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Flags</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-dark-800 rounded-xl p-4 border border-gray-200 dark:border-dark-700"
          >
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">+12%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Performance</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 border border-gray-200 dark:border-dark-700 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by Lead ID, Call ID, or Rep Name..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="reviewed">Reviewed</option>
                <option value="flagged">Flagged</option>
              </select>
            </div>

            {/* Severity Filter */}
            <div>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">All Severity</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-200 dark:border-dark-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Call Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Rep
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Flags
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
                <AnimatePresence>
                  {filteredReports.map((report) => (
                    <motion.tr
                      key={report.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            Lead: {report.leadId}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Call: {report.callId}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {report.duration}
                            </span>
                            {getSentimentIcon(report.sentiment)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {report.rep.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {report.rep}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className={`text-lg font-bold ${report.score >= 90 ? 'text-green-600 dark:text-green-400' : 
                                          report.score >= 70 ? 'text-yellow-600 dark:text-yellow-400' : 
                                          'text-red-600 dark:text-red-400'}`}>
                            {report.score}%
                          </span>
                          <div className="w-16 h-2 bg-gray-200 dark:bg-dark-600 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${report.score >= 90 ? 'bg-green-500' : 
                                         report.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${report.score}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Flag className={`w-4 h-4 ${getSeverityColor(report.flagSeverity)}`} />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {report.flags}
                          </span>
                          <span className={`text-xs ${getSeverityColor(report.flagSeverity)} capitalize`}>
                            {report.flagSeverity}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => openReportModal(report)}
                            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                          >
                            <Eye className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            <Download className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            <Share2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {filteredReports.length === 0 && (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No reports found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>

        {/* Report Detail Modal */}
        <AnimatePresence>
          {showModal && selectedReport && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-dark-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Call Report Details
                  </h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Call Information</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Lead ID:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedReport.leadId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Call ID:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedReport.callId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Sales Rep:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedReport.rep}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedReport.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Date:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedReport.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Performance Metrics</h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Overall Score</span>
                            <span className="text-lg font-bold text-gray-900 dark:text-white">{selectedReport.score}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${selectedReport.score >= 90 ? 'bg-green-500' : 
                                         selectedReport.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${selectedReport.score}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Flags Raised:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{selectedReport.flags}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Severity:</span>
                          <span className={`font-medium capitalize ${getSeverityColor(selectedReport.flagSeverity)}`}>
                            {selectedReport.flagSeverity}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">Sentiment:</span>
                          <div className="flex items-center gap-2">
                            {getSentimentIcon(selectedReport.sentiment)}
                            <span className="font-medium text-gray-900 dark:text-white capitalize">
                              {selectedReport.sentiment}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Insights</h3>
                  <div className="space-y-2">
                    {selectedReport.keyPoints.map((point, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Tessa's Commentary</h3>
                  <div className="bg-gradient-to-r from-primary-50 to-cyan-50 dark:from-primary-900/20 dark:to-cyan-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {selectedReport.score >= 90 
                          ? "This rep absolutely nailed it! 🏆 Perfect execution across all touchpoints. Use this call as a training example for the team."
                          : selectedReport.score >= 70 
                          ? "Solid performance with room for improvement. Focus on the flagged areas for coaching opportunities."
                          : "This call needs attention. Multiple areas for improvement identified. Let's schedule a coaching session ASAP."
                        }
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
                  >
                    <Download className="w-4 h-4 inline mr-2" />
                    Download PDF
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 bg-gradient-to-r from-primary-500 to-cyan-500 text-white rounded-lg hover:from-primary-600 hover:to-cyan-600 transition-all"
                  >
                    <Share2 className="w-4 h-4 inline mr-2" />
                    Share with Rep
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Reports;