import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import ProjectManager from '../components/admin/ProjectManager.jsx';
import HighlightsManager from '../components/admin/HighlightsManager.jsx';
import ContactSocialsManager from '../components/admin/ContactSocialsManager.jsx';

export default function Admin() {
  const {
    primaryColor,
    secondaryColor,
    setPrimaryColor,
    setSecondaryColor,
    setColors,
    resetColors,
    defaultColors,
    isDark,
    toggleTheme,
  } = useTheme();

  const { logout, user, loading, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('branding');

  if (loading || !user || !isAdmin) {
    return null;
  }

  const [primaryInput, setPrimaryInput] = useState(primaryColor);
  const [secondaryInput, setSecondaryInput] = useState(secondaryColor);

  const applyColors = () => {
    setColors({ primary: primaryInput, secondary: secondaryInput });
  };

  const handleReset = () => {
    resetColors();
    setPrimaryInput(defaultColors.primary);
    setSecondaryInput(defaultColors.secondary);
  };

  const tabs = [
    { id: 'branding', label: '🌐 Branding & Theme' },
    { id: 'contact', label: '📞 Contact & Socials' },
    { id: 'music', label: '🎵 Music Projects' },
    { id: 'design', label: '🎨 Design Projects' },
    { id: 'tools', label: '🛠️ Manage Tools' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Panel */}
      <header className="flex items-start justify-between gap-4 flex-wrap w-full">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-title mb-3"
          >
            Admin
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="section-subtitle"
          >
            Customize your website configurations, brand palettes, content streams, and sorting orders.
          </motion.p>
        </div>
        <button
          type="button"
          onClick={logout}
          className="btn-ghost text-red-500 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 px-4 py-2 font-medium"
        >
          Sign Out
        </button>
      </header>

      {/* Ultra-Premium Sliding Tab Bar */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2.5 rounded-xl font-space font-medium text-sm transition-all duration-300 ${
                isActive ? 'text-black z-10 font-bold' : 'text-[var(--text-muted)] hover:text-white hover:bg-white/5'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeAdminTab"
                  className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-lg shadow-primary/20"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panel Content Screens */}
      <div className="space-y-6">
        {activeTab === 'branding' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Appearance & Color Palette Section */}
            <section className="glass-panel p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="font-space font-semibold text-lg">Appearance</h2>
                  <p className="text-sm text-[var(--text-muted)]">Toggle light / dark mode</p>
                </div>
                <button type="button" onClick={toggleTheme} className="btn-ghost">
                  {isDark ? 'Switch to light' : 'Switch to dark'}
                </button>
              </div>

              <hr className="border-white/10 dark:border-white/5" />

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-3">
                  <label htmlFor="primary" className="block text-sm font-medium">
                    Primary color
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      id="primary"
                      type="color"
                      value={primaryInput}
                      onChange={(e) => {
                        setPrimaryInput(e.target.value);
                        setPrimaryColor(e.target.value);
                      }}
                      className="h-12 w-14 rounded-lg cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={primaryInput}
                      onChange={(e) => setPrimaryInput(e.target.value)}
                      className="flex-1 rounded-xl px-3 py-2 text-sm bg-white/10 dark:bg-black/20 border border-white/10 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="secondary" className="block text-sm font-medium">
                    Secondary color
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      id="secondary"
                      type="color"
                      value={secondaryInput}
                      onChange={(e) => {
                        setSecondaryInput(e.target.value);
                        setSecondaryColor(e.target.value);
                      }}
                      className="h-12 w-14 rounded-lg cursor-pointer border-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={secondaryInput}
                      onChange={(e) => setSecondaryInput(e.target.value)}
                      className="flex-1 rounded-xl px-3 py-2 text-sm bg-white/10 dark:bg-black/20 border border-white/10 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={applyColors} className="btn-primary text-sm">
                  Apply colors
                </button>
                <button type="button" onClick={handleReset} className="btn-ghost text-sm">
                  Reset to defaults
                </button>
              </div>
            </section>

            {/* Global Homepage tagline manager */}
            <HighlightsManager />
          </motion.div>
        )}

        {activeTab === 'music' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectManager type="music" label="Music Projects" />
          </motion.div>
        )}

        {activeTab === 'design' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectManager type="design" label="Design Projects" />
          </motion.div>
        )}

        {activeTab === 'tools' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectManager type="tools" label="Manage Tools" />
          </motion.div>
        )}

        {activeTab === 'contact' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ContactSocialsManager />
          </motion.div>
        )}
      </div>
    </div>
  );
}
