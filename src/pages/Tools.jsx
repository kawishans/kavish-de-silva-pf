import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext.jsx';

export default function Tools() {
  const { tools, loading } = usePortfolio();

  const handleCardClick = (link) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
          <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin" />
        </div>
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
          Tools
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="section-subtitle"
        >
          Utility and resource layout grid for creative workflows.
        </motion.p>
      </header>

      {tools.length === 0 ? (
        <div className="glass-card p-12 text-center max-w-lg mx-auto border border-white/5 rounded-2xl">
          <p className="text-sm text-[var(--text-muted)] font-space">
            New utility tools and asset kits coming soon.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, i) => (
            <motion.article
              key={tool.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="glass-card overflow-hidden group cursor-pointer text-left w-full flex flex-col h-full"
              onClick={() => handleCardClick(tool.link)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(tool.link);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open ${tool.name}`}
            >
              {/* Visual Thumbnail */}
              {tool.thumb && (
                <div className="relative aspect-video bg-black/20 overflow-hidden shrink-0 border-b border-white/5">
                  <img
                    src={tool.thumb}
                    alt={tool.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />
                </div>
              )}

              {/* Content description panel */}
              <div className="p-5 flex flex-col flex-grow justify-between">
                <div className="space-y-2">
                  <h2 className="font-space font-semibold text-lg group-hover:text-primary transition-colors leading-tight">
                    {tool.title}
                  </h2>
                  {tool.desc && (
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {tool.desc}
                    </p>
                  )}
                </div>

                <div className="pt-5 flex items-center justify-between text-xs text-primary font-space font-semibold group-hover:translate-x-1 transition-transform duration-300">
                  <span>Open Resource</span>
                  <span>→</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}
