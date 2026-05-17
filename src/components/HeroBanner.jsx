import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAssetManifest } from '../hooks/useAssetManifest.js';

export default function HeroBanner() {
  const { videos } = useAssetManifest();
  const [index, setIndex] = useState(0);
  const videoRef = useRef(null);

  const sources = videos?.length ? videos : [];

  useEffect(() => {
    if (sources.length <= 1) return undefined;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % sources.length);
    }, 12000);
    return () => clearInterval(timer);
  }, [sources.length]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !sources[index]) return;
    el.load();
    el.play().catch(() => {});
  }, [index, sources]);

  const scrollToWork = (e) => {
    e.preventDefault();
    document.getElementById('what-i-do')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden min-h-[420px] md:min-h-[520px] flex items-center rounded-2xl">
      {sources.length > 0 ? (
        <video
          ref={videoRef}
          key={sources[index]}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster=""
        >
          <source src={sources[index]} type="video/mp4" />
        </video>
      ) : (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/10"
          aria-hidden
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-transparent to-transparent opacity-90"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 p-8 md:p-14 max-w-3xl"
      >
        <p className="text-primary font-space font-medium mb-3 tracking-wide uppercase text-sm md:text-base">
          Singer &amp; Music Producer | Visual Designer
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-space font-bold leading-tight mb-6 text-white">
          KAVISH DE SILVA
        </h1>
        <p className="text-description text-slate-300 text-lg mb-8 max-w-xl leading-relaxed">
          I&apos;m a music producer &amp; 3D animator. Blending advanced sonic production with dynamic
          visual artistry, I craft immersive, multi-dimensional creative experiences.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link to="/contact" className="btn-hero-primary">
            Contact me
          </Link>
          <a href="#what-i-do" onClick={scrollToWork} className="btn-hero-secondary">
            Explore work
          </a>
        </div>
      </motion.div>
    </section>
  );
}
