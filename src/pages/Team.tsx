import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Plus, Edit, Trash, Download } from 'lucide-react';

const Team: React.FC = () => {
  const [members, setMembers] = useState([
    { name: 'John Doe', role: 'Frontend Developer' },
    { name: 'Jane Smith', role: 'Backend Developer' },
    { name: 'Mike Johnson', role: 'DevOps Engineer' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit' | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [modalMsg, setModalMsg] = useState('');
  const [showMsg, setShowMsg] = useState(false);

  const handleAdd = () => {
    setModalType('add');
    setCurrentIndex(null);
    setShowModal(true);
  };
  const handleEdit = (idx: number) => {
    setModalType('edit');
    setCurrentIndex(idx);
    setShowModal(true);
  };
  const handleRemove = (idx: number) => {
    setMembers(members.filter((_, i) => i !== idx));
    setModalMsg('Member removed!');
    setShowMsg(true);
  };
  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(members, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', 'team.json');
    dlAnchorElem.click();
  };
  const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const newMember = {
      name: formData.get('name') as string,
      role: formData.get('role') as string,
    };
    if (modalType === 'add') {
      setMembers([...members, newMember]);
      setModalMsg('Member added!');
    } else if (modalType === 'edit' && currentIndex !== null) {
      setMembers(members.map((m, i) => (i === currentIndex ? newMember : m)));
      setModalMsg('Member updated!');
    }
    setShowModal(false);
    setShowMsg(true);
    setCurrentIndex(null);
    setModalType(null);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Team</h1>
        <p className="text-gray-400">Meet your project team members.</p>
      </motion.div>
      <div className="flex flex-wrap gap-4 items-center mb-2">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded shadow"
          onClick={handleAdd}
        >
          <Plus className="w-4 h-4" /> Add Member
        </button>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded shadow"
          onClick={handleExport}
        >
          <Download className="w-4 h-4" /> Export Team
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {members.map((m, i) => (
          <div key={i} className="bg-gray-950/80 p-6 rounded-xl border border-purple-500/20 flex flex-col items-center relative">
            <User className="w-8 h-8 text-purple-400 mb-2" />
            <div className="text-lg font-semibold text-white">{m.name}</div>
            <div className="text-xs text-gray-400 mb-2">{m.role}</div>
            <div className="flex gap-2 absolute top-2 right-2">
              <button
                className="p-1 rounded hover:bg-purple-800"
                title="Edit"
                onClick={() => handleEdit(i)}
              >
                <Edit className="w-4 h-4 text-blue-400" />
              </button>
              <button
                className="p-1 rounded hover:bg-purple-800"
                title="Remove"
                onClick={() => handleRemove(i)}
              >
                <Trash className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <form
            className="bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md space-y-4"
            onSubmit={handleModalSubmit}
          >
            <h3 className="text-lg font-bold text-white mb-2">{modalType === 'add' ? 'Add Member' : 'Edit Member'}</h3>
            <div className="space-y-2">
              <input
                name="name"
                defaultValue={modalType === 'edit' && currentIndex !== null ? members[currentIndex].name : ''}
                placeholder="Name"
                className="w-full p-2 rounded bg-gray-800 text-white"
                required
              />
              <input
                name="role"
                defaultValue={modalType === 'edit' && currentIndex !== null ? members[currentIndex].role : ''}
                placeholder="Role"
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

export default Team; 