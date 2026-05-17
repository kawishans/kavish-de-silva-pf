import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EmbedPlayer from './EmbedPlayer.jsx';
import { mediaKindFromPath, parseEmbedUrl } from '../utils/embedUtils.js';
import DesignMedia from './DesignMedia.jsx';

function resolveMediaSrc(src) {
  if (!src) return '';
  if (src.startsWith('http') || src.startsWith('/') || src.startsWith('assets/')) {
    return src.startsWith('assets/') ? `/${src}` : src;
  }
  return `/assets/pf_items/${src}`;
}

export default function DesignProjectModal({ project, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!project) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  useEffect(() => {
    if (!project) return;

    const resolved = resolveMediaSrc(project.mediaSrc);
    const el = videoRef.current;
    if (el && mediaKindFromPath(resolved) === 'video') {
      el.currentTime = 0;
      el.play().catch(() => {});
    }

    return () => {
      if (el) {
        el.pause();
        el.currentTime = 0;
      }
    };
  }, [project]);

  const handleClose = () => {
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
    onClose();
  };

  const resolvedSrc = project ? resolveMediaSrc(project.mediaSrc) : '';
  const isVideo = project && mediaKindFromPath(resolvedSrc) === 'video';
  const isEmbed = project && (project.type === 'music' || parseEmbedUrl(resolvedSrc) || project.mediaType === 'embed');
  const embedUrl = project ? (project.type === 'music' ? project.embedUrl : resolvedSrc) : '';

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={handleClose}
            aria-label="Close project"
          />

          <motion.div
            className="relative z-10 w-full max-w-5xl max-h-[90vh] flex flex-col glass-panel overflow-hidden"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 p-4 md:p-5 border-b border-white/10">
              <div>
                <h2 className="font-space font-semibold text-xl">{project.title}</h2>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  {project.category && (
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-space">
                      {project.category}
                    </span>
                  )}
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 text-[var(--text-muted)] font-space capitalize">
                    {project.type}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="btn-ghost p-2 shrink-0 font-space"
                aria-label="Close"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 min-h-0 flex flex-col md:flex-row bg-black/40 overflow-hidden">
              {/* Media Player Column */}
              <div className="flex-1 flex items-center justify-center p-4 md:p-6 bg-black/20 min-h-0">
                <div className="w-full max-w-3xl flex items-center justify-center" style={{ maxHeight: 'calc(90vh - 12rem)' }}>
                  {isVideo ? (
                    <video
                      ref={videoRef}
                      src={resolvedSrc}
                      className="max-w-full max-h-[calc(90vh-12rem)] w-auto h-auto object-contain rounded-lg shadow-2xl"
                      controls
                      playsInline
                    />
                  ) : isEmbed ? (
                    <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl">
                      <EmbedPlayer url={embedUrl} title={project.title} />
                    </div>
                  ) : mediaKindFromPath(resolvedSrc) === 'image' ? (
                    <img
                      src={resolvedSrc}
                      alt={project.title}
                      className="max-w-full max-h-[calc(90vh-12rem)] w-auto h-auto object-contain rounded-lg shadow-2xl"
                    />
                  ) : (
                    <DesignMedia src={project.mediaSrc} title={project.title} variant="viewer" />
                  )}
                </div>
              </div>

              {/* Details Column */}
              {project.description && (
                <div className="w-full md:w-80 p-5 border-t md:border-t-0 md:border-l border-white/10 flex flex-col space-y-3 justify-start overflow-y-auto shrink-0 bg-white/5">
                  <h3 className="font-space text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">About Project</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed font-sans whitespace-pre-line">
                    {project.description}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
