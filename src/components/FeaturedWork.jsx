import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext.jsx';
import DesignMedia from './DesignMedia.jsx';
import DesignProjectModal from './DesignProjectModal.jsx';
import { parseEmbedUrl } from '../utils/embedUtils.js';

export default function FeaturedWork() {
  const { featuredProjects } = usePortfolio();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);

  // Monitor screen resizing for perfect mathematical centering
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize activeIndex to N (the middle set of duplicates) to allow scrolling left & right
  useEffect(() => {
    if (featuredProjects.length > 0) {
      setActiveIndex(featuredProjects.length);
    }
  }, [featuredProjects.length]);

  // Stepped slideshow auto-play loop (Scroll -> Wait 4s -> Scroll next)
  useEffect(() => {
    if (featuredProjects.length <= 1) return undefined;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setActiveIndex((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [featuredProjects.length]);

  // Re-enable smooth spring transitions after snap-back reset
  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [isTransitioning]);

  if (featuredProjects.length === 0) {
    return null;
  }

  // Multiply featured projects to create a circular buffer list
  // Even with 1 or 2 items, we will always have at least 3 items to show!
  const items = [...featuredProjects, ...featuredProjects, ...featuredProjects];

  // Responsive step calculations
  const cardWidth = width >= 768 ? 440 : 280;
  const gap = 24;
  const translateX = width / 2 - cardWidth / 2 - activeIndex * (cardWidth + gap);

  const handleCardClick = (project) => {
    const link = project.type === 'music' ? project.embedUrl : project.mediaSrc;
    const embed = parseEmbedUrl(link);
    const isModalEmbed = project.type === 'music' || (embed && ['youtube', 'soundcloud', 'spotify'].includes(embed.type));

    if (isModalEmbed) {
      setSelectedProject(project);
    } else if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleAnimationComplete = () => {
    const N = featuredProjects.length;
    if (N === 0) return;

    // Instantaneous, imperceptible snap-back swaps to keep loop infinite
    if (activeIndex >= 2 * N) {
      setIsTransitioning(false);
      setActiveIndex(activeIndex - N);
    } else if (activeIndex < N) {
      setIsTransitioning(false);
      setActiveIndex(activeIndex + N);
    }
  };

  return (
    <section className="py-10 md:py-14 space-y-6 w-full">
      {/* Dynamic Headline (Perfectly aligned with layout grid margins) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="section-title mb-1"
        >
          Featured Projects
        </motion.h2>
        <p className="text-description text-sm text-[var(--text-muted)]">
          Highlighting key creations. Click cards to inspect details or open work references.
        </p>
      </div>

      {/* Stepped Centered Slideshow Track (Breaks out to 100vw for screen-to-screen slider!) */}
      <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden py-4 marquee-mask">
        <motion.div
          className="flex gap-6 items-center"
          animate={{ x: translateX }}
          transition={isTransitioning ? { type: 'spring', stiffness: 95, damping: 22 } : { duration: 0 }}
          onAnimationComplete={handleAnimationComplete}
        >
          {items.map((project, i) => {
            const isActive = i === activeIndex;
            const link = project.type === 'music' ? project.embedUrl : project.mediaSrc;
            const embed = parseEmbedUrl(link);
            const isModalEmbed = project.type === 'music' || (embed && ['youtube', 'soundcloud', 'spotify'].includes(embed.type));

            return (
              <motion.article
                key={`${project.id}-${i}`}
                className={`w-[280px] md:w-[440px] aspect-video glass-card overflow-hidden cursor-pointer relative shrink-0 text-left select-none border transition-all duration-500 ${
                  isActive ? 'border-primary/40 shadow-2xl shadow-primary/5' : 'border-white/5'
                }`}
                animate={{
                  scale: isActive ? 1.02 : 0.94,
                  opacity: isActive ? 1 : 0.4,
                  filter: isActive ? 'grayscale(0%) saturate(100%)' : 'grayscale(100%) saturate(0%)',
                }}
                transition={{ duration: 0.5 }}
                onClick={() => {
                  if (isActive) {
                    handleCardClick(project);
                  } else {
                    setActiveIndex(i);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Featured: ${project.title}`}
              >
                {/* Media Container */}
                <div className="w-full h-full relative bg-black/40">
                  {project.type === 'music' ? (
                    <DesignMedia
                      src={project.embedUrl}
                      title={project.title}
                      variant="thumbnail"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <DesignMedia
                      src={project.mediaSrc}
                      title={project.title}
                      thumbnailUrl={project.thumbnailUrl}
                      variant="thumbnail"
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* High-End Hover Overlay (Only visible on active card) */}
                  {isActive && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm z-30">
                      <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-black shadow-2xl transform scale-90 hover:scale-100 transition-all duration-300">
                        {isModalEmbed ? (
                          <svg className="w-6 h-6 fill-current ml-0.5" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      {/* Dynamic Slide indicators (Dots mapped to original list indices) */}
      {featuredProjects.length > 1 && (
        <div className="flex justify-center gap-2.5 mt-2">
          {featuredProjects.map((_, i) => {
            const originalIndex = activeIndex % featuredProjects.length;
            const isDotActive = i === originalIndex;

            return (
              <button
                key={i}
                type="button"
                className={`h-2 rounded-full transition-all duration-300 ${
                  isDotActive ? 'bg-primary w-6' : 'bg-white/20 w-2 hover:bg-white/40'
                }`}
                onClick={() => {
                  const N = featuredProjects.length;
                  // Map to the active set of items
                  setActiveIndex(N + i);
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            );
          })}
        </div>
      )}

      {/* Shared Popup details modal for featured works */}
      <DesignProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
