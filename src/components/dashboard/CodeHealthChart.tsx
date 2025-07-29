import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp } from 'lucide-react';

const CodeHealthChart: React.FC = () => {
  const data = [
    { name: 'Mon', quality: 85, security: 92, performance: 78 },
    { name: 'Tue', quality: 88, security: 89, performance: 82 },
    { name: 'Wed', quality: 87, security: 94, performance: 85 },
    { name: 'Thu', quality: 91, security: 96, performance: 88 },
    { name: 'Fri', quality: 89, security: 91, performance: 92 },
    { name: 'Sat', quality: 93, security: 95, performance: 89 },
    { name: 'Sun', quality: 87, security: 93, performance: 94 },
  ];

  return (
    <div className="bg-gray-950/80 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">Code Health Trends</h2>
          <p className="text-gray-400 text-sm">Weekly performance metrics</p>
        </div>
        <div className="flex items-center space-x-2 text-green-400">
          <TrendingUp className="w-5 h-5" />
          <span className="text-sm font-medium">+12% improvement</span>
        </div>
      </div>

      {/* Chart */}
      <div className="space-y-4">
        {data.map((day, index) => (
          <motion.div
            key={day.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">{day.name}</span>
              <div className="flex space-x-4 text-xs">
                <span className="text-purple-400">Quality: {day.quality}%</span>
                <span className="text-blue-400">Security: {day.security}%</span>
                <span className="text-green-400">Performance: {day.performance}%</span>
              </div>
            </div>
            
            <div className="flex space-x-1 h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${day.quality}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-l-full h-full"
                style={{ width: `${day.quality / 3}%` }}
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${day.security}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full"
                style={{ width: `${day.security / 3}%` }}
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${day.performance}%` }}
                transition={{ duration: 1, delay: index * 0.1 + 0.4 }}
                className="bg-gradient-to-r from-green-500 to-green-600 rounded-r-full h-full"
                style={{ width: `${day.performance / 3}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-purple-500/20">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" />
          <span className="text-xs text-gray-400">Code Quality</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
          <span className="text-xs text-gray-400">Security</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full" />
          <span className="text-xs text-gray-400">Performance</span>
        </div>
      </div>
    </div>
  );
};

export default CodeHealthChart;