import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import DesignMedia from '../components/DesignMedia.jsx';
import DesignProjectModal from '../components/DesignProjectModal.jsx';
import { parseEmbedUrl } from '../utils/embedUtils.js';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45 },
};

export default function Music() {
  const { musicProjects, loading } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState(null);

  if (loading) {
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center text-center p-8 space-y-4">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
          <div className="absolute inset-2 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
        <p className="font-space text-xs text-[var(--text-muted)] tracking-widest uppercase animate-pulse">
          Syncing audio releases...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-title mb-3"
        >
          Music
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="section-subtitle"
        >
          YouTube and SoundCloud embeds.
        </motion.p>
      </header>

      {musicProjects.length === 0 ? (
        <div className="min-h-[30vh] flex flex-col items-center justify-center text-center p-8 glass-card">
          <p className="font-space text-sm text-[var(--text-muted)] tracking-wider uppercase animate-pulse">
            New music releases coming soon
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {musicProjects.map((track, i) => {
            const isYoutube = parseEmbedUrl(track.embedUrl)?.type === 'youtube';
            return (
              <motion.article
                key={track.id}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group relative cursor-pointer aspect-video rounded-xl overflow-hidden glass-card border border-white/10 hover:border-primary/30 transition-all duration-300 shadow-lg"
                onClick={() => setSelectedProject(track)}
              >
                {/* Cover Preview */}
                <div className="absolute inset-0 z-0 bg-black/40">
                  {isYoutube ? (
                    <DesignMedia src={track.embedUrl} title={track.title} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/5 to-black/60 relative overflow-hidden">
                      {/* Premium vinyl / audio disc overlay */}
                      <div className="w-24 h-24 rounded-full border border-white/10 bg-black/80 flex items-center justify-center animate-[spin_10s_linear_infinite] shadow-2xl relative">
                        <div className="w-8 h-8 rounded-full border border-white/20 bg-primary/20 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                        {/* Audio grooves */}
                        <div className="absolute inset-2 rounded-full border border-white/5" />
                        <div className="absolute inset-4 rounded-full border border-white/5" />
                        <div className="absolute inset-6 rounded-full border border-white/5" />
                      </div>
                      <span className="absolute bottom-3 right-3 text-[10px] font-space px-2 py-0.5 rounded bg-black/60 text-secondary border border-secondary/10 uppercase tracking-wider">
                        SoundCloud
                      </span>
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity z-10" />

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 p-5 flex flex-col justify-end">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] uppercase tracking-wider text-primary font-space">
                      {track.category || 'Audio Project'}
                    </span>
                    {track.featured && (
                      <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary/20 text-secondary border border-secondary/10 font-space font-semibold">
                        Featured
                      </span>
                    )}
                  </div>
                  <h2 className="font-space font-semibold text-base text-white tracking-wide truncate mb-1">
                    {track.title}
                  </h2>
                  {track.description && (
                    <p className="text-xs text-[var(--text-muted)] line-clamp-1 opacity-70 font-sans">
                      {track.description}
                    </p>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      {/* Shared Premium Project Modal */}
      <DesignProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
