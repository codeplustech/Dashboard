import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpDown,
  Eye,
  Download
} from 'lucide-react';

const CodeAudits: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const audits = [
    {
      id: 1,
      file: 'src/components/UserService.tsx',
      issue: 'Memory leak in useEffect cleanup',
      severity: 'high',
      type: 'Performance',
      date: '2024-01-15',
      status: 'open',
      line: 45,
      description: 'Potential memory leak due to missing cleanup function in useEffect hook'
    },
    {
      id: 2,
      file: 'src/utils/apiClient.ts',
      issue: 'Hardcoded API key in source code',
      severity: 'critical',
      type: 'Security',
      date: '2024-01-15',
      status: 'open',
      line: 12,
      description: 'API key should be stored in environment variables'
    },
    {
      id: 3,
      file: 'src/components/Dashboard.tsx',
      issue: 'Unused import statement',
      severity: 'low',
      type: 'Code Quality',
      date: '2024-01-14',
      status: 'resolved',
      line: 3,
      description: 'Remove unused import to reduce bundle size'
    },
    {
      id: 4,
      file: 'src/hooks/useAuth.ts',
      issue: 'Missing error handling for async operations',
      severity: 'medium',
      type: 'Reliability',
      date: '2024-01-14',
      status: 'in-progress',
      line: 28,
      description: 'Add try-catch blocks for better error handling'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high':
        return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      default:
        return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'open':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Code Audits</h1>
          <p className="text-gray-400">
            AI-powered code analysis and issue detection
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-200"
        >
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-gray-950/80 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search files or issues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-400 text-white placeholder-gray-400"
            />
          </div>

          {/* Severity Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-400 text-white appearance-none"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Sort */}
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-400 text-white appearance-none"
            >
              <option value="date">Sort by Date</option>
              <option value="severity">Sort by Severity</option>
              <option value="file">Sort by File</option>
              <option value="status">Sort by Status</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Audit Results */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4"
      >
        {audits.map((audit, index) => (
          <motion.div
            key={audit.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gray-950/80 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4 flex-1">
                <div className="p-2 bg-gray-900/50 rounded-lg">
                  {getStatusIcon(audit.status)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors">
                      {audit.issue}
                    </h3>
                    <div className={`px-2 py-1 rounded-full border text-xs ${getSeverityColor(audit.severity)}`}>
                      {audit.severity.toUpperCase()}
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded">
                      {audit.type}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-2">{audit.description}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="font-mono bg-gray-800/50 px-2 py-1 rounded">
                      {audit.file}:{audit.line}
                    </span>
                    <span>{audit.date}</span>
                    <span className="capitalize">{audit.status.replace('-', ' ')}</span>
                  </div>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Code Preview */}
            <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 font-mono">{audit.file}</span>
                <span className="text-xs text-gray-500">Line {audit.line}</span>
              </div>
              <div className="font-mono text-sm">
                <div className="text-gray-500">43: const cleanup = () =&gt; {'{'}</div>
                <div className="text-gray-500">44:   // TODO: Add cleanup logic</div>
                <div className="text-red-400 bg-red-500/10 px-2 -mx-2 rounded">
                  45: {'}'}, []); // Missing dependency array
                </div>
                <div className="text-gray-500">46: </div>
                <div className="text-gray-500">47: return (</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CodeAudits;