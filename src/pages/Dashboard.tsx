import React from 'react';
import { motion } from 'framer-motion';
import MetricsCard from '../components/dashboard/MetricsCard';
import CodeHealthChart from '../components/dashboard/CodeHealthChart';
import RecentActivity from '../components/dashboard/RecentActivity';
import ProjectOverview from '../components/dashboard/ProjectOverview';
import AIAssistant from '../components/dashboard/AIAssistant';
import {
  TrendingUp,
  TrendingDown,
  Shield,
  Zap,
  GitBranch,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const metrics = [
    {
      title: 'Code Quality Score',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: Shield,
      color: 'purple'
    },
    {
      title: 'Issues Resolved',
      value: '142',
      change: '+23',
      trend: 'up',
      icon: CheckCircle,
      color: 'green'
    },
    {
      title: 'Performance Score',
      value: '94%',
      change: '+12%',
      trend: 'up',
      icon: Zap,
      color: 'blue'
    },
    {
      title: 'Active Alerts',
      value: '7',
      change: '-3',
      trend: 'down',
      icon: AlertTriangle,
      color: 'orange'
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
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">
          Monitor your code health and AI-powered insights in real-time
        </p>
      </motion.div>

      {/* Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        {metrics.map((metric, index) => (
          <MetricsCard key={metric.title} {...metric} delay={index * 0.1} />
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <CodeHealthChart />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <ProjectOverview />
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <RecentActivity />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <AIAssistant />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;