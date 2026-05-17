import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import DesignMedia from '../components/DesignMedia.jsx';
import DesignProjectModal from '../components/DesignProjectModal.jsx';
import { mediaKindFromPath, parseEmbedUrl } from '../utils/embedUtils.js';

export default function Design() {
  const { designProjects, loading } = usePortfolio();
  const [activeProject, setActiveProject] = useState(null);

  const handleCardClick = (project) => {
    const embed = parseEmbedUrl(project.mediaSrc);
    const isModalEmbed = embed && ['youtube', 'soundcloud', 'spotify'].includes(embed.type);

    if (isModalEmbed) {
      setActiveProject(project);
    } else if (project.mediaSrc) {
      window.open(project.mediaSrc, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center text-center p-8 space-y-4">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
          <div className="absolute inset-2 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
        <p className="font-space text-xs text-[var(--text-muted)] tracking-widest uppercase animate-pulse">
          Syncing visual releases...
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
          Design
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="section-subtitle"
        >
          Visual work from my portfolio — click a project to view.
        </motion.p>
      </header>

      {designProjects.length === 0 ? (
        <div className="min-h-[30vh] flex flex-col items-center justify-center text-center p-8 glass-card">
          <p className="font-space text-sm text-[var(--text-muted)] tracking-wider uppercase animate-pulse">
            New visual design releases coming soon
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {designProjects.map((project, i) => {
            const isVideo = mediaKindFromPath(project.mediaSrc) === 'video';
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass-card overflow-hidden group cursor-pointer text-left w-full"
                onClick={() => handleCardClick(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(project);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Open ${project.title}`}
              >
                <div className="relative aspect-[4/3] bg-black/20 overflow-hidden">
                  <DesignMedia
                    src={project.mediaSrc}
                    title={project.title}
                    thumbnailUrl={project.thumbnailUrl}
                    variant="thumbnail"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  {isVideo && (
                    <div
                      className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                      aria-hidden
                    >
                      <span className="h-14 w-14 rounded-full bg-primary/90 flex items-center justify-center">
                        <svg className="h-7 w-7 text-slate-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="font-space font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h2>
                  {project.category && (
                    <p className="text-description text-sm text-[var(--text-muted)]">{project.category}</p>
                  )}
                  {project.description && (
                    <p className="text-xs text-[var(--text-muted)] opacity-70 mt-1.5 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  )}
                  {project.featured && (
                    <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full bg-secondary/20 text-secondary font-space">
                      Featured
                    </span>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      <DesignProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
}

