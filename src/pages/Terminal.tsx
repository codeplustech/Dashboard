import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Play, Square, RotateCcw } from 'lucide-react';

const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; output: string; timestamp: string }>>([
    {
      command: 'codeplus scan --all',
      output: `🔍 Scanning codebase...
✅ Found 156 files to analyze
⚡ Running AI-powered analysis...
📊 Generated 12 optimization suggestions
🎯 Code quality score: 87%`,
      timestamp: '14:23:45'
    },
    {
      command: 'codeplus refactor --suggest',
      output: `💡 AI Refactoring Suggestions:
1. UserService.tsx: Convert useState to useReducer (Performance +15%)
2. DataTable.tsx: Add useMemo for filtering (Performance +40%)
3. API Client: Implement request caching (Network -60%)
4. Components: Extract custom hooks (Maintainability +25%)`,
      timestamp: '14:24:12'
    }
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    'help': `Available commands:
  scan [--all|--file <path>]    Run code analysis
  refactor [--suggest|--apply]  AI refactoring tools
  audit [--security|--perf]     Security and performance audit
  git [status|branches|commits] Git integration commands
  clear                         Clear terminal
  help                          Show this help`,
    'clear': '',
    'scan': `🔍 Scanning codebase...
✅ Analysis complete
📊 Found 3 critical issues, 8 warnings
💡 12 optimization opportunities available`,
    'git status': `On branch develop
Your branch is up to date with 'origin/develop'.

Changes not staged for commit:
  modified:   src/components/UserService.tsx
  modified:   src/utils/apiClient.ts
  
Untracked files:
  src/hooks/useAuth.ts`,
    'audit': `🛡️  Security Audit Results:
✅ No critical vulnerabilities found
⚠️  2 medium-severity issues detected:
   - Hardcoded API key in config
   - Missing input validation in auth endpoint
🚀 Performance Score: 94/100`
  };

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output = '';

    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    if (commands[trimmedCmd as keyof typeof commands]) {
      output = commands[trimmedCmd as keyof typeof commands];
    } else if (trimmedCmd.startsWith('scan')) {
      output = commands['scan'];
    } else if (trimmedCmd.startsWith('git')) {
      output = commands['git status'];
    } else if (trimmedCmd.startsWith('audit')) {
      output = commands['audit'];
    } else {
      output = `Command not found: ${cmd}
Type 'help' for available commands.`;
    }

    const newEntry = {
      command: cmd,
      output,
      timestamp: new Date().toLocaleTimeString()
    };

    setHistory(prev => [...prev, newEntry]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isRunning) {
      setIsRunning(true);
      executeCommand(input);
      setInput('');
      
      // Simulate command execution time
      setTimeout(() => setIsRunning(false), 1000);
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

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
          <h1 className="text-3xl font-bold text-white mb-2">Terminal</h1>
          <p className="text-gray-400">
            Command-line interface for code analysis and management
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setHistory([])}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-800/50 hover:bg-gray-700/50 border border-purple-500/20 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-400">Clear</span>
          </button>
          <div className="flex items-center space-x-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`} />
            <span className="text-gray-400">{isRunning ? 'Running' : 'Ready'}</span>
          </div>
        </div>
      </motion.div>

      {/* Terminal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-black/90 backdrop-blur-xl border border-purple-500/20 rounded-xl overflow-hidden shadow-2xl"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between p-4 bg-gray-900/50 border-b border-purple-500/20">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <div className="flex items-center space-x-2">
              <TerminalIcon className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-400 font-mono">CodePlus Terminal v2.1.0</span>
            </div>
          </div>
          <div className="text-xs text-gray-500 font-mono">
            Connected to: localhost:3000
          </div>
        </div>

        {/* Terminal Content */}
        <div 
          ref={terminalRef}
          className="p-4 h-96 overflow-y-auto font-mono text-sm"
        >
          {/* Welcome Message */}
          <div className="text-green-400 mb-4">
            <div>Welcome to CodePlus Terminal</div>
            <div className="text-gray-400">Type 'help' for available commands</div>
          </div>

          {/* Command History */}
          {history.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              {/* Command */}
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-purple-400">$</span>
                <span className="text-white">{entry.command}</span>
                <span className="text-xs text-gray-500 ml-auto">{entry.timestamp}</span>
              </div>
              
              {/* Output */}
              {entry.output && (
                <div className="text-gray-300 whitespace-pre-wrap ml-4 mb-2 leading-relaxed">
                  {entry.output}
                </div>
              )}
            </motion.div>
          ))}

          {/* Current Input */}
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <span className="text-purple-400">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-white outline-none font-mono"
              placeholder="Enter command..."
              disabled={isRunning}
            />
            {isRunning && (
              <div className="flex items-center space-x-1">
                <div className="w-1 h-4 bg-purple-400 animate-pulse" />
                <span className="text-xs text-gray-400">Executing...</span>
              </div>
            )}
          </form>
        </div>
      </motion.div>

      {/* Quick Commands */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gray-950/80 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">Quick Commands</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { cmd: 'scan --all', desc: 'Full code scan' },
            { cmd: 'refactor --suggest', desc: 'AI suggestions' },
            { cmd: 'audit --security', desc: 'Security audit' },
            { cmd: 'git status', desc: 'Git status' }
          ].map((command, index) => (
            <motion.button
              key={command.cmd}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => !isRunning && executeCommand(command.cmd)}
              disabled={isRunning}
              className="p-3 bg-gray-900/50 border border-purple-500/20 rounded-lg hover:border-purple-500/40 transition-all duration-200 text-left disabled:opacity-50"
            >
              <div className="font-mono text-sm text-purple-400 mb-1">{command.cmd}</div>
              <div className="text-xs text-gray-400">{command.desc}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Terminal;