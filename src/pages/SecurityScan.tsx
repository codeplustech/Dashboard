import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, Filter, Clock, Play, Download, Check } from 'lucide-react';

const SecurityScan: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [results, setResults] = useState([
    { id: 1, type: 'Critical', message: 'SQL Injection vulnerability', status: 'open', date: '2024-02-01' },
    { id: 2, type: 'Medium', message: 'Outdated dependency', status: 'resolved', date: '2024-01-28' },
    { id: 3, type: 'Low', message: 'Missing security headers', status: 'open', date: '2024-01-25' },
    { id: 4, type: 'Critical', message: 'XSS vulnerability in comments', status: 'open', date: '2024-01-20' },
    { id: 5, type: 'Medium', message: 'Weak password policy', status: 'resolved', date: '2024-01-15' },
  ]);
  const [loadingScan, setLoadingScan] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const filteredResults = filter === 'all' ? results : results.filter(r => r.type === filter);
  const summary = {
    lastScan: '2024-02-01',
    critical: results.filter(r => r.type === 'Critical').length,
    resolved: results.filter(r => r.status === 'resolved').length,
    open: results.filter(r => r.status === 'open').length,
  };
  const recommendedActions = [
    'Update all outdated dependencies.',
    'Implement Content Security Policy headers.',
    'Review password policy and enforce strong passwords.',
    'Sanitize all user inputs to prevent XSS and SQL Injection.',
  ];
  const timeline = [
    { date: '2024-02-01', event: 'Critical SQL Injection vulnerability found.' },
    { date: '2024-01-28', event: 'Medium severity outdated dependency resolved.' },
    { date: '2024-01-25', event: 'Low severity: Missing security headers detected.' },
    { date: '2024-01-20', event: 'Critical XSS vulnerability found.' },
    { date: '2024-01-15', event: 'Medium severity weak password policy resolved.' },
  ];

  const handleRunScan = () => {
    setLoadingScan(true);
    setModalMsg('Running security scan...');
    setShowModal(true);
    setTimeout(() => {
      // Mock: add a new vulnerability
      setResults(prev => [
        ...prev,
        { id: Date.now(), type: 'Medium', message: 'New mock vulnerability found', status: 'open', date: '2024-02-02' }
      ]);
      setLoadingScan(false);
      setModalMsg('Scan complete! 1 new vulnerability found.');
    }, 2000);
  };

  const handleExportVulns = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(results, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', 'vulnerabilities.json');
    dlAnchorElem.click();
  };
  const handleExportReport = () => {
    const report = {
      summary,
      vulnerabilities: results,
      recommendedActions,
      timeline,
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', 'security_report.json');
    dlAnchorElem.click();
  };

  const handleResolve = (id: number) => {
    setResults(results.map(r => r.id === id ? { ...r, status: 'resolved' } : r));
    setModalMsg('Issue marked as resolved!');
    setShowModal(true);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Security Scan</h1>
        <p className="text-gray-400">Recent security scan results and vulnerabilities.</p>
      </motion.div>
      {/* Actions */}
      <div className="flex flex-wrap gap-4 items-center mb-2">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded shadow"
          onClick={handleRunScan}
          disabled={loadingScan}
        >
          <Play className="w-4 h-4" /> {loadingScan ? 'Scanning...' : 'Run New Scan'}
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded shadow"
          onClick={handleExportVulns}
        >
          <Download className="w-4 h-4" /> Export Vulnerabilities
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded shadow"
          onClick={handleExportReport}
        >
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gray-950/80 p-6 rounded-xl border border-purple-500/20 flex flex-col items-center">
          <Shield className="w-8 h-8 text-purple-400 mb-2" />
          <div className="text-lg font-semibold text-purple-300 mb-1">Last Scan</div>
          <div className="text-white font-bold">{summary.lastScan}</div>
        </div>
        <div className="bg-gray-950/80 p-6 rounded-xl border border-purple-500/20 flex flex-col items-center">
          <AlertTriangle className="w-8 h-8 text-red-400 mb-2" />
          <div className="text-lg font-semibold text-red-300 mb-1">Critical Issues</div>
          <div className="text-white font-bold">{summary.critical}</div>
        </div>
        <div className="bg-gray-950/80 p-6 rounded-xl border border-purple-500/20 flex flex-col items-center">
          <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
          <div className="text-lg font-semibold text-green-300 mb-1">Resolved</div>
          <div className="text-white font-bold">{summary.resolved}</div>
        </div>
        <div className="bg-gray-950/80 p-6 rounded-xl border border-purple-500/20 flex flex-col items-center">
          <AlertTriangle className="w-8 h-8 text-orange-400 mb-2" />
          <div className="text-lg font-semibold text-orange-300 mb-1">Open Issues</div>
          <div className="text-white font-bold">{summary.open}</div>
        </div>
      </div>
      {/* Vulnerabilities Table with Filter */}
      <div className="bg-gray-950/80 p-6 rounded-xl border border-purple-500/20">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 text-purple-400 mr-2" />
          <select value={filter} onChange={e => setFilter(e.target.value)} className="bg-gray-900/50 border border-purple-500/20 rounded-lg text-white px-3 py-1">
            <option value="all">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400">
              <th className="pb-2">Date</th>
              <th className="pb-2">Severity</th>
              <th className="pb-2">Description</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((r, i) => (
              <tr key={i} className="border-t border-purple-500/10">
                <td className="py-2 text-white">{r.date}</td>
                <td className={`py-2 font-semibold ${r.type === 'Critical' ? 'text-red-400' : r.type === 'Medium' ? 'text-yellow-300' : 'text-orange-300'}`}>{r.type}</td>
                <td className="py-2 text-gray-300">{r.message}</td>
                <td className={`py-2 font-semibold ${r.status === 'resolved' ? 'text-green-400' : 'text-orange-400'}`}>{r.status}</td>
                <td className="py-2">
                  {r.status === 'open' && (
                    <button
                      className="flex items-center gap-1 px-2 py-1 bg-green-700 hover:bg-green-800 text-white rounded text-xs"
                      onClick={() => handleResolve(r.id)}
                    >
                      <Check className="w-3 h-3" /> Resolve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Recommended Actions */}
      <div className="bg-gray-950/80 p-6 rounded-xl border border-purple-500/20">
        <h2 className="text-lg font-semibold text-purple-300 mb-2">Recommended Actions</h2>
        <ul className="list-disc pl-6 text-gray-300 space-y-1">
          {recommendedActions.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </div>
      {/* Security Events Timeline */}
      <div className="bg-gray-950/80 p-6 rounded-xl border border-purple-500/20">
        <h2 className="text-lg font-semibold text-purple-300 mb-2 flex items-center"><Clock className="w-5 h-5 mr-2 text-purple-400" />Recent Security Events</h2>
        <ul className="space-y-2">
          {timeline.map((t, i) => (
            <li key={i} className="flex items-center text-gray-300">
              <span className="w-24 text-xs text-gray-400 mr-2">{t.date}</span>
              <span>{t.event}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Modal/Popup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md text-white">
            <div className="mb-4">{modalMsg}</div>
            <button
              className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 mt-2"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityScan; 