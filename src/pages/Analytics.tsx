import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('last30');
  const metrics = [
    { label: 'Total Commits', value: 1243 },
    { label: 'Pull Requests', value: 312 },
    { label: 'Issues Closed', value: 287 },
    { label: 'Active Contributors', value: 14 },
  ];
  const contributors = [
    { name: 'John Doe', commits: 320 },
    { name: 'Jane Smith', commits: 210 },
    { name: 'Mike Johnson', commits: 180 },
    { name: 'Sarah Lee', commits: 150 },
  ];
  // Mock chart data
  const commitsData = [
    { date: '2024-05-01', commits: 20 },
    { date: '2024-05-05', commits: 35 },
    { date: '2024-05-10', commits: 50 },
    { date: '2024-05-15', commits: 40 },
    { date: '2024-05-20', commits: 60 },
    { date: '2024-05-25', commits: 30 },
    { date: '2024-05-30', commits: 70 },
  ];
  const activeContribData = [
    { date: '2024-05-01', contributors: 5 },
    { date: '2024-05-10', contributors: 8 },
    { date: '2024-05-20', contributors: 12 },
    { date: '2024-05-30', contributors: 14 },
  ];
  const reviewActivityData = [
    { date: '2024-05-01', reviews: 10 },
    { date: '2024-05-10', reviews: 18 },
    { date: '2024-05-20', reviews: 25 },
    { date: '2024-05-30', reviews: 30 },
  ];
  const issueResolutionData = [
    { date: '2024-05-01', hours: 48 },
    { date: '2024-05-10', hours: 36 },
    { date: '2024-05-20', hours: 24 },
    { date: '2024-05-30', hours: 12 },
  ];

  const handleExportMetrics = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(metrics, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', 'metrics.json');
    dlAnchorElem.click();
  };
  const handleExportContributors = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(contributors, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', 'contributors.json');
    dlAnchorElem.click();
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-gray-400">Visualize codebase trends and team productivity.</p>
      </motion.div>
      {/* Date Filter & Export */}
      <div className="flex flex-wrap gap-4 items-center mb-2">
        <label className="text-gray-300">Date Range:</label>
        <select
          className="bg-gray-900 text-white rounded px-3 py-1 border border-purple-500/20"
          value={dateRange}
          onChange={e => setDateRange(e.target.value)}
        >
          <option value="last7">Last 7 days</option>
          <option value="last30">Last 30 days</option>
          <option value="all">All time</option>
        </select>
        <button
          className="ml-auto px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded shadow"
          onClick={handleExportMetrics}
        >
          Export Metrics
        </button>
        <button
          className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded shadow"
          onClick={handleExportContributors}
        >
          Export Contributors
        </button>
      </div>
      {/* Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <div key={i} className="bg-gray-950/80 p-6 rounded-xl border border-purple-500/20 flex flex-col items-center">
            <div className="text-lg font-semibold text-purple-300 mb-1">{m.label}</div>
            <div className="text-2xl text-white font-bold">{m.value}</div>
          </div>
        ))}
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-950/80 p-6 rounded-xl border border-purple-500/20">
          <h2 className="text-lg font-semibold text-purple-300 mb-2">Commits Over Time</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={commitsData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6b21a8" />
                <XAxis dataKey="date" stroke="#a78bfa" />
                <YAxis stroke="#a78bfa" />
                <Tooltip />
                <Line type="monotone" dataKey="commits" stroke="#a78bfa" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-gray-950/80 p-6 rounded-xl border border-purple-500/20">
          <h2 className="text-lg font-semibold text-purple-300 mb-2">Active Contributors</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activeContribData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6b21a8" />
                <XAxis dataKey="date" stroke="#a78bfa" />
                <YAxis stroke="#a78bfa" />
                <Tooltip />
                <Bar dataKey="contributors" fill="#a78bfa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-gray-950/80 p-6 rounded-xl border border-purple-500/20 md:col-span-2">
          <h2 className="text-lg font-semibold text-purple-300 mb-2">Code Review Activity</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={reviewActivityData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6b21a8" />
                <XAxis dataKey="date" stroke="#a78bfa" />
                <YAxis stroke="#a78bfa" />
                <Tooltip />
                <Line type="monotone" dataKey="reviews" stroke="#a78bfa" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-gray-950/80 p-6 rounded-xl border border-purple-500/20 md:col-span-2">
          <h2 className="text-lg font-semibold text-purple-300 mb-2">Issue Resolution Time (hours)</h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={issueResolutionData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6b21a8" />
                <XAxis dataKey="date" stroke="#a78bfa" />
                <YAxis stroke="#a78bfa" />
                <Tooltip />
                <Bar dataKey="hours" fill="#a78bfa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Top Contributors Table */}
      <div className="bg-gray-950/80 p-6 rounded-xl border border-purple-500/20">
        <h2 className="text-lg font-semibold text-purple-300 mb-4">Top Contributors</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400">
              <th className="pb-2">Name</th>
              <th className="pb-2">Commits</th>
            </tr>
          </thead>
          <tbody>
            {contributors.map((c, i) => (
              <tr key={i} className="border-t border-purple-500/10">
                <td className="py-2 text-white">{c.name}</td>
                <td className="py-2 text-purple-300 font-semibold">{c.commits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics; 