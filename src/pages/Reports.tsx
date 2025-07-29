import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Plus, Trash } from 'lucide-react';

const Reports: React.FC = () => {
  const [reports, setReports] = useState([
    { name: 'Audit Report Jan 2024', date: '2024-01-31' },
    { name: 'Performance Report Jan 2024', date: '2024-01-31' },
    { name: 'Security Report Jan 2024', date: '2024-01-31' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState('');
  const [showMsg, setShowMsg] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleDownload = (report: any) => {
    const dataStr = 'data:text/plain;charset=utf-8,' + encodeURIComponent(`Report: ${report.name}\nDate: ${report.date}\n\n[Mock report content]`);
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `${report.name.replace(/\s+/g, '_')}.txt`);
    dlAnchorElem.click();
  };
  const handleExportAll = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(reports, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', 'all_reports.json');
    dlAnchorElem.click();
  };
  const handleRemove = (idx: number) => {
    setReports(reports.filter((_, i) => i !== idx));
    setModalMsg('Report removed!');
    setShowMsg(true);
  };
  const handleAddReport = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    setReports([
      ...reports,
      {
        name: formData.get('name') as string,
        date: formData.get('date') as string,
      },
    ]);
    setShowAddModal(false);
    setModalMsg('Report added!');
    setShowMsg(true);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Reports</h1>
        <p className="text-gray-400">Download and review your project reports.</p>
      </motion.div>
      <div className="flex flex-wrap gap-4 items-center mb-2">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded shadow"
          onClick={() => setShowAddModal(true)}
        >
          <Plus className="w-4 h-4" /> Add Report
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded shadow"
          onClick={handleExportAll}
        >
          <Download className="w-4 h-4" /> Export All
        </button>
      </div>
      <div className="space-y-4">
        {reports.map((r, i) => (
          <div key={i} className="flex items-center space-x-4 bg-gray-950/80 p-4 rounded-xl border border-purple-500/20 relative">
            <FileText className="text-purple-400" />
            <div className="flex-1">
              <div className="font-semibold text-white">{r.name}</div>
              <div className="text-xs text-gray-400">{r.date}</div>
            </div>
            <button
              className="flex items-center px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/40 transition-colors text-sm"
              onClick={() => handleDownload(r)}
            >
              <Download className="w-4 h-4 mr-1" /> Download
            </button>
            <button
              className="p-1 rounded hover:bg-purple-800"
              title="Remove"
              onClick={() => handleRemove(i)}
            >
              <Trash className="w-4 h-4 text-red-400" />
            </button>
          </div>
        ))}
      </div>
      {/* Add Report Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <form
            className="bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md space-y-4"
            onSubmit={handleAddReport}
          >
            <h3 className="text-lg font-bold text-white mb-2">Add Report</h3>
            <div className="space-y-2">
              <input
                name="name"
                placeholder="Report Name"
                className="w-full p-2 rounded bg-gray-800 text-white"
                required
              />
              <input
                name="date"
                type="date"
                className="w-full p-2 rounded bg-gray-800 text-white"
                required
              />
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
      {showMsg && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-xl z-50">
          {modalMsg}
          <button
            className="ml-4 text-purple-400 hover:underline"
            onClick={() => setShowMsg(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Reports; 