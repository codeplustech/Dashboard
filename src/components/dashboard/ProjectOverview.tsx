import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Folder,
  GitBranch,
  Users,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Plus,
  Edit,
  Download,
  Search
} from 'lucide-react';

const API_KEY = '';

const initialProjects = [
  {
    id: 1,
    name: 'E-Commerce Platform',
    status: 'active',
    health: 92,
    issues: 3,
    lastScan: '2 hours ago',
    commits: 156,
    branches: 8,
    contributors: 5
  },
  {
    id: 2,
    name: 'Mobile App Backend',
    status: 'warning',
    health: 76,
    issues: 12,
    lastScan: '4 hours ago',
    commits: 89,
    branches: 4,
    contributors: 3
  },
  {
    id: 3,
    name: 'Analytics Dashboard',
    status: 'success',
    health: 95,
    issues: 1,
    lastScan: '1 hour ago',
    commits: 234,
    branches: 6,
    contributors: 7
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success':
      return 'text-green-400 bg-green-500/20 border-green-500/30';
    case 'warning':
      return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
    case 'active':
      return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
    default:
      return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'success':
      return CheckCircle;
    case 'warning':
      return AlertCircle;
    case 'active':
      return Clock;
    default:
      return Clock;
  }
};

const ProjectOverview: React.FC = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | null>(null);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleAdd = () => {
    setModalType('add');
    setCurrentProject(null);
    setShowModal(true);
  };

  const handleEdit = (project: any) => {
    setModalType('edit');
    setCurrentProject(project);
    setShowModal(true);
  };

  const handleDownload = (project: any) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(project, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `${project.name.replace(/\s+/g, '_')}_data.json`);
    dlAnchorElem.click();
  };

  const handleAnalyze = async (project: any) => {
    // Mock API call
    setAnalysisResult('Analyzing...');
    setTimeout(() => {
      setAnalysisResult(`Analysis complete for ${project.name}! (API Key used)`);
    }, 1500);
    // Here you would use fetch/axios to call your real API with API_KEY
  };

  const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const newProject = {
      id: modalType === 'add' ? Date.now() : currentProject.id,
      name: formData.get('name') as string,
      status: formData.get('status') as string,
      health: Number(formData.get('health')),
      issues: Number(formData.get('issues')),
      lastScan: formData.get('lastScan') as string,
      commits: Number(formData.get('commits')),
      branches: Number(formData.get('branches')),
      contributors: Number(formData.get('contributors')),
    };
    if (modalType === 'add') {
      setProjects([...projects, newProject]);
    } else if (modalType === 'edit') {
      setProjects(projects.map(p => (p.id === currentProject.id ? newProject : p)));
    }
    setShowModal(false);
    setCurrentProject(null);
    setModalType(null);
  };

  return (
    <div className="bg-gray-950/80 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">Project Overview</h2>
          <p className="text-gray-400 text-sm">Monitor all your repositories</p>
        </div>
        <button
          className="flex items-center gap-1 px-3 py-1 bg-purple-700 hover:bg-purple-800 text-white rounded shadow"
          onClick={handleAdd}
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((project, index) => {
          const StatusIcon = getStatusIcon(project.status);
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-4 bg-gray-900/50 border border-purple-500/10 rounded-lg hover:border-purple-500/30 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors">
                    {project.name}
                  </h3>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-xs ${getStatusColor(project.status)}`}>
                    <StatusIcon className="w-3 h-3" />
                    <span className="capitalize">{project.status}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="p-1 rounded hover:bg-purple-800"
                    title="Edit"
                    onClick={() => handleEdit(project)}
                  >
                    <Edit className="w-4 h-4 text-blue-400" />
                  </button>
                  <button
                    className="p-1 rounded hover:bg-purple-800"
                    title="Download"
                    onClick={() => handleDownload(project)}
                  >
                    <Download className="w-4 h-4 text-green-400" />
                  </button>
                  <button
                    className="p-1 rounded hover:bg-purple-800"
                    title="Analyze"
                    onClick={() => handleAnalyze(project)}
                  >
                    <Search className="w-4 h-4 text-yellow-400" />
                  </button>
                </div>
              </div>
              {/* Health Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Code Health</span>
                  <span>{project.health}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.health}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className={`h-2 rounded-full ${
                      project.health >= 90
                        ? 'bg-gradient-to-r from-green-500 to-green-600'
                        : project.health >= 75
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                        : 'bg-gradient-to-r from-orange-500 to-orange-600'
                    }`}
                  />
                </div>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 text-xs">
                <div className="text-center">
                  <div className="text-gray-400 mb-1">Issues</div>
                  <div className="text-white font-medium">{project.issues}</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 mb-1">Commits</div>
                  <div className="text-white font-medium">{project.commits}</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 mb-1">Branches</div>
                  <div className="text-white font-medium">{project.branches}</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400 mb-1">Contributors</div>
                  <div className="text-white font-medium">{project.contributors}</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-purple-500/10 text-xs text-gray-400">
                Last scan: {project.lastScan}
              </div>
            </motion.div>
          );
        })}
      </div>
      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <form
            className="bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md space-y-4"
            onSubmit={handleModalSubmit}
          >
            <h3 className="text-lg font-bold text-white mb-2">
              {modalType === 'add' ? 'Add Project' : 'Edit Project'}
            </h3>
            <div className="space-y-2">
              <input
                name="name"
                defaultValue={currentProject?.name || ''}
                placeholder="Project Name"
                className="w-full p-2 rounded bg-gray-800 text-white"
                required
              />
              <select
                name="status"
                defaultValue={currentProject?.status || 'active'}
                className="w-full p-2 rounded bg-gray-800 text-white"
                required
              >
                <option value="active">Active</option>
                <option value="warning">Warning</option>
                <option value="success">Success</option>
              </select>
              <input
                name="health"
                type="number"
                min="0"
                max="100"
                defaultValue={currentProject?.health || 90}
                placeholder="Health (%)"
                className="w-full p-2 rounded bg-gray-800 text-white"
                required
              />
              <input
                name="issues"
                type="number"
                min="0"
                defaultValue={currentProject?.issues || 0}
                placeholder="Issues"
                className="w-full p-2 rounded bg-gray-800 text-white"
                required
              />
              <input
                name="lastScan"
                defaultValue={currentProject?.lastScan || ''}
                placeholder="Last Scan (e.g., 2 hours ago)"
                className="w-full p-2 rounded bg-gray-800 text-white"
                required
              />
              <input
                name="commits"
                type="number"
                min="0"
                defaultValue={currentProject?.commits || 0}
                placeholder="Commits"
                className="w-full p-2 rounded bg-gray-800 text-white"
                required
              />
              <input
                name="branches"
                type="number"
                min="0"
                defaultValue={currentProject?.branches || 0}
                placeholder="Branches"
                className="w-full p-2 rounded bg-gray-800 text-white"
                required
              />
              <input
                name="contributors"
                type="number"
                min="0"
                defaultValue={currentProject?.contributors || 0}
                placeholder="Contributors"
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

export default ProjectOverview;