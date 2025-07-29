import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Send,
  Lightbulb,
  Code,
  Zap,
  Download,
  Edit,
  Plus,
  Search
} from 'lucide-react';

const API_KEY = '';

const initialSuggestions = [
  'Optimize my React components',
  'Find security vulnerabilities',
  'Suggest code refactoring',
  'Review my TypeScript types'
];

const initialConversations = [
  {
    type: 'ai',
    message: 'I found 3 potential optimizations in your UserService component. Would you like me to show them?',
    time: '2 min ago'
  },
  {
    type: 'user',
    message: 'Yes, please show me the optimizations',
    time: '2 min ago'
  },
  {
    type: 'ai',
    message: 'Here are the suggested improvements:\n1. Use useMemo for expensive calculations\n2. Implement lazy loading for user avatars\n3. Add error boundaries for better UX',
    time: '1 min ago'
  }
];

const DASHBOARD_FEATURES = [
  {
    label: 'Show me analytics',
    prompt: 'Show me analytics and codebase trends.',
  },
  {
    label: 'Run a security scan',
    prompt: 'Run a security scan and show vulnerabilities.',
  },
  {
    label: 'Show performance metrics',
    prompt: 'Show performance metrics and optimization tips.',
  },
  {
    label: 'Manage team',
    prompt: 'Show the team page and manage team members.',
  },
  {
    label: 'Show reports',
    prompt: 'Show available project reports and how to download them.',
  },
];

const SYSTEM_PROMPT = `You are an AI assistant for a developer dashboard. The dashboard has the following features:\n- Analytics: View codebase trends, team productivity, and charts.\n- Security Scan: Run security scans, view vulnerabilities, and download reports.\n- Performance: See build times, bundle size, performance scores, and optimization tips.\n- Team: Manage team members, add/edit/remove, and export the team list.\n- Reports: Download, add, and remove project reports.\nWhen users ask questions, reference these features and suggest relevant actions or pages. If a user asks about a feature, explain how to use it or what insights it provides.`;

const AIAssistant: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false); // collapsed by default
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [conversations, setConversations] = useState(initialConversations);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add-suggestion' | 'edit-suggestion' | 'add-conv' | 'edit-conv' | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (customMessage?: string) => {
    const userMsg = customMessage || message;
    if (!userMsg.trim()) return;
    setConversations([...conversations, { type: 'user', message: userMsg, time: 'now' }]);
    setLoading(true);
    setError(null);
    const updatedConversations = [...conversations, { type: 'user', message: userMsg, time: 'now' }];
    setMessage('');
    try {
      // Prepare messages for OpenAI API
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...updatedConversations.map((conv) => ({
          role: conv.type === 'user' ? 'user' : 'assistant',
          content: conv.message,
        })),
      ];
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }
      const data = await response.json();
      const aiMessage = data.choices?.[0]?.message?.content || 'No response from AI.';
      setConversations((prev) => [
        ...prev,
        { type: 'ai', message: aiMessage, time: 'now' },
      ]);
    } catch (err: any) {
      setError(err.message || 'Error contacting AI.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSuggestion = () => {
    setModalType('add-suggestion');
    setCurrentIndex(null);
    setShowModal(true);
  };

  const handleEditSuggestion = (idx: number) => {
    setModalType('edit-suggestion');
    setCurrentIndex(idx);
    setShowModal(true);
  };

  const handleAddConv = () => {
    setModalType('add-conv');
    setCurrentIndex(null);
    setShowModal(true);
  };

  const handleEditConv = (idx: number) => {
    setModalType('edit-conv');
    setCurrentIndex(idx);
    setShowModal(true);
  };

  const handleDownload = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(conversations, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', 'ai_conversation.json');
    dlAnchorElem.click();
  };

  const handleAnalyze = () => {
    setAnalysisResult('Analyzing conversation...');
    setTimeout(() => {
      setAnalysisResult('AI analysis complete! (API Key used)');
    }, 1500);
  };

  const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    if (modalType === 'add-suggestion') {
      setSuggestions([...suggestions, formData.get('suggestion') as string]);
    } else if (modalType === 'edit-suggestion' && currentIndex !== null) {
      setSuggestions(suggestions.map((s, i) => (i === currentIndex ? (formData.get('suggestion') as string) : s)));
    } else if (modalType === 'add-conv') {
      setConversations([...conversations, {
        type: formData.get('type') as string,
        message: formData.get('message') as string,
        time: formData.get('time') as string
      }]);
    } else if (modalType === 'edit-conv' && currentIndex !== null) {
      setConversations(conversations.map((c, i) => i === currentIndex ? {
        type: formData.get('type') as string,
        message: formData.get('message') as string,
        time: formData.get('time') as string
      } : c));
    }
    setShowModal(false);
    setModalType(null);
    setCurrentIndex(null);
  };

  return (
    <div className="bg-gray-950/80 backdrop-blur-xl border border-purple-500/20 rounded-xl shadow-xl overflow-hidden">
      {/* Collapsed State (default) */}
      {!isExpanded && (
        <div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
          <Bot className="w-10 h-10 text-purple-400 mb-2 animate-bounce" />
          <div className="text-lg text-white font-semibold mb-2">AI Assistant</div>
          <div className="text-gray-400 mb-4 text-center">Click below to chat with your AI assistant about dashboard features, code, and more!</div>
          <button
            className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded shadow text-lg font-bold"
            onClick={() => setIsExpanded(true)}
          >
            Open AI Chat
          </button>
        </div>
      )}
      {/* Expanded State (chat interface) */}
      {isExpanded && (
        <>
          {/* Header */}
          <div 
            className="p-4 border-b border-purple-500/20 cursor-pointer hover:bg-purple-500/5 transition-colors flex items-center justify-between"
            onClick={() => setIsExpanded(false)}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-white">AI Assistant</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-gray-400">Online</span>
                </div>
              </div>
            </div>
            <button
              className="px-3 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded shadow text-xs"
              onClick={e => { e.stopPropagation(); setIsExpanded(false); }}
            >
              Close
            </button>
          </div>

          <AnimatePresence>
            {/* Chat Messages */}
            <div className="p-4 max-h-64 overflow-y-auto space-y-3">
              {conversations.map((conv, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${conv.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs p-3 rounded-lg ${
                    conv.type === 'user'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      : 'bg-gray-800/50 text-gray-300 border border-gray-700/50'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{conv.message}</p>
                    <p className="text-xs opacity-60 mt-1">{conv.time}</p>
                    <div className="flex gap-1 mt-1">
                      <button
                        className="p-1 rounded hover:bg-purple-800"
                        title="Edit"
                        onClick={() => handleEditConv(index)}
                      >
                        <Edit className="w-3 h-3 text-blue-400" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              <button
                className="flex items-center gap-1 mt-2 px-2 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded shadow text-xs"
                onClick={handleAddConv}
              >
                <Plus className="w-3 h-3" /> Add Message
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="p-4 border-t border-purple-500/20">
              <p className="text-xs text-gray-400 mb-2">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <motion.div key={index} className="flex items-center gap-1">
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setMessage(suggestion)}
                      className="px-3 py-1 text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full hover:bg-purple-500/20 transition-colors"
                    >
                      {suggestion}
                    </motion.button>
                    <button
                      className="p-1 rounded hover:bg-purple-800"
                      title="Edit"
                      onClick={() => handleEditSuggestion(index)}
                    >
                      <Edit className="w-3 h-3 text-blue-400" />
                    </button>
                  </motion.div>
                ))}
                <button
                  className="flex items-center gap-1 px-2 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded shadow text-xs"
                  onClick={handleAddSuggestion}
                >
                  <Plus className="w-3 h-3" /> Add Suggestion
                </button>
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-purple-500/20">
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  {DASHBOARD_FEATURES.map((feature, idx) => (
                    <button
                      key={idx}
                      className="px-3 py-1 text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full hover:bg-purple-500/20 transition-colors"
                      onClick={() => handleSend(feature.prompt)}
                      disabled={loading}
                    >
                      {feature.label}
                    </button>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
                    placeholder="Ask me anything about your code or dashboard..."
                    className="flex-1 px-3 py-2 bg-gray-900/50 border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-400 text-white placeholder-gray-500 text-sm"
                    disabled={loading}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSend()}
                    className="p-2 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-200"
                    disabled={loading}
                  >
                    <Send className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </div>
              {loading && <div className="text-xs text-purple-400 mt-2">AI is typing...</div>}
              {error && (
                <div className="text-xs text-red-400 mt-2 px-4 pb-2">
                  {error.includes('Failed to fetch')
                    ? 'Failed to fetch AI response. Please check your internet connection, API key, and ensure CORS is allowed for the OpenAI endpoint.'
                    : error}
                </div>
              )}
            </div>
          </AnimatePresence>
        </>
      )}
      {/* Modal for Add/Edit Suggestion/Conversation */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <form
            className="bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md space-y-4"
            onSubmit={handleModalSubmit}
          >
            <h3 className="text-lg font-bold text-white mb-2">
              {modalType === 'add-suggestion' && 'Add Suggestion'}
              {modalType === 'edit-suggestion' && 'Edit Suggestion'}
              {modalType === 'add-conv' && 'Add Message'}
              {modalType === 'edit-conv' && 'Edit Message'}
            </h3>
            <div className="space-y-2">
              {(modalType === 'add-suggestion' || modalType === 'edit-suggestion') && (
                <input
                  name="suggestion"
                  defaultValue={modalType === 'edit-suggestion' && currentIndex !== null ? suggestions[currentIndex] : ''}
                  placeholder="Suggestion"
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  required
                />
              )}
              {(modalType === 'add-conv' || modalType === 'edit-conv') && (
                <>
                  <select
                    name="type"
                    defaultValue={modalType === 'edit-conv' && currentIndex !== null ? conversations[currentIndex].type : 'user'}
                    className="w-full p-2 rounded bg-gray-800 text-white"
                    required
                  >
                    <option value="user">User</option>
                    <option value="ai">AI</option>
                  </select>
                  <input
                    name="message"
                    defaultValue={modalType === 'edit-conv' && currentIndex !== null ? conversations[currentIndex].message : ''}
                    placeholder="Message"
                    className="w-full p-2 rounded bg-gray-800 text-white"
                    required
                  />
                  <input
                    name="time"
                    defaultValue={modalType === 'edit-conv' && currentIndex !== null ? conversations[currentIndex].time : ''}
                    placeholder="Time (e.g., now, 2 min ago)"
                    className="w-full p-2 rounded bg-gray-800 text-white"
                    required
                  />
                </>
              )}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
              >
                {modalType && (modalType.startsWith('add') ? 'Add' : 'Save')}
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Analysis Result Popup */}
      {analysisResult && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-xl z-50">
          {analysisResult}
          <button
            className="ml-4 text-purple-400 hover:underline"
            onClick={() => setAnalysisResult(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;