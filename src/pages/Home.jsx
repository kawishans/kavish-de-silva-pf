import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroBanner from '../components/HeroBanner.jsx';
import FeaturedWork from '../components/FeaturedWork.jsx';
import ClientsMarquee from '../components/ClientsMarquee.jsx';
import { useHighlights } from '../context/HighlightsContext.jsx';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function Home() {
  const { highlights } = useHighlights();

  return (
    <div className="space-y-16 md:space-y-24">
      <HeroBanner />

      <section id="what-i-do" className="scroll-mt-28 flex flex-col items-center text-center">
        <motion.h2 {...fadeUp} className="section-title mb-3 text-center">
          What I do
        </motion.h2>
        <motion.p {...fadeUp} className="section-subtitle mb-10 text-center mx-auto">
          Music and visual design — explore each discipline below.
        </motion.p>
        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-8 md:gap-12 max-w-3xl w-full mx-auto">
          {highlights.map((item, i) => (
            <Fragment key={item.id}>
              {i > 0 && (
                <div className="w-full sm:w-[1px] h-[1px] sm:h-auto bg-gradient-to-r sm:bg-gradient-to-b from-transparent via-slate-200 dark:via-white/10 to-transparent my-4 sm:my-0 shrink-0" />
              )}
              <motion.article
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex-1 glass-card overflow-hidden hover:border-primary/30 transition-colors group text-left"
              >
                <div className="aspect-square w-full overflow-hidden bg-black/20">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-space font-semibold mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-description text-[var(--text-muted)] text-sm mb-4">{item.desc}</p>
                  <Link to={item.to} className="text-sm font-medium text-primary font-space">
                    View →
                  </Link>
                </div>
              </motion.article>
            </Fragment>
          ))}
        </div>
      </section>

      <FeaturedWork />

      <ClientsMarquee />
    </div>
  );
}
