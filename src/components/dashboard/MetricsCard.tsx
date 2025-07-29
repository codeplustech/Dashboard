import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  color: 'purple' | 'green' | 'blue' | 'orange';
  delay?: number;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color,
  delay = 0
}) => {
  const colorClasses = {
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400',
    green: 'from-green-500/20 to-green-600/20 border-green-500/30 text-green-400',
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400',
    orange: 'from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-400'
  };

  const glowClasses = {
    purple: 'shadow-purple-500/25',
    green: 'shadow-green-500/25',
    blue: 'shadow-blue-500/25',
    orange: 'shadow-orange-500/25'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`bg-gradient-to-br ${colorClasses[color]} backdrop-blur-xl border rounded-xl p-6 shadow-xl ${glowClasses[color]} transition-all duration-300 hover:shadow-2xl group`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg bg-gradient-to-r ${colorClasses[color].split(' ')[0]} ${colorClasses[color].split(' ')[1]} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex items-center space-x-1">
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4 text-green-400" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-400" />
          )}
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            {change}
          </span>
        </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
          {value}
        </h3>
        <p className="text-gray-400 text-sm">{title}</p>
      </div>
    </motion.div>
  );
};

export default MetricsCard;