import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wrench,
  Zap,
  ArrowRight,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
  Sparkles
} from 'lucide-react';

const Refactoring: React.FC = () => {
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const suggestions = [
    {
      id: 1,
      title: 'Optimize useState with useReducer',
      file: 'src/components/UserProfile.tsx',
      impact: 'Performance',
      difficulty: 'Medium',
      savings: '15% faster renders',
      before: `const [user, setUser] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const fetchUser = async (id) => {
  setLoading(true);
  try {
    const userData = await api.getUser(id);
    setUser(userData);
    setError(null);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};`,
      after: `const userReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, user: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const [state, dispatch] = useReducer(userReducer, {
  user: null,
  loading: false,
  error: null
});

const fetchUser = async (id) => {
  dispatch({ type: 'FETCH_START' });
  try {
    const userData = await api.getUser(id);
    dispatch({ type: 'FETCH_SUCCESS', payload: userData });
  } catch (err) {
    dispatch({ type: 'FETCH_ERROR', payload: err.message });
  }
};`
    },
    {
      id: 2,
      title: 'Implement useMemo for expensive calculations',
      file: 'src/components/DataTable.tsx',
      impact: 'Performance',
      difficulty: 'Easy',
      savings: '40% faster filtering',
      before: `const DataTable = ({ data, filters }) => {
  const filteredData = data.filter(item => {
    return filters.every(filter => 
      item[filter.key].toString()
        .toLowerCase()
        .includes(filter.value.toLowerCase())
    );
  });

  return (
    <table>
      {filteredData.map(item => (
        <tr key={item.id}>
          <td>{item.name}</td>
        </tr>
      ))}
    </table>
  );
};`,
      after: `const DataTable = ({ data, filters }) => {
  const filteredData = useMemo(() => {
    return data.filter(item => {
      return filters.every(filter => 
        item[filter.key].toString()
          .toLowerCase()
          .includes(filter.value.toLowerCase())
      );
    });
  }, [data, filters]);

  return (
    <table>
      {filteredData.map(item => (
        <tr key={item.id}>
          <td>{item.name}</td>
        </tr>
      ))}
    </table>
  );
};`
    }
  ];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const currentSuggestion = suggestions[selectedSuggestion];

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
          <h1 className="text-3xl font-bold text-white mb-2">AI Refactoring</h1>
          <p className="text-gray-400">
            Intelligent code improvements powered by AI
          </p>
        </div>
        <div className="flex items-center space-x-2 text-purple-400">
          <Sparkles className="w-5 h-5" />
          <span className="text-sm font-medium">{suggestions.length} suggestions available</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Suggestions List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-gray-950/80 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Suggestions</h2>
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedSuggestion(index)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedSuggestion === index
                      ? 'bg-purple-500/20 border-purple-500/40 shadow-lg shadow-purple-500/25'
                      : 'bg-gray-900/50 border-purple-500/10 hover:border-purple-500/30'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      selectedSuggestion === index
                        ? 'bg-purple-500/30'
                        : 'bg-gray-800/50'
                    }`}>
                      <Wrench className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white text-sm mb-1">
                        {suggestion.title}
                      </h3>
                      <p className="text-xs text-gray-400 mb-2">
                        {suggestion.file}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">
                          {suggestion.savings}
                        </span>
                        <span className="text-xs text-blue-400">
                          {suggestion.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Code Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="bg-gray-950/80 backdrop-blur-xl border border-purple-500/20 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-purple-500/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">
                  {currentSuggestion.title}
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-sm text-green-400">
                    <Zap className="w-4 h-4" />
                    <span>{currentSuggestion.savings}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>{currentSuggestion.file}</span>
                <span>•</span>
                <span>{currentSuggestion.impact} Impact</span>
                <span>•</span>
                <span>{currentSuggestion.difficulty} Difficulty</span>
              </div>
            </div>

            {/* Code Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Before */}
              <div className="border-r border-purple-500/20">
                <div className="p-4 bg-red-500/5 border-b border-purple-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-red-400">Before</span>
                    <button
                      onClick={() => copyToClipboard(currentSuggestion.before, 0)}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedIndex === 0 ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
                    <code>{currentSuggestion.before}</code>
                  </pre>
                </div>
              </div>

              {/* After */}
              <div>
                <div className="p-4 bg-green-500/5 border-b border-purple-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-400">After</span>
                    <button
                      onClick={() => copyToClipboard(currentSuggestion.after, 1)}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedIndex === 1 ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
                    <code>{currentSuggestion.after}</code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-purple-500/20 bg-gray-900/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-700 rounded-lg hover:from-green-600 hover:to-green-800 transition-all duration-200"
                  >
                    <Check className="w-4 h-4" />
                    <span>Apply Refactoring</span>
                  </motion.button>
                  
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  
                  <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors">
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>AI Confidence:</span>
                  <div className="flex items-center space-x-1">
                    <div className="w-16 bg-gray-800 rounded-full h-2">
                      <div className="w-14 bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" />
                    </div>
                    <span className="text-green-400 font-medium">92%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Refactoring;