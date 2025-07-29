import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Key,
  Save
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    security: true,
    reports: true
  });
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Senior Developer',
    timezone: 'UTC-8 (Pacific)'
  });
  const [darkMode, setDarkMode] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState('');
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showAPIKeyModal, setShowAPIKeyModal] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Database }
  ];

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setMsg('Settings saved!');
    setShowMsg(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">
          Customize your CodePlus experience
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-gray-950/80 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'text-gray-400 hover:text-purple-300 hover:bg-purple-500/10'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="bg-gray-950/80 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">
            {activeTab === 'profile' && (
              <form className="space-y-6" onSubmit={e => { e.preventDefault(); handleSave(); }}>
                <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 bg-gray-900/50 border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-400 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 bg-gray-900/50 border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-400 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Role
                    </label>
                    <select
                      name="role"
                      value={profile.role}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 bg-gray-900/50 border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-400 text-white"
                    >
                      <option>Senior Developer</option>
                      <option>Lead Developer</option>
                      <option>Technical Manager</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Time Zone
                    </label>
                    <select
                      name="timezone"
                      value={profile.timezone}
                      onChange={handleProfileChange}
                      className="w-full px-4 py-2 bg-gray-900/50 border border-purple-500/20 rounded-lg focus:outline-none focus:border-purple-400 text-white"
                    >
                      <option>UTC-8 (Pacific)</option>
                      <option>UTC-5 (Eastern)</option>
                      <option>UTC+0 (GMT)</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end pt-6 border-t border-purple-500/20">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-200"
                    type="submit"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </motion.button>
                </div>
              </form>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Notification Preferences</h2>
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-white capitalize">{key} Notifications</h3>
                        <p className="text-sm text-gray-400">
                          Receive {key} notifications about your projects
                        </p>
                      </div>
                      <button
                        onClick={() => { setNotifications(prev => ({ ...prev, [key]: !value })); setMsg('Notification preference updated!'); setShowMsg(true); }}
                        className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                          value ? 'bg-purple-500' : 'bg-gray-600'
                        }`}
                      >
                        <motion.div
                          animate={{ x: value ? 24 : 2 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-1 w-4 h-4 bg-white rounded-full"
                        />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end pt-6 border-t border-purple-500/20">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-200"
                    onClick={handleSave}
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </motion.button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Security Settings</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <h3 className="font-medium text-white mb-2">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-400 mb-3">
                      Add an extra layer of security to your account
                    </p>
                    <button
                      className="px-4 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors"
                      onClick={() => setShow2FAModal(true)}
                    >
                      Enable 2FA
                    </button>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <h3 className="font-medium text-white mb-2">API Keys</h3>
                    <p className="text-sm text-gray-400 mb-3">
                      Manage your API keys for external integrations
                    </p>
                    <div className="flex space-x-2">
                      <button
                        className="px-4 py-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-colors"
                        onClick={() => setShowAPIKeyModal(true)}
                      >
                        Generate New Key
                      </button>
                      <button
                        className="px-4 py-2 bg-gray-700/50 text-gray-400 border border-gray-600/30 rounded-lg hover:bg-gray-700/70 transition-colors"
                        onClick={() => { setMsg('API keys: [mock-key-1234, mock-key-5678]'); setShowMsg(true); }}
                      >
                        View Keys
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-6 border-t border-purple-500/20">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-200"
                    onClick={handleSave}
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </motion.button>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Appearance</h2>
                <div className="flex items-center gap-4">
                  <span className="text-gray-300">Dark Mode</span>
                  <button
                    onClick={() => { setDarkMode(!darkMode); setMsg(`Dark mode ${!darkMode ? 'enabled' : 'disabled'}!`); setShowMsg(true); }}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${darkMode ? 'bg-purple-500' : 'bg-gray-600'}`}
                  >
                    <motion.div
                      animate={{ x: darkMode ? 24 : 2 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1 w-4 h-4 bg-white rounded-full"
                    />
                  </button>
                </div>
                <div className="flex justify-end pt-6 border-t border-purple-500/20">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-200"
                    onClick={handleSave}
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </motion.button>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white">Integrations</h2>
                <ul className="list-disc pl-6 text-gray-300 space-y-1">
                  <li>GitHub (connected)</li>
                  <li>Slack (not connected)</li>
                  <li>Jira (not connected)</li>
                </ul>
                <div className="flex justify-end pt-6 border-t border-purple-500/20">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-200"
                    onClick={handleSave}
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </motion.button>
                </div>
              </div>
            )}

            {/* 2FA Modal */}
            {show2FAModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md text-white">
                  <h3 className="text-lg font-bold mb-2">Enable Two-Factor Authentication</h3>
                  <p className="mb-4">Scan this QR code with your authenticator app (mock):</p>
                  <div className="bg-gray-800 rounded-lg p-6 flex items-center justify-center mb-4">[QR CODE]</div>
                  <button
                    className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 mt-2"
                    onClick={() => { setShow2FAModal(false); setMsg('2FA enabled!'); setShowMsg(true); }}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
            {/* API Key Modal */}
            {showAPIKeyModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-md text-white">
                  <h3 className="text-lg font-bold mb-2">Generate New API Key</h3>
                  <p className="mb-4">Your new API key (mock): <span className="font-mono bg-gray-800 px-2 py-1 rounded">mock-key-{Math.floor(Math.random()*10000)}</span></p>
                  <button
                    className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 mt-2"
                    onClick={() => { setShowAPIKeyModal(false); setMsg('New API key generated!'); setShowMsg(true); }}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
            {/* Save/Feedback Popup */}
            {showMsg && (
              <div className="fixed bottom-6 right-6 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-xl z-50">
                {msg}
                <button
                  className="ml-4 text-purple-400 hover:underline"
                  onClick={() => setShowMsg(false)}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;