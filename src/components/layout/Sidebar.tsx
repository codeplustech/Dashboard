import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Search,
  Wrench,
  GitBranch,
  Terminal,
  Settings,
  ChevronLeft,
  Code2,
  BarChart3,
  Shield,
  Zap,
  Users,
  FileText,
  Bot,
  Workflow,
  Database,
  Globe,
  Menu,
  X
} from 'lucide-react';
import Logo from '../../images/Logo code.png';
import Favicon from '../../images/Fav  Icon.svg';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Search, label: 'Code Audits', path: '/audits' },
    { icon: Wrench, label: 'Refactoring', path: '/refactoring' },
    { icon: GitBranch, label: 'Git Integration', path: '/git' },
    { icon: Terminal, label: 'Terminal', path: '/terminal' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Shield, label: 'Security Scan', path: '/security' },
    { icon: Zap, label: 'Performance', path: '/performance' },
    { icon: Users, label: 'Team', path: '/team' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Bot, label: 'AI Assistant', path: '/ai-assistant' },
    { icon: Workflow, label: 'Workflows', path: '/workflows' },
    { icon: Database, label: 'Integrations', path: '/integrations' },
    { icon: Globe, label: 'API Docs', path: '/api-docs' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close mobile menu when clicking on a link
  const handleMobileLinkClick = () => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && mobileMenuOpen) {
        const target = event.target as Element;
        if (!target.closest('.mobile-sidebar') && !target.closest('.hamburger-button')) {
          setMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, mobileMenuOpen]);

  // Mobile Hamburger Button
  if (isMobile) {
    return (
      <>
        {/* Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="hamburger-button fixed top-4 left-4 z-50 p-3 bg-gray-950/90 backdrop-blur-xl border border-purple-500/20 rounded-lg hover:bg-purple-500/10 transition-colors lg:hidden"
        >
          <motion.div
            animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-purple-400" />
            ) : (
              <Menu className="w-6 h-6 text-purple-400" />
            )}
          </motion.div>
        </button>

        {/* Mobile Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="mobile-sidebar fixed left-0 top-0 bottom-0 w-80 bg-gray-950/95 backdrop-blur-xl border-r border-purple-500/20 flex flex-col z-50 lg:hidden"
            >
              {/* Mobile Header */}
              <div className="p-6 border-b border-purple-500/20 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex-1 flex justify-center items-center">
                    <div className="flex justify-center items-center my-4">
                      <img 
                        src={Logo} 
                        alt="Logo" 
                        className="object-contain max-w-full max-h-full shadow-lg transition-all duration-300" 
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-purple-500/10 transition-colors group ml-4"
                  >
                    <X className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                  </button>
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="flex-1 overflow-hidden flex flex-col min-h-0">
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent hover:scrollbar-thumb-purple-500/40 transition-colors">
                  {menuItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={handleMobileLinkClick}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group relative flex-shrink-0 ${
                          isActive
                            ? 'bg-purple-500/20 text-purple-300 shadow-lg shadow-purple-500/25'
                            : 'text-gray-400 hover:text-purple-300 hover:bg-purple-500/10'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <motion.div
                              layoutId="mobileActiveTab"
                              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg border border-purple-500/30"
                              initial={false}
                              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                          )}
                          <item.icon className="w-5 h-5 relative z-10 flex-shrink-0" />
                          <span className="font-medium relative z-10 whitespace-nowrap">
                            {item.label}
                          </span>
                        </>
                      )}
                    </NavLink>
                  ))}
                </nav>
              </div>

              {/* Mobile Status Indicator */}
              <div className="p-4 border-t border-purple-500/20 flex-shrink-0">
                <div className="space-y-3">
                  {/* System Status */}
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50 flex-shrink-0" />
                    <div className="text-sm text-gray-400 whitespace-nowrap">
                      System Online
                    </div>
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Active Scans</span>
                      <span className="text-purple-400 font-medium">3</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Issues Found</span>
                      <span className="text-orange-400 font-medium">12</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Code Health</span>
                      <span className="text-green-400 font-medium">87%</span>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="pt-2 border-t border-purple-500/10">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-3 py-2 text-xs bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-lg text-purple-300 hover:from-purple-500/30 hover:to-purple-600/30 transition-all duration-200 whitespace-nowrap"
                    >
                      Quick Scan
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop Sidebar (original design)
  return (
    <motion.div
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-gray-950/80 backdrop-blur-xl border-r border-purple-500/20 flex flex-col h-full max-h-screen overflow-hidden hidden lg:flex"
    >
      {/* Header - Fixed */}
      <div className="p-6 border-b border-purple-500/20 flex-shrink-0">
        <div className="flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex justify-center items-center"
              >
                <div className="flex justify-center items-center my-4">
                  <img 
                    src={Logo} 
                    alt="Logo" 
                    className="object-contain max-w-full max-h-full shadow-lg transition-all duration-300" 
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {collapsed && (
            <div className="flex-1 flex justify-center items-center">
              <div className="flex justify-center items-center my-4">
                <img 
                  src={Favicon} 
                  alt="Favicon" 
                  className="object-contain max-w-full max-h-full shadow-lg transition-all duration-300" 
                />
              </div>
            </div>
          )}
          
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-purple-500/10 transition-colors group"
          >
            <ChevronLeft 
              className={`w-5 h-5 text-purple-400 transition-transform duration-300 group-hover:text-purple-300 ${
                collapsed ? 'rotate-180' : ''
              }`} 
            />
          </button>
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent hover:scrollbar-thumb-purple-500/40 transition-colors">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 group relative flex-shrink-0 ${
                  isActive
                    ? 'bg-purple-500/20 text-purple-300 shadow-lg shadow-purple-500/25'
                    : 'text-gray-400 hover:text-purple-300 hover:bg-purple-500/10'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg border border-purple-500/30"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className="w-5 h-5 relative z-10 flex-shrink-0" />
                  <AnimatePresence mode="wait">
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="font-medium relative z-10 whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Status Indicator - Fixed */}
      <div className="p-4 border-t border-purple-500/20 flex-shrink-0">
        <div className="space-y-3">
          {/* System Status */}
          <div className={`flex items-center space-x-3 ${collapsed ? 'justify-center' : ''}`}>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50 flex-shrink-0" />
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-gray-400 whitespace-nowrap"
                >
                  System Online
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Quick Stats */}
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Active Scans</span>
                  <span className="text-purple-400 font-medium">3</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Issues Found</span>
                  <span className="text-orange-400 font-medium">12</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Code Health</span>
                  <span className="text-green-400 font-medium">87%</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Quick Actions */}
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="pt-2 border-t border-purple-500/10"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-3 py-2 text-xs bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-lg text-purple-300 hover:from-purple-500/30 hover:to-purple-600/30 transition-all duration-200 whitespace-nowrap"
                >
                  Quick Scan
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;