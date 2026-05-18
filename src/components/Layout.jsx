import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar.jsx';
import { usePortfolio } from '../context/PortfolioContext.jsx';

const getFaviconUrl = (url) => {
  if (!url) return '';
  try {
    let cleanUrl = url.trim();
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = 'https://' + cleanUrl;
    }
    const domain = new URL(cleanUrl).hostname;
    return `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
  } catch (e) {
    return '';
  }
};

const renderIcon = (url, platform, sizeClass = 'w-5 h-5') => {
  const src = getFaviconUrl(url);
  if (!src) {
    return (
      <svg className={sizeClass} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    );
  }
  return (
    <img
      src={src}
      alt={platform}
      className={`${sizeClass} object-contain rounded-sm`}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="%23888" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>';
      }}
      loading="lazy"
    />
  );
};

export default function Layout() {
  const { socialLinks } = usePortfolio();
  const year = new Date().getFullYear();
  const location = useLocation();
  const [bottomOffset, setBottomOffset] = useState(24);

  useEffect(() => {
    const handleScroll = () => {
      const footerElement = document.querySelector('footer');
      if (!footerElement) return;

      const footerRect = footerElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (footerRect.top < windowHeight) {
        const visibleFooterHeight = windowHeight - footerRect.top;
        setBottomOffset(visibleFooterHeight + 24);
      } else {
        setBottomOffset(24);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const path = location.pathname;
    let title = 'Kavish De Silva | Portfolio';

    if (path.startsWith('/music')) {
      title = 'Kavish De Silva | Music';
    } else if (path.startsWith('/design')) {
      title = 'Kavish De Silva | Design';
    } else if (path.startsWith('/tools')) {
      title = 'Kavish De Silva | Tools';
    } else if (path.startsWith('/contact')) {
      title = 'Kavish De Silva | Contact';
    } else if (path.startsWith('/login')) {
      title = 'Kavish De Silva | Login';
    } else if (path.startsWith('/admin')) {
      title = 'Kavish De Silva | Admin Dashboard';
    }

    document.title = title;
  }, [location]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <motion.main
        className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <Outlet />
      </motion.main>

      <footer
        className="mt-auto border-t border-white/10 dark:border-white/5
          backdrop-blur-md bg-white/5 dark:bg-black/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-muted)]">
            © {year} KDS Portfolio. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-3">
            {socialLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url}
                  className="w-9 h-9 inline-flex items-center justify-center rounded-xl border border-white/10 dark:border-white/5 bg-white/5 dark:bg-black/20 text-[var(--text-muted)] hover:text-primary hover:border-primary/30 hover:bg-primary/10 transition-all duration-300 group"
                  target="_blank"
                  rel="noreferrer"
                  title={link.platform}
                >
                  <span className="group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    {renderIcon(link.url, link.platform, 'w-5 h-5')}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>

      {/* Global Floating Contact Icon */}
      <div 
        className="fixed right-6 z-50"
        style={{ bottom: `${bottomOffset}px` }}
      >
        <Link to="/contact">
          <motion.div
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl bg-[var(--color-primary)] text-neutral-950 hover:bg-[var(--color-primary)]/90 transition-all duration-300 relative group cursor-pointer"
            whileHover={{ scale: 1.12, y: -4 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Contact Kavish"
          >
            {/* Pulsing ring around button */}
            <span className="absolute -inset-1.5 rounded-full border-2 border-[var(--color-primary)]/40 animate-ping opacity-75 -z-10" />
            
            {/* Glowing blur under button */}
            <span className="absolute inset-0 rounded-full bg-[var(--color-primary)]/40 blur-md group-hover:blur-lg transition-all -z-10" />

            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}
