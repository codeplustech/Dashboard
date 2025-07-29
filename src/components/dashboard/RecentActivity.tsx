import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GitCommit,
  AlertTriangle,
  CheckCircle,
  Wrench,
  Clock,
  Plus,
  Edit,
  Download,
  Search
} from 'lucide-react';

const initialActivities = [
  {
    id: 1,
    type: 'commit',
    message: 'Fixed memory leak in UserService',
    time: '2 minutes ago',
    icon: GitCommit,
    color: 'text-blue-400'
  },
  {
    id: 2,
    type: 'alert',
    message: 'Security vulnerability detected in dependencies',
    time: '5 minutes ago',
    icon: AlertTriangle,
    color: 'text-orange-400'
  },
  {
    id: 3,
    type: 'success',
    message: 'Code audit completed successfully',
    time: '12 minutes ago',
    icon: CheckCircle,
    color: 'text-green-400'
  },
  {
    id: 4,
    type: 'refactor',
    message: 'AI suggested refactoring for better performance',
    time: '18 minutes ago',
    icon: Wrench,
    color: 'text-purple-400'
  },
  {
    id: 5,
    type: 'commit',
    message: 'Updated API endpoints for v2.1',
    time: '25 minutes ago',
    icon: GitCommit,
    color: 'text-blue-400'
  }
];

const RecentActivity: React.FC = () => {
  const [activities, setActivities] = useState(initialActivities);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | null>(null);
  const [currentActivity, setCurrentActivity] = useState<any>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleAdd = () => {
    setModalType('add');
    setCurrentActivity(null);
    setShowModal(true);
  };

  const handleEdit = (activity: any) => {
    setModalType('edit');
    setCurrentActivity(activity);
    setShowModal(true);
  };

  const handleDownload = (activity: any) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(activity, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `activity_${activity.id}.json`);
    dlAnchorElem.click();
  };

  const handleAnalyze = (activity: any) => {
    setAnalysisResult('Analyzing...');
    setTimeout(() => {
      setAnalysisResult(`Analysis complete for activity: "${activity.message}"`);
    }, 1200);
  };

  const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const type = formData.get('type') as string;
    const message = formData.get('message') as string;
    const time = formData.get('time') as string;
    let icon = GitCommit;
    let color = 'text-blue-400';
    if (type === 'alert') { icon = AlertTriangle; color = 'text-orange-400'; }
    else if (type === 'success') { icon = CheckCircle; color = 'text-green-400'; }
    else if (type === 'refactor') { icon = Wrench; color = 'text-purple-400'; }
    const newActivity = {
      id: modalType === 'add' ? Date.now() : currentActivity.id,
      type,
      message,
      time,
      icon,
      color
    };
    if (modalType === 'add') {
      setActivities([newActivity, ...activities]);
    } else if (modalType === 'edit') {
      setActivities(activities.map(a => (a.id === currentActivity.id ? newActivity : a)));
    }
    setShowModal(false);
    setCurrentActivity(null);
    setModalType(null);
  };

  return (
    <div className="bg-gray-950/80 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">Recent Activity</h2>
          <p className="text-gray-400 text-sm">Latest updates and changes</p>
        </div>
        <button
          className="flex items-center gap-1 px-3 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded shadow"
          onClick={handleAdd}
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-purple-500/5 transition-colors group"
          >
            <div className={`p-2 rounded-lg bg-gray-900/50 ${activity.color} group-hover:scale-110 transition-transform duration-200`}>
              <activity.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                {activity.message}
              </p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
            <div className="flex flex-col gap-1 ml-2">
              <button
                className="p-1 rounded hover:bg-purple-800"
                title="Edit"
                onClick={() => handleEdit(activity)}
              >
                <Edit className="w-4 h-4 text-blue-400" />
              </button>
              <button
                className="p-1 rounded hover:bg-purple-800"
                title="Download"
                onClick={() => handleDownload(activity)}
              >
                <Download className="w-4 h-4 text-green-400" />
              </button>
              <button
                className="p-1 rounded hover:bg-purple-800"
                title="Analyze"
                onClick={() => handleAnalyze(activity)}
              >
                <Search className="w-4 h-4 text-yellow-400" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-2 text-sm text-purple-400 hover:text-purple-300 border border-purple-500/20 hover:border-purple-500/40 rounded-lg transition-all duration-200"
      >
        View All Activity
      </motion.button>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <form
            className="bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md space-y-4"
            onSubmit={handleModalSubmit}
          >
            <h3 className="text-lg font-bold text-white mb-2">
              {modalType === 'add' ? 'Add Activity' : 'Edit Activity'}
            </h3>
            <div className="space-y-2">
              <select
                name="type"
                defaultValue={currentActivity?.type || 'commit'}
                className="w-full p-2 rounded bg-gray-800 text-white"
                required
              >
                <option value="commit">Commit</option>
                <option value="alert">Alert</option>
                <option value="success">Success</option>
                <option value="refactor">Refactor</option>
              </select>
              <input
                name="message"
                defaultValue={currentActivity?.message || ''}
                placeholder="Message"
                className="w-full p-2 rounded bg-gray-800 text-white"
                required
              />
              <input
                name="time"
                defaultValue={currentActivity?.time || ''}
                placeholder="Time (e.g., 2 minutes ago)"
                className="w-full p-2 rounded bg-gray-800 text-white"
                required
              />
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
                {modalType === 'add' ? 'Add' : 'Save'}
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

export default RecentActivity;