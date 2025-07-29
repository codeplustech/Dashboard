import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import CodeAudits from './pages/CodeAudits';
import Refactoring from './pages/Refactoring';
import GitIntegration from './pages/GitIntegration';
import Terminal from './pages/Terminal';
import Settings from './pages/Settings';
import LoginPage from './pages/LoginPage';
import Analytics from './pages/Analytics';
import SecurityScan from './pages/SecurityScan';
import Performance from './pages/Performance';
import Team from './pages/Team';
import Reports from './pages/Reports';
import AIAssistantPage from './pages/AIAssistantPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ScrollToTop from './components/dashboard/ScrollToTop';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={() => {}} />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-black text-white overflow-hidden">
                <div className="flex h-screen">
                  <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
                  <div className="flex-1 flex flex-col">
                    <Navbar />
                    <main className="flex-1 overflow-auto bg-gradient-to-br from-gray-950 to-black p-6">
                      <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/audits" element={<CodeAudits />} />
                        <Route path="/refactoring" element={<Refactoring />} />
                        <Route path="/git" element={<GitIntegration />} />
                        <Route path="/terminal" element={<Terminal />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/security" element={<SecurityScan />} />
                        <Route path="/performance" element={<Performance />} />
                        <Route path="/team" element={<Team />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/ai-assistant" element={<AIAssistantPage />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;