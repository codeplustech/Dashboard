import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, AlertTriangle, CheckCircle, Info, Plus, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Performance: React.FC = () => {
  const [metrics, setMetrics] = useState([
    { name: 'Build Time', value: '2m 34s', trend: 'up' },
    { name: 'Bundle Size', value: '1.2 MB', trend: 'down' },
    { name: 'Performance Score', value: '94%', trend: 'up' },
  ]);
  const [regressions, setRegressions] = useState([
    { date: '2024-02-01', area: 'API Response', change: '+120ms', status: 'regression' },
    { date: '2024-01-28', area: 'UI Render', change: '-80ms', status: 'improvement' },
    { date: '2024-01-25', area: 'Build Time', change: '+10s', status: 'regression' },
    { date: '2024-01-20', area: 'Bundle Size', change: '-0.2MB', status: 'improvement' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const tips = [
    'Enable code splitting to reduce initial bundle size.',
    'Use memoization for expensive calculations in React components.',
    'Optimize images and static assets.',
    'Minimize third-party dependencies.',
  ];
  const alerts = [
    { type: 'warning', message: 'API response time increased by 120ms since last release.' },
    { type: 'info', message: 'UI render time improved by 80ms.' },
  ];
  // Mock trends data
  const trendsData = [
    { date: '2024-01-10', score: 85, build: 180, bundle: 1.5 },
    { date: '2024-01-15', score: 88, build: 170, bundle: 1.4 },
    { date: '2024-01-20', score: 90, build: 160, bundle: 1.3 },
    { date: '2024-01-25', score: 92, build: 150, bundle: 1.25 },
    { date: '2024-01-30', score: 93, build: 145, bundle: 1.22 },
    { date: '2024-02-01', score: 94, build: 154, bundle: 1.2 },
  ];

  const handleExportMetrics = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(metrics, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', 'performance_metrics.json');
    dlAnchorElem.click();
  };
  const handleExportRegressions = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(regressions, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', 'performance_regressions.json');
    dlAnchorElem.click();
  };

  const handleAddRegression = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    setRegressions([
      {
        date: formData.get('date') as string,
        area: formData.get('area') as string,
        change: formData.get('change') as string,
        status: formData.get('status') as string,
      },
      ...regressions,
    ]);
    setShowAddModal(false);
    setModalMsg('Regression/Improvement added!');
    setShowModal(true);
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Performance</h1>
        <p className="text-gray-400">Key performance metrics and optimization suggestions.</p>
      </motion.div>
      {/* Actions */}
      <div className="flex flex-wrap gap-4 items-center mb-2">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded shadow"
          onClick={handleExportMetrics}
        >
          <Download className="w-4 h-4" /> Export Metrics
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded shadow"
          onClick={handleExportRegressions}
        >
          <Download className="w-4 h-4" /> Export Regressions
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded shadow"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="w-4 h-4" /> Add Regression/Improvement
        </button>
      </div>
      {/* Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-gray-950/80 p-6 rounded-xl border border-purple-500/20 flex flex-col items-center">
            <Zap className="w-8 h-8 text-blue-400 mb-2" />
            <div className="text-lg font-semibold text-purple-300">{m.name}</div>
            <div className="text-2xl text-white font-bold">{m.value}</div>
            <div className="text-xs text-gray-400">Trend: {m.trend}</div>
          </div>
        ))}
      </div>
      {/* Trends Chart */}
      <div className="bg-gray-950/80 p-6 rounded-xl border border-purple-500/20">
        <h2 className="text-lg font-semibold text-purple-300 mb-2">Performance Trends (Last 30 Days)</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendsData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#6b21a8" />
              <XAxis dataKey="date" stroke="#a78bfa" />
              <YAxis stroke="#a78bfa" />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#a78bfa" strokeWidth={2} name="Perf. Score" />
              <Line type="monotone" dataKey="build" stroke="#38bdf8" strokeWidth={2} name="Build Time (s)" />
              <Line type="monotone" dataKey="bundle" stroke="#f472b6" strokeWidth={2} name="Bundle Size (MB)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Recent Regressions/Improvements Table */}
      <div className="bg-gray-950/80 p-6 rounded-xl border border-purple-500/20">
        <h2 className="text-lg font-semibold text-purple-300 mb-2">Recent Regressions & Improvements</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400">
              <th className="pb-2">Date</th>
              <th className="pb-2">Area</th>
              <th className="pb-2">Change</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {regressions.map((r, i) => (
              <tr key={i} className="border-t border-purple-500/10">
                <td className="py-2 text-white">{r.date}</td>
                <td className="py-2 text-gray-300">{r.area}</td>
                <td className="py-2 text-purple-300 font-semibold">{r.change}</td>
                <td className={`py-2 font-semibold ${r.status === 'regression' ? 'text-orange-400' : 'text-green-400'}`}>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Optimization Tips */}
      <div className="bg-gray-950/80 p-6 rounded-xl border border-purple-500/20">
        <h2 className="text-lg font-semibold text-purple-300 mb-2">Optimization Tips</h2>
        <ul className="list-disc pl-6 text-gray-300 space-y-1">
          {tips.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>
      {/* Performance Alerts */}
      <div className="bg-gray-950/80 p-6 rounded-xl border border-purple-500/20">
        <h2 className="text-lg font-semibold text-purple-300 mb-2">Performance Alerts</h2>
        <ul className="space-y-2">
          {alerts.map((a, i) => (
            <li key={i} className="flex items-center">
              {a.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-orange-400 mr-2" /> : <Info className="w-5 h-5 text-blue-400 mr-2" />}
              <span className={a.type === 'warning' ? 'text-orange-400' : 'text-blue-300'}>{a.message}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Add Regression/Improvement Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <form
            className="bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md space-y-4"
            onSubmit={handleAddRegression}
          >
            <h3 className="text-lg font-bold text-white mb-2">Add Regression/Improvement</h3>
            <div className="space-y-2">
              <input
                name="date"
                type="date"
                className="w-full p-2 rounded bg-gray-800 text-white"
                required
              />
              <input
                name="area"
                placeholder="Area (e.g., API Response)"
                className="w-full p-2 rounded bg-gray-800 text-white"
                required
              />
              <input
                name="change"
                placeholder="Change (e.g., +120ms)"
                className="w-full p-2 rounded bg-gray-800 text-white"
                required
              />
              <select
                name="status"
                className="w-full p-2 rounded bg-gray-800 text-white"
                required
              >
                <option value="regression">Regression</option>
                <option value="improvement">Improvement</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Popup/Modal */}
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

export default Performance; 