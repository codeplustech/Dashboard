import React from 'react';
import { motion } from 'framer-motion';
import {
  GitBranch,
  GitCommit,
  GitMerge,
  GitPullRequest,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Play
} from 'lucide-react';

const GitIntegration: React.FC = () => {
  const repositories = [
    {
      name: 'main-frontend',
      branch: 'develop',
      commits: 23,
      lastCommit: '2 hours ago',
      status: 'active',
      health: 94
    },
    {
      name: 'api-backend',
      branch: 'feature/auth-v2',
      commits: 8,
      lastCommit: '4 hours ago',
      status: 'review',
      health: 87
    },
    {
      name: 'mobile-app',
      branch: 'main',
      commits: 12,
      lastCommit: '1 day ago',
      status: 'merged',
      health: 91
    }
  ];

  const recentCommits = [
    {
      hash: 'a3f5b2c',
      message: 'Fix memory leak in user service component',
      author: 'John Doe',
      time: '2 hours ago',
      branch: 'develop',
      files: 3
    },
    {
      hash: 'b7d9e1f',
      message: 'Add TypeScript strict mode configuration',
      author: 'Jane Smith',
      time: '4 hours ago',
      branch: 'feature/typescript',
      files: 5
    },
    {
      hash: 'c8a2f4d',
      message: 'Implement lazy loading for dashboard components',
      author: 'Mike Johnson',
      time: '6 hours ago',
      branch: 'feature/performance',
      files: 8
    }
  ];

  const pullRequests = [
    {
      id: 1,
      title: 'Implement user authentication flow',
      author: 'Sarah Wilson',
      status: 'open',
      branch: 'feature/auth',
      target: 'develop',
      reviewers: 2,
      commits: 12,
      changed: '+245 -89'
    },
    {
      id: 2,
      title: 'Add responsive design for mobile devices',
      author: 'Alex Chen',
      status: 'review',
      branch: 'feature/responsive',
      target: 'main',
      reviewers: 3,
      commits: 8,
      changed: '+156 -34'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Git Integration</h1>
        <p className="text-gray-400">
          Monitor repository health and manage version control
        </p>
      </motion.div>

      {/* Repository Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {repositories.map((repo, index) => (
          <motion.div
            key={repo.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gray-950/80 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/40 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <GitBranch className="w-5 h-5 text-purple-400" />
                <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                  {repo.name}
                </h3>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                repo.status === 'active' ? 'bg-green-400 animate-pulse' :
                repo.status === 'review' ? 'bg-yellow-400' : 'bg-gray-400'
              }`} />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Branch:</span>
                <span className="text-purple-400 font-mono">{repo.branch}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Commits:</span>
                <span className="text-white">{repo.commits}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Health:</span>
                <span className="text-green-400">{repo.health}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Last commit:</span>
                <span className="text-gray-300">{repo.lastCommit}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-purple-500/20">
              <div className="w-full bg-gray-800 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${repo.health}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className="h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Commits */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gray-950/80 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Commits</h2>
            <GitCommit className="w-5 h-5 text-purple-400" />
          </div>

          <div className="space-y-4">
            {recentCommits.map((commit, index) => (
              <motion.div
                key={commit.hash}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start space-x-4 p-4 bg-gray-900/50 rounded-lg hover:bg-purple-500/5 transition-colors group"
              >
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white group-hover:text-purple-300 transition-colors mb-1">
                    {commit.message}
                  </p>
                  <div className="flex items-center space-x-3 text-xs text-gray-400">
                    <span className="font-mono bg-gray-800/50 px-2 py-1 rounded">
                      {commit.hash}
                    </span>
                    <span>{commit.author}</span>
                    <span>{commit.time}</span>
                    <span className="text-purple-400">{commit.branch}</span>
                  </div>
                  <div className="mt-2 text-xs text-green-400">
                    {commit.files} files changed
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pull Requests */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-950/80 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Pull Requests</h2>
            <GitPullRequest className="w-5 h-5 text-purple-400" />
          </div>

          <div className="space-y-4">
            {pullRequests.map((pr, index) => (
              <motion.div
                key={pr.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-4 bg-gray-900/50 rounded-lg border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors">
                    #{pr.id} {pr.title}
                  </h3>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    pr.status === 'open' ? 'bg-green-500/20 text-green-400' :
                    pr.status === 'review' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {pr.status}
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-xs text-gray-400 mb-3">
                  <span>{pr.author}</span>
                  <span>{pr.branch} → {pr.target}</span>
                  <span>{pr.changed}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1 text-gray-400">
                      <GitCommit className="w-3 h-3" />
                      <span>{pr.commits} commits</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-400">
                      <Users className="w-3 h-3" />
                      <span>{pr.reviewers} reviewers</span>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded text-xs hover:bg-purple-500/30 transition-colors"
                  >
                    Review
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CI/CD Pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-gray-950/80 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">CI/CD Pipeline</h2>
          <Play className="w-5 h-5 text-green-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { stage: 'Build', status: 'completed', time: '2m 34s' },
            { stage: 'Test', status: 'completed', time: '1m 56s' },
            { stage: 'Security Scan', status: 'running', time: '0m 45s' },
            { stage: 'Deploy', status: 'pending', time: '--' }
          ].map((stage, index) => (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${
                stage.status === 'completed' ? 'bg-green-500/10 border-green-500/30' :
                stage.status === 'running' ? 'bg-yellow-500/10 border-yellow-500/30' :
                'bg-gray-500/10 border-gray-500/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-white">{stage.stage}</h3>
                {stage.status === 'completed' ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : stage.status === 'running' ? (
                  <div className="w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Clock className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <div className="text-xs text-gray-400">{stage.time}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default GitIntegration;