import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import AIAssistant from '../components/dashboard/AIAssistant';

const AIAssistantPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">AI Assistant</h1>
        <p className="text-gray-400">Chat with your AI assistant for code help and suggestions.</p>
      </motion.div>
      <AIAssistant />
    </div>
  );
};

export default AIAssistantPage; 