import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './Navbar.jsx';
import { usePortfolio } from '../context/PortfolioContext.jsx';

function getSocialIcon(iconName) {
  const name = (iconName || '').toLowerCase().trim();
  switch (name) {
    case 'github':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
        </svg>
      );
    case 'instagram':
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
        </svg>
      );
    case 'spotify':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 .007c-6.627 0-12 5.372-12 12s5.373 12 12 12 12-5.372 12-12-5.373-12-12-12zm5.49 17.31c-.237.387-.743.51-1.13.273-3.156-1.93-7.13-2.367-11.807-1.302-.44.1-.877-.17-.977-.61-.1-.44.17-.878.61-.978 5.127-1.17 9.508-.68 13.03 1.48.388.238.51.743.274 1.13zm1.464-3.26c-.3.486-.933.645-1.42.345-3.614-2.222-9.126-2.862-13.4-1.564-.545.166-1.114-.144-1.28-.69-.166-.546.144-1.115.69-1.28 4.887-1.483 10.963-.77 15.065 1.76.487.3.646.932.346 1.42zm.127-3.39c-4.333-2.573-11.47-2.807-15.577-1.56-.666.202-1.376-.172-1.578-.838-.202-.666.172-1.376.838-1.578 4.747-1.44 12.634-1.16 17.625 1.803.6.356.8.133.444.733-.356.6-.134.8-.733.44zm0 0"/>
        </svg>
      );
    case 'soundcloud':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M1.333 11c-.736 0-1.333.645-1.333 1.44v1.12c0 .795.597 1.44 1.333 1.44h.334v-4h-.334zm1 .5v3h.334v-3h-.334zm1-.5v4h.334V11h-.334zm1 .5v3h.334v-3h-.334zm1-.5v4h.334V11h-.334zm1-.5v4.5h.334V10.5h-.334zm1 .5v3.5h.334V11h-.334zm1-1.5v5.5h.334V9.5h-.334zm1 1v4.5h.334V10.5h-.334zm1-1.5v6.5h.334V9h-.334zm1 .5v5.5h.334V9.5H11.5zm1-2.5v9h.334V7h-.334zm1 1.5v7.5h.334V8.5h-.334zm1 1v6.5h.334V9.5h-.334zm1-3.5v11.5h.334V5h-.334zm1 1.5v10h.334v-10h-.334zm1-.5v10.5h.334V6h-.334zm1 2h.334v8.5h-.334zm1 3.5c0-1.933 1.567-3.5 3.5-3.5s3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5-3.5-1.567-3.5-3.5z"/>
        </svg>
      );
    case 'youtube':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.002 3.002 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.108C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    case 'twitter':
    case 'x':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      );
    case 'facebook':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
        </svg>
      );
    case 'behance':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12.002c0-5.522-4.478-10-10-10s-10 4.478-10 10 4.478 10 10 10 10-4.478 10-10zM8.285 7.842c1.787 0 2.25.961 2.25 1.95 0 .97-.738 1.488-1.578 1.62.99.191 1.761.765 1.761 1.835 0 1.256-.975 2.146-2.825 2.146H4.25V7.842h4.035zm11.465 5.568h-5.076c.09 1.134.908 1.71 1.952 1.71.867 0 1.41-.36 1.73-.865h1.27c-.446 1.272-1.56 2.055-3 2.055-2.28 0-3.32-1.523-3.32-3.272 0-2.025 1.248-3.322 3.168-3.322 2.085 0 3.276 1.343 3.276 3.322v.372zm-3.136-2.52c-.93 0-1.636.575-1.846 1.442h3.69c-.066-.888-.732-1.442-1.844-1.442zM5.5 8.942v1.95h2.15c.675 0 1.162-.255 1.162-.975 0-.705-.487-.975-1.162-.975H5.5zm0 3.013v2.247h2.385c.78 0 1.29-.3 1.29-1.125 0-.825-.51-1.122-1.29-1.122H5.5zm11.12-3.113h3.5v.75h-3.5v-.75z"/>
        </svg>
      );
    default:
      return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
          <path d="M3.6 9h16.8M3.6 15h16.8" />
          <path d="M11.5 3a17 17 0 0 0 0 18M12.5 3a17 17 0 0 1 0 18" />
        </svg>
      );
  }
}

export default function Layout() {
  const { socialLinks } = usePortfolio();
  const year = new Date().getFullYear();
  const location = useLocation();

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
          <ul className="flex flex-wrap items-center gap-6">
            {socialLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url}
                  className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-primary transition-colors group"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="text-[var(--text-muted)] group-hover:text-primary transition-colors">
                    {getSocialIcon(link.icon)}
                  </span>
                  <span>{link.platform}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>

      {/* Global Floating Contact Icon */}
      <div className="fixed bottom-6 right-6 z-50">
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
